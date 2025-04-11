'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Upload, Search, Filter, Copy, Edit2, Trash2, Users, User } from 'lucide-react';
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
  const [anonymousFilter, setAnonymousFilter] = useState<'all' | 'anonymous' | 'invited'>('all');
  
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
    
    // Apply anonymous filter
    if (anonymousFilter !== 'all') {
      if (anonymousFilter === 'anonymous') {
        result = result.filter(guest => guest.tags?.includes('anonymous'));
      } else {
        result = result.filter(guest => !guest.tags?.includes('anonymous'));
      }
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
  }, [guests, searchTerm, sideFilter, statusFilter, anonymousFilter]);

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
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg font-medium text-gray-900 flex items-center">
          <Users className="mr-2 text-primary" />
          Guest List
          <span className="ml-2 text-sm text-gray-500">
            ({filteredGuests.length} of {guests.length})
          </span>
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary-sm flex items-center"
          >
            <Plus className="mr-1" />
            Add Guest
          </button>
          
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="btn-outline-sm flex items-center"
          >
            <Upload className="mr-1" />
            Import
          </button>
          
          {selectedGuests.length > 0 && (
            <>
              <button
                onClick={() => setIsBulkEditModalOpen(true)}
                className="btn-secondary-sm flex items-center"
              >
                <Edit2 className="mr-1" />
                Bulk Edit ({selectedGuests.length})
              </button>
              
              <button
                onClick={handleBulkDelete}
                className="btn-danger-sm flex items-center"
              >
                <Trash2 className="mr-1" />
                Delete ({selectedGuests.length})
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="p-4 border-b border-gray-200 bg-white flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or invite ID..."
            className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <select
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary appearance-none bg-white"
              value={sideFilter}
              onChange={(e) => setSideFilter(e.target.value as 'all' | GuestSide)}
            >
              <option value="all">All Sides</option>
              <option value="bride">Bride's Side</option>
              <option value="groom">Groom's Side</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="text-gray-400" />
            </div>
          </div>
          
          <div className="relative">
            <select
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary appearance-none bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | RSVPStatus)}
            >
              <option value="all">All Statuses</option>
              <option value="attending">Attending</option>
              <option value="declined">Declined</option>
              <option value="pending">Pending</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="text-gray-400" />
            </div>
          </div>
          
          <div className="relative">
            <select
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary appearance-none bg-white"
              value={anonymousFilter}
              onChange={(e) => setAnonymousFilter(e.target.value as 'all' | 'anonymous' | 'invited')}
            >
              <option value="all">All Guests</option>
              <option value="anonymous">Anonymous RSVPs</option>
              <option value="invited">Invited Guests</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Guest table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    checked={selectAll}
                    onChange={handleSelectAll}
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
                Tags
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invite Link
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : filteredGuests.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No guests found. {searchTerm && 'Try adjusting your search or filters.'}
                </td>
              </tr>
            ) : (
              filteredGuests.map((guest) => {
                const isAnimated = animatedRows.find(row => row.id === guest.id);
                return (
                  <tr 
                    key={guest.id} 
                    className={`${
                      isAnimated 
                        ? isAnimated.action === 'add' 
                          ? 'animate-fade-in bg-green-50' 
                          : isAnimated.action === 'update' 
                            ? 'animate-pulse bg-blue-50' 
                            : ''
                        : ''
                    } hover:bg-gray-50 transition-colors`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        checked={selectedGuests.includes(guest.id)}
                        onChange={() => handleSelectGuest(guest.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {guest.name}
                          {guest.tags?.includes('anonymous') && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                              <User className="mr-1" />
                              Anonymous
                            </span>
                          )}
                        </div>
                      </div>
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {guest.tags?.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                        {(!guest.tags || guest.tags.length === 0) && (
                          <span className="text-gray-400 text-xs">No tags</span>
                        )}
                      </div>
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
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedGuest(guest);
                          setIsEditModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="Edit guest"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGuest(guest.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete guest"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

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
