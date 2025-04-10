'use client';

import React, { useState, useEffect } from 'react';
import { Guest } from '@/lib/types';
import { DataTable } from '../ui/DataTable';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { FaUserSecret, FaTrash, FaUserPlus } from 'react-icons/fa';
import { useGuests } from '@/hooks/useGuests';
import { useToastContext } from '@/contexts/ToastContext';
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
  const { showSuccess, showError } = useToastContext();

  useEffect(() => {
    const loadAnonymousGuests = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/guests?anonymous=true');
        
        if (!response.ok) {
          throw new Error('Failed to fetch anonymous RSVPs');
        }
        
        const data = await response.json();
        setAnonymousGuests(data);
      } catch (error) {
        console.error('Error loading anonymous RSVPs:', error);
        showError('Failed to load anonymous RSVPs');
      } finally {
        setLoading(false);
      }
    };

    loadAnonymousGuests();
  }, [showError]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this anonymous RSVP?')) {
      try {
        await deleteGuest(id);
        setAnonymousGuests(prev => prev.filter(guest => guest.id !== id));
        showSuccess('Anonymous RSVP deleted successfully');
      } catch (error) {
        console.error('Error deleting anonymous RSVP:', error);
        showError('Failed to delete anonymous RSVP');
      }
    }
  };

  const handleConvertToGuest = async (anonymousGuest: Guest) => {
    try {
      await convertAnonymousToGuest(anonymousGuest.id);
      setAnonymousGuests(prev => prev.filter(guest => guest.id !== anonymousGuest.id));
      showSuccess('Anonymous RSVP converted to guest successfully');
      // Refresh the guest list
      fetchGuests();
    } catch (error) {
      console.error('Error converting anonymous RSVP to guest:', error);
      showError('Failed to convert anonymous RSVP to guest');
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
          <FaUserSecret className="text-purple-500 mr-2" />
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
            icon={<FaUserPlus />}
            onClick={() => handleConvertToGuest(row)}
            title="Convert to regular guest"
          >
            Convert
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={<FaTrash />}
            onClick={() => handleDelete(row.id)}
            title="Delete anonymous RSVP"
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
          <span className="ml-3">Loading anonymous RSVPs...</span>
        </div>
      </Card>
    );
  }

  if (anonymousGuests.length === 0) {
    return (
      <Card>
        <div className="text-center p-8">
          <FaUserSecret className="text-purple-400 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Anonymous RSVPs</h3>
          <p className="text-gray-500">
            When guests RSVP without an invitation link, they will appear here.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center mb-4">
        <FaUserSecret className="text-purple-500 mr-2" />
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
