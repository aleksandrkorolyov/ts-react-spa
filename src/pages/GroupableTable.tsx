import React from 'react';
import {
    GroupingState,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    getCoreRowModel,
    getGroupedRowModel,
    getExpandedRowModel,
    ColumnDef,
    flexRender,
} from '@tanstack/react-table'
import { makeData, Person } from '../generators/makeData'

const GroupableTable: React.FC = () => {

    const columns = React.useMemo<ColumnDef<Person>[]>(
        () => [
            {
                accessorKey: 'firstName',
                header: 'First Name',
                cell: info => info.getValue(),
                getGroupingValue: row => `${row.firstName} ${row.lastName}`,
            },
            {
                accessorFn: row => row.lastName,
                id: 'lastName',
                header: () => <span>Last Name</span>,
                cell: info => info.getValue(),
            },
            {
                accessorKey: 'age',
                header: () => 'Age',
                aggregatedCell: ({ getValue }) =>
                    Math.round(getValue<number>() * 100) / 100,
                aggregationFn: 'median',
            },
            {
                accessorKey: 'visits',
                header: () => <span>Visits</span>,
                aggregationFn: 'sum',
            },
            {
                accessorKey: 'status',
                header: 'Status',
            },
            {
                accessorKey: 'progress',
                header: 'Profile Progress',
                cell: ({ getValue }) =>
                    Math.round(getValue<number>() * 100) / 100 + '%',
                aggregationFn: 'mean',
                aggregatedCell: ({ getValue }) =>
                    Math.round(getValue<number>() * 100) / 100 + '%',
            },
        ],
        []
    )

    const [data] = React.useState(() => makeData(100))

    const [grouping, setGrouping] = React.useState<GroupingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            grouping,
        },
        onGroupingChange: setGrouping,
        getExpandedRowModel: getExpandedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        debugTable: true,
    })

    return (
        <div className="p-2">
            <div className="h-2" />
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {header.column.getCanGroup() ? (
                                                    // If the header can be grouped, let's add a toggle
                                                    <button
                                                        {...{
                                                            onClick: header.column.getToggleGroupingHandler(),
                                                            style: {
                                                                cursor: 'pointer',
                                                            },
                                                        }}
                                                    >
                                                        {header.column.getIsGrouped()
                                                            ? `🛑(${header.column.getGroupedIndex()}) `
                                                            : `👊 `}
                                                    </button>
                                                ) : null}{' '}
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </div>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getExpandedRowModel().rows.map(row => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td
                                            {...{
                                                key: cell.id,
                                                style: {
                                                    background: cell.getIsGrouped()
                                                        ? '#0aff0082'
                                                        : cell.getIsAggregated()
                                                            ? '#ffa50078'
                                                            : cell.getIsPlaceholder()
                                                                ? '#ff000042'
                                                                : 'white',
                                                },
                                            }}
                                        >
                                            {cell.getIsGrouped() ? (
                                                // If it's a grouped cell, add an expander and row count
                                                <>
                                                    <button
                                                        {...{
                                                            onClick: row.getToggleExpandedHandler(),
                                                            style: {
                                                                cursor: row.getCanExpand()
                                                                    ? 'pointer'
                                                                    : 'normal',
                                                            },
                                                        }}
                                                    >
                                                        {row.getIsExpanded() ? '👇' : '👉'}{' '}
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}{' '}
                                                        ({row.subRows.length})
                                                    </button>
                                                </>
                                            ) : cell.getIsAggregated() ? (
                                                flexRender(
                                                    cell.column.columnDef.aggregatedCell ??
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            ) : cell.getIsPlaceholder() ? null : (
                                                flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default GroupableTable;