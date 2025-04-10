'use client';

import React, { useState, useMemo } from 'react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  onRowClick?: (item: T) => void;
  selectable?: boolean;
  selectedItems?: (keyof T extends string ? T[keyof T] : never)[];
  onSelectItem?: (id: keyof T extends string ? T[keyof T] : never) => void;
  onSelectAll?: () => void;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
}

/**
 * Reusable data table component with sorting, selection, and custom rendering
 */
export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyField,
  onRowClick,
  selectable = false,
  selectedItems = [],
  onSelectItem,
  onSelectAll,
  isLoading = false,
  emptyMessage = 'No data available',
  className = '',
  headerClassName = '',
  rowClassName = '',
  cellClassName = '',
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Apply sorting to data
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const key = sortConfig.key as keyof T;
      
      if (a[key] === undefined || b[key] === undefined) return 0;
      
      if (a[key] < b[key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Handle sorting
  const requestSort = (key: keyof T | string) => {
    if (!columns.find(col => col.key === key)?.sortable) return;
    
    setSortConfig(prevConfig => {
      if (!prevConfig || prevConfig.key !== key) {
        return { key, direction: 'asc' };
      }
      
      return {
        key,
        direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
      };
    });
  };

  // Get sort direction indicator
  const getSortDirectionIndicator = (key: keyof T | string) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  // Check if all items are selected
  const allSelected = data.length > 0 && selectedItems.length === data.length;

  // Handle row click
  const handleRowClick = (item: T) => {
    if (onRowClick) {
      onRowClick(item);
    }
  };

  // Handle checkbox click without triggering row click
  const handleCheckboxClick = (
    e: React.MouseEvent<HTMLInputElement>,
    id: keyof T extends string ? T[keyof T] : never
  ) => {
    e.stopPropagation();
    if (onSelectItem) {
      onSelectItem(id);
    }
  };

  // Handle select all checkbox click
  const handleSelectAllClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (onSelectAll) {
      onSelectAll();
    }
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th scope="col" className="px-6 py-3 w-10">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={allSelected}
                  onChange={() => {}}
                  onClick={handleSelectAllClick}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key.toString()}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                } ${headerClassName} ${column.className || ''}`}
                onClick={() => requestSort(column.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {column.sortable && (
                    <span className="text-gray-400">
                      {getSortDirectionIndicator(column.key)}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-6 py-4 text-center"
              >
                <div className="flex justify-center">
                  <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((item) => (
              <tr
                key={String(item[keyField])}
                className={`${
                  onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''
                } ${rowClassName}`}
                onClick={() => handleRowClick(item)}
              >
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap w-10">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      checked={selectedItems.includes(item[keyField] as any)}
                      onChange={() => {}}
                      onClick={(e) => handleCheckboxClick(e, item[keyField] as any)}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={`${String(item[keyField])}-${column.key.toString()}`}
                    className={`px-6 py-4 whitespace-nowrap ${cellClassName}`}
                  >
                    {column.render
                      ? column.render(item)
                      : item[column.key as keyof T]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
