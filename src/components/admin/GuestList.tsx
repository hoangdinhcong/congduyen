'use client';

import React, { useState, useEffect } from 'react';
import { FaPlus, FaUpload, FaSearch, FaFilter, FaCopy, FaEdit, FaTrash, FaUsers } from 'react-icons/fa';
import { Guest, RSVPStatus, GuestSide } from '../../lib/types';
import { showToast } from '@/components/ui/ToastProvider';
import AddGuestModal from './AddGuestModal';
import EditGuestModal from './EditGuestModal';
import ImportGuestsModal from './ImportGuestsModal';
import BulkEditModal from './BulkEditModal';
import ConfirmDialog from '../ui/ConfirmDialog';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sideFilter, setSideFilter] = useState<'all' | GuestSide>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | RSVPStatus>('all');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBulkEditModalOpen, setIsBulkEditModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  
  // New state for multi-select functionality
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // New state for confirmation dialog
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // New state for table animations
  const [animatedRows, setAnimatedRows] = useState<{id: string, action: 'add' | 'update' | 'delete'}[]>([]);

  useEffect(() => {
    fetchGuests();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = [...guests];
    
    // Apply side filter
    if (sideFilter !== 'all') {
      result = result.filter(guest => guest.side === sideFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(guest => guest.rsvp_status === statusFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(guest => 
        guest.name.toLowerCase().includes(term) ||
        guest.unique_invite_id.toLowerCase().includes(term)
      );
    }
    
    setFilteredGuests(result);
  }, [guests, searchTerm, sideFilter, statusFilter]);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/guests');
      
      if (!response.ok) {
        throw new Error('Failed to fetch guests');
      }
      
      const data = await response.json();
      setGuests(data);
      setFilteredGuests(data);
    } catch (err: any) {
      console.error('Error fetching guests:', err);
      setError(err.message || 'An error occurred while fetching guests');
    } finally {
      setLoading(false);
    }
  };

  const handleAddGuest = async (newGuest: Omit<Guest, 'id' | 'unique_invite_id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch('/api/guests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGuest),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add guest');
      }
      
      const data = await response.json();
      
      // Add new guest to the top of the list with animation
      setGuests(prevGuests => {
        const updatedGuests = [data, ...prevGuests];
        // Trigger animation for the new guest
        setAnimatedRows([{ id: data.id, action: 'add' }]);
        setTimeout(() => setAnimatedRows([]), 1000);
        return updatedGuests;
      });
      
      setIsAddModalOpen(false);
      showToast.success('Guest added successfully');
    } catch (err: any) {
      console.error('Error adding guest:', err);
      showToast.error(err.message || 'An error occurred while adding the guest');
    }
  };

  const handleEditGuest = async (updatedGuest: Partial<Guest>) => {
    if (!selectedGuest) return;
    
    try {
      const response = await fetch(`/api/guests/${selectedGuest.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGuest),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update guest');
      }
      
      // Update guest in the list with animation
      setGuests(prevGuests => {
        const updatedGuests = prevGuests.map(guest => 
          guest.id === selectedGuest.id ? { ...guest, ...updatedGuest } : guest
        );
        // Trigger animation for the updated guest
        setAnimatedRows([{ id: selectedGuest.id, action: 'update' }]);
        setTimeout(() => setAnimatedRows([]), 1000);
        return updatedGuests;
      });
      
      setIsEditModalOpen(false);
      setSelectedGuest(null);
      showToast.success('Guest updated successfully');
    } catch (err: any) {
      console.error('Error updating guest:', err);
      showToast.error(err.message || 'An error occurred while updating the guest');
    }
  };

  const handleDeleteGuest = async (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Guest',
      message: 'Are you sure you want to delete this guest? This action cannot be undone.',
      onConfirm: async () => {
        try {
          const response = await fetch(`/api/guests/${id}`, {
            method: 'DELETE',
          });
          
          if (!response.ok) {
            throw new Error('Failed to delete guest');
          }
          
          // Remove guest from the list with animation
          setAnimatedRows([{ id, action: 'delete' }]);
          
          // Wait for animation to complete before removing from state
          setTimeout(() => {
            setGuests(prevGuests => prevGuests.filter(guest => guest.id !== id));
            setAnimatedRows([]);
          }, 500);
          
          setConfirmDialog({ ...confirmDialog, isOpen: false });
          showToast.success('Guest deleted successfully');
        } catch (err: any) {
          console.error('Error deleting guest:', err);
          showToast.error(err.message || 'An error occurred while deleting the guest');
        }
      },
    });
  };

  const handleCopyLink = (uniqueId: string) => {
    const baseUrl = window.location.origin;
    const inviteUrl = `${baseUrl}/invite/${uniqueId}`;
    
    navigator.clipboard.writeText(inviteUrl)
      .then(() => {
        showToast.success('Invitation link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy link:', err);
        showToast.error('Failed to copy link. Please try again.');
      });
  };

  const handleImportSuccess = () => {
    fetchGuests();
    setIsImportModalOpen(false);
  };

  // New handlers for bulk actions
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(filteredGuests.map(guest => guest.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectGuest = (id: string) => {
    if (selectedGuests.includes(id)) {
      setSelectedGuests(selectedGuests.filter(guestId => guestId !== id));
      setSelectAll(false);
    } else {
      setSelectedGuests([...selectedGuests, id]);
      if (selectedGuests.length + 1 === filteredGuests.length) {
        setSelectAll(true);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedGuests.length === 0) {
      showToast.error('No guests selected');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Delete Selected Guests',
      message: `Are you sure you want to delete ${selectedGuests.length} selected guests? This action cannot be undone.`,
      onConfirm: async () => {
        try {
          const response = await fetch('/api/guests/bulk-delete', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: selectedGuests }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to delete guests');
          }
          
          // Animate all selected guests for deletion
          setAnimatedRows(selectedGuests.map(id => ({ id, action: 'delete' })));
          
          // Wait for animation to complete before removing from state
          setTimeout(() => {
            setGuests(prevGuests => prevGuests.filter(guest => !selectedGuests.includes(guest.id)));
            setSelectedGuests([]);
            setSelectAll(false);
            setAnimatedRows([]);
          }, 500);
          
          setConfirmDialog({ ...confirmDialog, isOpen: false });
          showToast.success(`Successfully deleted ${selectedGuests.length} guests`);
        } catch (err: any) {
          console.error('Error deleting guests:', err);
          showToast.error(err.message || 'An error occurred while deleting guests');
        }
      },
    });
  };

  const handleBulkEdit = async (data: { side?: GuestSide; rsvp_status?: RSVPStatus }) => {
    if (selectedGuests.length === 0) {
      showToast.error('No guests selected');
      return;
    }
    
    try {
      const response = await fetch('/api/guests/bulk-update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: selectedGuests,
          ...data
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update guests');
      }
      
      // Update guests in the list with animation
      setGuests(prevGuests => {
        const updatedGuests = prevGuests.map(guest => {
          if (selectedGuests.includes(guest.id)) {
            return { ...guest, ...data };
          }
          return guest;
        });
        
        // Trigger animation for all updated guests
        setAnimatedRows(selectedGuests.map(id => ({ id, action: 'update' })));
        setTimeout(() => setAnimatedRows([]), 1000);
        
        return updatedGuests;
      });
      
      setIsBulkEditModalOpen(false);
      showToast.success(`Successfully updated ${selectedGuests.length} guests`);
    } catch (err: any) {
      console.error('Error updating guests:', err);
      showToast.error(err.message || 'An error occurred while updating guests');
    }
  };

  if (loading && guests.length === 0) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-600">Loading guests...</p>
      </div>
    );
  }

  if (error && guests.length === 0) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>{error}</p>
        <p className="mt-2 text-sm">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Action buttons */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FaPlus className="-ml-1 mr-2 h-4 w-4" />
            Add Guest
          </button>
          
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FaUpload className="-ml-1 mr-2 h-4 w-4" />
            Import CSV
          </button>

          {/* Bulk action buttons */}
          {selectedGuests.length > 0 && (
            <>
              <button
                onClick={() => setIsBulkEditModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaUsers className="-ml-1 mr-2 h-4 w-4" />
                Edit Selected ({selectedGuests.length})
              </button>
              
              <button
                onClick={handleBulkDelete}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FaTrash className="-ml-1 mr-2 h-4 w-4" />
                Delete Selected ({selectedGuests.length})
              </button>
            </>
          )}
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guests..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={sideFilter}
              onChange={(e) => setSideFilter(e.target.value as any)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="all">All Sides</option>
              <option value="bride">Bride's Side</option>
              <option value="groom">Groom's Side</option>
            </select>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="attending">Attending</option>
              <option value="declined">Declined</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Guest table */}
      <div className="overflow-x-auto bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Side
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RSVP Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unique ID
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredGuests.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No guests found. Add a new guest or adjust your filters.
                </td>
              </tr>
            ) : (
              filteredGuests.map((guest) => {
                const isAnimated = animatedRows.find(row => row.id === guest.id);
                const animationClass = isAnimated 
                  ? isAnimated.action === 'add' 
                    ? 'animate-fadeIn bg-green-50' 
                    : isAnimated.action === 'update' 
                      ? 'animate-pulse bg-blue-50' 
                      : 'animate-fadeOut opacity-0 h-0 overflow-hidden' 
                  : '';
                
                return (
                  <tr 
                    key={guest.id} 
                    className={`${selectedGuests.includes(guest.id) ? "bg-blue-50" : ""} ${animationClass} transition-all duration-500`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedGuests.includes(guest.id)}
                          onChange={() => handleSelectGuest(guest.id)}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        guest.side === 'bride' ? 'bg-pink-100 text-pink-800' :
                        guest.side === 'groom' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {guest.side.charAt(0).toUpperCase() + guest.side.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        guest.rsvp_status === 'attending' ? 'bg-green-100 text-green-800' :
                        guest.rsvp_status === 'declined' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {guest.rsvp_status.charAt(0).toUpperCase() + guest.rsvp_status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {guest.unique_invite_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleCopyLink(guest.unique_invite_id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                        title="Copy invitation link"
                      >
                        <FaCopy />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedGuest(guest);
                          setIsEditModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="Edit guest"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteGuest(guest.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete guest"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination could be added here */}
      
      {/* Modals */}
      {isAddModalOpen && (
        <AddGuestModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddGuest}
        />
      )}
      
      {isEditModalOpen && selectedGuest && (
        <EditGuestModal
          guest={selectedGuest}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedGuest(null);
          }}
          onUpdate={handleEditGuest}
        />
      )}
      
      {isImportModalOpen && (
        <ImportGuestsModal
          onClose={() => setIsImportModalOpen(false)}
          onImportSuccess={handleImportSuccess}
        />
      )}

      {isBulkEditModalOpen && (
        <BulkEditModal
          selectedCount={selectedGuests.length}
          onClose={() => setIsBulkEditModalOpen(false)}
          onUpdate={handleBulkEdit}
        />
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}
