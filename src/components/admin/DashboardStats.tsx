'use client';

import React, { useEffect, useState } from 'react';
import { FaUsers, FaCheck, FaTimes, FaClock } from 'react-icons/fa';
import { RSVPStats } from '../../lib/types';

export default function DashboardStats() {
  const [stats, setStats] = useState<RSVPStats>({
    total: 0,
    attending: 0,
    declined: 0,
    pending: 0,
    bride: {
      total: 0,
      attending: 0,
      declined: 0,
      pending: 0,
    },
    groom: {
      total: 0,
      attending: 0,
      declined: 0,
      pending: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        
        const data = await response.json();
        setStats(data);
      } catch (err: any) {
        console.error('Error fetching stats:', err);
        setError(err.message || 'An error occurred while fetching statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>{error}</p>
        <p className="mt-2 text-sm">Please try refreshing the page.</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Guests',
      value: stats.total,
      icon: FaUsers,
      color: 'bg-blue-100 text-blue-800',
      iconColor: 'text-blue-500',
    },
    {
      title: 'Attending',
      value: stats.attending,
      icon: FaCheck,
      color: 'bg-green-100 text-green-800',
      iconColor: 'text-green-500',
    },
    {
      title: 'Declined',
      value: stats.declined,
      icon: FaTimes,
      color: 'bg-red-100 text-red-800',
      iconColor: 'text-red-500',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: FaClock,
      color: 'bg-yellow-100 text-yellow-800',
      iconColor: 'text-yellow-500',
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">RSVP Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.title} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${card.color}`}>
                  <card.icon className={`h-6 w-6 ${card.iconColor}`} aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{card.title}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{card.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Side-specific stats if available */}
      {(stats.bride || stats.groom) && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Side-Specific Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bride's Side */}
            {stats.bride && (
              <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-primary mb-4">Bride&apos;s Side</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-xl font-semibold">{stats.bride.total}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Attending</p>
                    <p className="text-xl font-semibold text-green-600">{stats.bride.attending}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-xl font-semibold text-yellow-600">{stats.bride.pending}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Groom's Side */}
            {stats.groom && (
              <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-primary mb-4">Groom&apos;s Side</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-xl font-semibold">{stats.groom.total}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Attending</p>
                    <p className="text-xl font-semibold text-green-600">{stats.groom.attending}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-xl font-semibold text-yellow-600">{stats.groom.pending}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
