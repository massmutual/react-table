import { shape, arrayOf, array, bool, object, number, string, func } from 'prop-types';

//Building Blocks
export const Column = shape({
    accessor: string.isRequired,
    label: string.isRequired,
    isVisible: bool.isRequired,
});

export const Columns = arrayOf(Column);

export const InitialColumn = shape({
    accessor: string.isRequired,
    label: string.isRequired,
});

export const InitialColumns = arrayOf(InitialColumn);

export const Sort = shape({
    direction: string.isRequired,
    column: string.isRequired,
});

//Components
export const CellPropType = {
    row: object.isRequired,
    accessor: string.isRequired,
    cellIndex: number.isRequired,
    rowIndex: number.isRequired,
    expandRow: func.isRequired,
    hiddenColumnsLength: number.isRequired,
};

export const ColumnPropType = {
    accessor: string.isRequired,
    label: string.isRequired,
    sortable: bool.isRequired,
    onClick: func.isRequired,
    sort: Sort.isRequired,
};

export const ColumnsPropType = {
    columns: Columns.isRequired,
    sortRows: func.isRequired,
    sort: Sort.isRequired,
};

export const ExpandedRowPropType = {
    row: object.isRequired,
    columns: Columns.isRequired,
    colspan: number.isRequired,
    callbacks: object.isRequired,
};

export const PaginationPropType = {
    currentPage: number.isRequired,
    totalPages: number.isRequired,
    previousPage: func.isRequired,
    nextPage: func.isRequired,
};

export const RowPropType = {
    row: object.isRequired,
    visibleColumns: Columns.isRequired,
    hiddenColumns: Columns.isRequired,
    expandRow: func.isRequired,
    rowIndex: number.isRequired,
    callbacks: object.isRequired,
};

export const RowsPropType = {
    rows: array.isRequired,
    visibleColumns: Columns.isRequired,
    hiddenColumns: Columns.isRequired,
    expandRow: func.isRequired,
    callbacks: object.isRequired,
};

export const SearchPropType = {
    searchString: string.isRequired,
    searchRows: func.isRequired,
    clearSearch: func.isRequired,
};

export const TablePropType = {
    rows: array,
    columns: InitialColumns.isRequired,
    rowSize: number,
    currentPage: number,
    defaultSortColumn: string,
    column: string,
    direction: string,
    callbacks: object,
    resetPagination: bool,
    paginationEventListener: func,
};
