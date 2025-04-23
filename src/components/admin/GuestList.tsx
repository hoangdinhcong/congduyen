'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Upload, Search, Filter, Copy, Edit2, Trash2, Users, User, RefreshCw } from 'lucide-react';
import { Guest, RSVPStatus, GuestSide } from '../../lib/types';
import { showToast } from '@/components/ui/ToastProvider';
import AddGuestModal from './AddGuestModal';
import EditGuestModal from './EditGuestModal';
import ImportGuestsModal from './ImportGuestsModal';
import BulkEditModal from './BulkEditModal';
import ConfirmDialog from '../ui/ConfirmDialog';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useAdminGuests } from '@/hooks/useAdminGuests';

export default function GuestList() {
  const { guests, isLoading: loading, error, fetchGuests, setGuests } = useAdminGuests();
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sideFilter, setSideFilter] = useState<'all' | GuestSide>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | RSVPStatus>('all');
  const [anonymousFilter, setAnonymousFilter] = useState<'all' | 'anonymous' | 'invited'>('all');
  const [invitedFilter, setInvitedFilter] = useState<'all' | 'invited' | 'not-invited'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

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

    // Apply invited filter
    if (invitedFilter !== 'all') {
      if (invitedFilter === 'invited') {
        result = result.filter(guest => guest.is_invited);
      } else {
        result = result.filter(guest => !guest.is_invited);
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
  }, [guests, searchTerm, sideFilter, statusFilter, anonymousFilter, invitedFilter, confirmDialog, animatedRows]);

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
        throw new Error('Không thể thêm khách');
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
      showToast.success('Thêm khách thành công');
    } catch (err: any) {
      console.error('Error adding guest:', err);
      showToast.error(err.message || 'Đã xảy ra lỗi khi thêm khách');
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
        throw new Error('Không thể cập nhật thông tin khách');
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
      showToast.success('Cập nhật thông tin khách thành công');
    } catch (err: any) {
      console.error('Error updating guest:', err);
      showToast.error(err.message || 'Đã xảy ra lỗi khi cập nhật thông tin khách');
    }
  };

  const handleDeleteGuest = async (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Xóa khách',
      message: 'Bạn có chắc chắn muốn xóa khách này? Hành động này không thể hoàn tác.',
      onConfirm: async () => {
        try {
          const response = await fetch(`/api/guests/${id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Không thể xóa khách');
          }

          // Remove guest from the list with animation
          setAnimatedRows([{ id, action: 'delete' }]);

          // Wait for animation to complete before removing from state
          setTimeout(() => {
            setGuests(prevGuests => prevGuests.filter(guest => guest.id !== id));
            setAnimatedRows([]);
          }, 500);

          setConfirmDialog({ ...confirmDialog, isOpen: false });
          showToast.success('Xóa khách thành công');
        } catch (err: any) {
          console.error('Error deleting guest:', err);
          showToast.error(err.message || 'Đã xảy ra lỗi khi xóa khách');
        }
      },
    });
  };

  const handleCopyLink = async (uniqueId: string, guestId: string, isAlreadyInvited: boolean) => {
    const baseUrl = window.location.origin;
    const inviteUrl = `${baseUrl}/invite/${uniqueId}`;

    try {
      // Copy the invitation link to clipboard
      await navigator.clipboard.writeText(inviteUrl);

      // Only update the invitation status if the guest is not already invited
      if (!isAlreadyInvited) {
        // Mark the guest as invited by updating the is_invited field
        const response = await fetch(`/api/guests/${guestId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            is_invited: true
          }),
        });

        if (!response.ok) {
          throw new Error('Không thể cập nhật trạng thái mời của khách');
        }

        // Update local state
        setGuests(prevGuests => {
          const updatedGuests = prevGuests.map(guest =>
            guest.id === guestId ? { ...guest, is_invited: true } : guest
          );

          // Trigger animation for the updated guest
          setAnimatedRows([{ id: guestId, action: 'update' }]);
          setTimeout(() => setAnimatedRows([]), 1000);

          return updatedGuests;
        });

        showToast.success('Đã sao chép liên kết mời và đánh dấu khách đã được mời!');
      } else {
        // Just show a success message for copying the link
        showToast.success('Đã sao chép liên kết mời!');
      }
    } catch (err) {
      console.error('Failed to copy link or update invitation status:', err);
      showToast.error('Không thể sao chép liên kết. Vui lòng thử lại.');
    }
  };

  const handleToggleInvited = async (guestId: string, currentStatus: boolean) => {
    try {
      // Toggle the is_invited status
      const newStatus = !currentStatus;

      // Update the guest in the database
      const response = await fetch(`/api/guests/${guestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_invited: newStatus
        }),
      });

      if (!response.ok) {
        throw new Error('Không thể cập nhật trạng thái mời');
      }

      // Update local state
      setGuests(prevGuests => {
        const updatedGuests = prevGuests.map(guest =>
          guest.id === guestId ? { ...guest, is_invited: newStatus } : guest
        );

        // Trigger animation for the updated guest
        setAnimatedRows([{ id: guestId, action: 'update' }]);
        setTimeout(() => setAnimatedRows([]), 1000);

        return updatedGuests;
      });

      showToast.success(newStatus
        ? 'Đánh dấu khách đã được mời thành công'
        : 'Đánh dấu khách chưa được mời');
    } catch (err) {
      console.error('Failed to update invitation status:', err);
      showToast.error('Không thể cập nhật trạng thái mời');
    }
  };

  const handleImportSuccess = () => {
    fetchGuests();
    setIsImportModalOpen(false);
    showToast.success('Nhập danh sách khách thành công');
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
      showToast.error('Chưa chọn khách nào');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Xóa khách đã chọn',
      message: `Bạn có chắc chắn muốn xóa ${selectedGuests.length} khách đã chọn? Hành động này không thể hoàn tác.`,
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
            throw new Error('Không thể xóa khách');
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
          showToast.success(`Đã xóa thành công ${selectedGuests.length} khách`);
        } catch (err: any) {
          console.error('Error deleting guests:', err);
          showToast.error(err.message || 'Đã xảy ra lỗi khi xóa khách');
        }
      },
    });
  };

  const handleBulkEdit = async (data: { side?: GuestSide; rsvp_status?: RSVPStatus; is_invited?: boolean }) => {
    if (selectedGuests.length === 0) {
      showToast.error('Chưa chọn khách nào');
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
        throw new Error('Không thể cập nhật thông tin khách');
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
      showToast.success(`Đã cập nhật thành công ${selectedGuests.length} khách`);
    } catch (err: any) {
      console.error('Error updating guests:', err);
      showToast.error(err.message || 'Đã xảy ra lỗi khi cập nhật thông tin khách');
    }
  };

  if (loading && guests.length === 0) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-600">Đang tải danh sách khách...</p>
      </div>
    );
  }

  if (error && guests.length === 0) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>{error}</p>
        <p className="mt-2 text-sm">Vui lòng thử làm mới trang.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg font-medium text-gray-900 flex items-center">
          <Users className="mr-2 text-primary" />
          Danh sách khách mời
          <span className="ml-2 text-sm text-gray-500">
            ({filteredGuests.length} trên {guests.length})
          </span>
        </h2>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary-sm flex items-center"
          >
            <Plus className="mr-1" />
            Thêm khách
          </button>

          <button
            onClick={() => {
              setIsRefreshing(true);
              fetchGuests()
                .then(() => {
                  showToast.success('Làm mới danh sách khách thành công');
                })
                .catch(() => {
                  // Error is already handled in the hook
                })
                .finally(() => {
                  setIsRefreshing(false);
                });
            }}
            className={`btn-outline-sm flex items-center transition-all duration-200 ${
              isRefreshing ? 'bg-gray-100' : ''
            }`}
            disabled={isRefreshing}
            aria-label="Làm mới danh sách khách"
            title="Làm mới danh sách khách"
          >
            <RefreshCw className={`mr-1 h-4 w-4 ${isRefreshing ? 'animate-spin text-primary' : ''}`} />
            {isRefreshing ? 'Đang làm mới...' : 'Làm mới'}
          </button>

          <button
            onClick={() => setIsImportModalOpen(true)}
            className="btn-outline-sm flex items-center"
          >
            <Upload className="mr-1" />
            Nhập
          </button>

          {selectedGuests.length > 0 && (
            <>
              <button
                onClick={() => setIsBulkEditModalOpen(true)}
                className="btn-secondary-sm flex items-center"
              >
                <Edit2 className="mr-1" />
                Chỉnh sửa hàng loạt ({selectedGuests.length})
              </button>

              <button
                onClick={handleBulkDelete}
                className="btn-danger-sm flex items-center"
              >
                <Trash2 className="mr-1" />
                Xóa ({selectedGuests.length})
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
            placeholder="Tìm kiếm theo tên hoặc mã mời..."
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
              <option value="all">Tất cả các bên</option>
              <option value="bride">Bên nhà gái</option>
              <option value="groom">Bên nhà trai</option>
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
              <option value="all">Tất cả trạng thái</option>
              <option value="attending">Sẽ tham dự</option>
              <option value="declined">Từ chối</option>
              <option value="pending">Chưa phản hồi</option>
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
              <option value="all">Tất cả khách</option>
              <option value="anonymous">Khách vô danh</option>
              <option value="invited">Khách được mời</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <select
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary appearance-none bg-white"
              value={invitedFilter}
              onChange={(e) => setInvitedFilter(e.target.value as 'all' | 'invited' | 'not-invited')}
            >
              <option value="all">Tất cả trạng thái mời</option>
              <option value="invited">Đã mời</option>
              <option value="not-invited">Chưa mời</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="text-gray-400" />
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
                Thông tin khách
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đã mời
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Liên kết mời
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : filteredGuests.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Không tìm thấy khách nào. {searchTerm && 'Hãy thử điều chỉnh tìm kiếm hoặc bộ lọc.'}
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
                    } ${guest.is_invited ? 'opacity-70' : ''} hover:opacity-100 hover:bg-gray-50 transition-all duration-200`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        checked={selectedGuests.includes(guest.id)}
                        onChange={() => handleSelectGuest(guest.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {guest.name}
                          {guest.tags?.includes('anonymous') && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                              <User className="mr-1" />
                              Vô danh
                            </span>
                          )}
                        </div>
                        <div className="flex items-center mt-1 space-x-1">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            guest.side === 'bride' ? 'bg-pink-100 text-pink-800' :
                            guest.side === 'groom' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {guest.side.charAt(0).toUpperCase() + guest.side.slice(1)}
                          </span>

                          {guest.tags && guest.tags.length > 0 && guest.tags.filter(tag => tag !== 'anonymous').map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
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
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleToggleInvited(guest.id, Boolean(guest.is_invited))}
                          className={`
                            relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary
                            ${guest.is_invited ? 'bg-primary' : 'bg-gray-200'}
                          `}
                          role="switch"
                          aria-checked={guest.is_invited}
                          title={guest.is_invited ? 'Nhấp để đánh dấu chưa mời' : 'Nhấp để đánh dấu đã mời'}
                        >
                          <span
                            className={`
                              inline-block h-4 w-4 rounded-full bg-white transition-transform
                              ${guest.is_invited ? 'translate-x-6' : 'translate-x-1'}
                            `}
                          />
                        </button>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {guest.unique_invite_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleCopyLink(guest.unique_invite_id, guest.id, Boolean(guest.is_invited))}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                        title="Sao chép liên kết mời"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedGuest(guest);
                          setIsEditModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="Chỉnh sửa khách"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGuest(guest.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Xóa khách"
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
        confirmText="Xóa"
        type="danger"
      />
    </div>
  );
}
