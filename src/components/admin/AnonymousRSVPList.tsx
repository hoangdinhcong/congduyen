'use client';

import React, { useState, useEffect } from 'react';
import { Guest } from '@/lib/types';
import { DataTable } from '../ui/DataTable';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { User, Trash2, UserPlus } from 'lucide-react';
import { useGuests } from '@/hooks/useGuests';
import { showToast } from '@/components/ui/ToastProvider';
import { Card } from '../ui/Card';
import { Pagination } from '../ui/Pagination';

/**
 * Component to display and manage anonymous RSVPs in the admin dashboard
 */
export default function AnonymousRSVPList() {
  const [anonymousGuests, setAnonymousGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const { deleteGuest, convertAnonymousToGuest, fetchGuests } = useGuests();

  useEffect(() => {
    const loadAnonymousGuests = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/guests?anonymous=true');

        if (!response.ok) {
          throw new Error('Không thể tải danh sách khách vô danh');
        }

        const data = await response.json();
        setAnonymousGuests(data);
      } catch (error) {
        console.error('Error loading anonymous RSVPs:', error);
        showToast.error('Không thể tải danh sách khách vô danh');
      } finally {
        setLoading(false);
      }
    };

    loadAnonymousGuests();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khách vô danh này?')) {
      try {
        await deleteGuest(id);
        setAnonymousGuests(prev => prev.filter(guest => guest.id !== id));
        showToast.success('Xóa khách vô danh thành công');
      } catch (error) {
        console.error('Error deleting anonymous RSVP:', error);
        showToast.error('Không thể xóa khách vô danh');
      }
    }
  };

  const handleConvertToGuest = async (anonymousGuest: Guest) => {
    try {
      await convertAnonymousToGuest(anonymousGuest.id);
      setAnonymousGuests(prev => prev.filter(guest => guest.id !== anonymousGuest.id));
      showToast.success('Chuyển khách vô danh thành khách mời thành công');
      // Refresh the guest list
      fetchGuests();
    } catch (error) {
      console.error('Error converting anonymous RSVP to guest:', error);
      showToast.error('Không thể chuyển khách vô danh thành khách mời');
    }
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = anonymousGuests.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (row: Guest) => (
        <div className="flex items-center">
          <User className="text-purple-500 mr-2" />
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      key: 'side',
      header: 'Side',
      render: (row: Guest) => (
        <Badge
          variant={row.side === 'bride' ? 'primary' : 'secondary'}
        >
          {row.side === 'bride' ? 'Bride' : row.side === 'groom' ? 'Groom' : 'N/A'}
        </Badge>
      ),
    },
    {
      key: 'rsvp_status',
      header: 'RSVP Status',
      render: (row: Guest) => {
        const status = row.rsvp_status;
        let badgeVariant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' = 'warning';

        if (status === 'attending') badgeVariant = 'success';
        else if (status === 'declined') badgeVariant = 'danger';

        return (
          <Badge variant={badgeVariant}>
            {status === 'attending' ? 'Attending' :
             status === 'declined' ? 'Declined' : 'Pending'}
          </Badge>
        );
      },
    },
    {
      key: 'created_at',
      header: 'Date',
      render: (row: Guest) => {
        const date = row.created_at
          ? new Date(row.created_at).toLocaleDateString()
          : 'N/A';
        return date;
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row: Guest) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={<UserPlus />}
            onClick={() => handleConvertToGuest(row)}
            title="Chuyển thành khách mời"
          >
            Chuyển
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={<Trash2 />}
            onClick={() => handleDelete(row.id)}
            title="Xóa khách vô danh"
          />
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <Card>
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3">Đang tải danh sách khách vô danh...</span>
        </div>
      </Card>
    );
  }

  if (anonymousGuests.length === 0) {
    return (
      <Card>
        <div className="text-center p-8">
          <User className="text-purple-400 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không có khách vô danh</h3>
          <p className="text-gray-500">
            Khi khách phản hồi mà không có liên kết mời, họ sẽ xuất hiện ở đây.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center mb-4">
        <User className="text-purple-500 mr-2" />
        <h2 className="text-lg font-medium">Anonymous RSVPs ({anonymousGuests.length})</h2>
      </div>

      <DataTable
        columns={columns}
        data={currentItems}
        keyField="id"
        emptyMessage="No anonymous RSVPs found"
      />

      {anonymousGuests.length > pageSize && (
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalItems={anonymousGuests.length}
            pageSize={pageSize}
            onPageChange={paginate}
          />
        </div>
      )}
    </Card>
  );
}
