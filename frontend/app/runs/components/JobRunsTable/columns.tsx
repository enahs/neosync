'use client';

import { ColumnDef } from '@tanstack/react-table';

import { JobRun } from '@/neosync-api-client/mgmt/v1alpha1/job_pb';
import { formatDateTime } from '@/util/util';
import { PlainMessage, Timestamp } from '@bufbuild/protobuf';
import NextLink from 'next/link';
import JobRunStatus from '../JobRunStatus';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

interface GetColumnsProps {
  onDeleted(id: string): void;
}

export function getColumns(
  props: GetColumnsProps
): ColumnDef<PlainMessage<JobRun>>[] {
  const { onDeleted } = props;
  return [
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex w-[100px] items-center">
            <JobRunStatus status={row.getValue('status')} />
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Job Run" />
      ),
      cell: ({ row }) => {
        return (
          <div>
            <NextLink
              className="hover:underline"
              href={`/runs/${row.getValue('id')}`}
            >
              <span>{row.getValue('id')}</span>
            </NextLink>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue('name')}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'jobId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Job Id" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <NextLink
              className="hover:underline"
              href={`/jobs/${row.getValue('jobId')}`}
            >
              <span className="max-w-[500px] truncate font-medium">
                {row.getValue('jobId')}
              </span>
            </NextLink>
          </div>
        );
      },
    },
    {
      accessorKey: 'startedAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Started At" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {formatDateTime(row.getValue<Timestamp>('startedAt').toDate())}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'completedAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Completed At" />
      ),
      cell: ({ row }) => {
        const completedAt = row.getValue('completedAt')
          ? formatDateTime(row.getValue<Timestamp>('completedAt').toDate())
          : undefined;
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {completedAt}
            </span>
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableRowActions row={row} onDeleted={() => onDeleted(row.id)} />
      ),
    },
  ];
}
