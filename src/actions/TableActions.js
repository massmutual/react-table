//What rows should be displayed?
export const calculateRows = ({ state }) => {
    const {
        rows,
        pagination: { currentPage, rowSize }
    } = state;
    let selectedRows = [];
    //pagination
    if (rows.length > 0) {
        const startingPoint = ((currentPage - 1) * rowSize);
        const endingPoint = startingPoint + rowSize;
        selectedRows = rows.slice(startingPoint, endingPoint);
    }

    return selectedRows
};

//Sorting Rows
export const sortColumn = ({ column, state }) => {
    const { sortedColumn, sortedDirection } = changeSortFieldAndDirection({ newColumn: column, state });
    state = { ...state, sort: { ...state.sort, column: sortedColumn, direction: sortedDirection } };
    const { sortedRows } = changeRowOrder({ column: sortedColumn, state });
    return { ...state, rows: sortedRows };
};

export const changeSortFieldAndDirection = ({ newColumn, state }) => {
    let newDirection;
    const { sort: { column, direction } } = state;

    if (column === newColumn) {
        switch (direction) {
            case 'none':
                newDirection = 'ascending';
                break;
            case 'ascending':
                newDirection = 'descending';
                break;
            case 'descending':
                newDirection = 'ascending';
                break;
            default:
                newDirection = 'none';
                break;
        }
    } else {
        newDirection = 'ascending';
    }

    return { sortedColumn: newColumn, sortedDirection: newDirection };
};

export const changeRowOrder = ({ column, state }) => {
    const { sort: { direction }, columns } = state;
    let rows = state.rows;
    const [columnBeingSorted, ...b] = columns.filter(c => c.accessor === column);
    const type = (columnBeingSorted && columnBeingSorted.sortable !== false) ? columnBeingSorted.sortType : null;

    switch (direction) {
        case 'ascending':
            rows.sort(dynamicSort({ column, type }));
            break;
        case 'descending':
            rows.sort(dynamicSort({ column, type })).reverse();
            break;
        default:
            rows.sort(dynamicSort({ column, type }));
    }

    return { sortedRows: rows };
};

export const dynamicSort = ({ column, type }) => {
    switch (type) {
        case 'date':
            return (a, b) => {
                const [aMonth, aDay, aYear] = a[column].split('/');
                const [bMonth, bDay, bYear] = b[column].split('/');
                const aDate = [aYear, aMonth, aDay].join('');
                const bDate = [bYear, bMonth, bDay].join('');
                return ((aDate < bDate) ? 1 : (aDate > bDate) ? -1 : 0)
            };
        default:
            return (a, b) => ((a[column] < b[column]) ? -1 : (a[column] > b[column]) ? 1 : 0);
    }
};

//Pagination
export const nextPage = ({ state }) => {
    const { totalPages, currentPage } = state.pagination;
    const validatedCurrentPage = checkPageState({ newPage: currentPage + 1, totalPages, currentPage });

    return changePage({ state, currentPage: validatedCurrentPage })
};

export const previousPage = ({ state }) => {
    const { totalPages, currentPage } = state.pagination;
    const validatedCurrentPage = checkPageState({ newPage: currentPage - 1, totalPages, currentPage });

    return changePage({ state, currentPage: validatedCurrentPage })
};

export const goToPage = (props) => {
    return props.shouldCall ? setCurrentPage(props) : setInputtedPage(props);
};

export const setCurrentPage = ({ state, newPage, shouldCall }) => {
    const { totalPages, currentPage } = state.pagination;
    const validatedCurrentPage = checkPageState({ newPage, totalPages, currentPage, shouldCall });

    return {
        ...state,
        pagination: {
            ...state.pagination,
            currentPage: validatedCurrentPage,
            inputtedPage: validatedCurrentPage
        }
    };
};

export const setInputtedPage = ({ state, newPage, shouldCall }) => {
    const { totalPages, currentPage } = state.pagination;
    const validatedCurrentPage = checkPageState({ newPage, totalPages, currentPage, shouldCall });

    return { ...state, pagination: { ...state.pagination, inputtedPage: validatedCurrentPage } };
};

export const checkPageState = ({ newPage, currentPage, totalPages, shouldCall }) => {
    const isBelowZero = newPage < 0;
    const isZero = newPage === "0";
    const isAboveTotalPages = newPage > totalPages;
    const isNotANumber = isNaN(newPage);
    const isEmpty = newPage.length === 0;

    if (isNotANumber) {
        return currentPage;
    } else if (isZero && shouldCall) {
        return currentPage;
    } else if (isBelowZero) {
        return 1;
    } else if (isAboveTotalPages) {
        return totalPages;
    } else if (isEmpty && shouldCall) {
        return currentPage;
    } else {
        return newPage;
    }
};

export const changePage = ({ state, currentPage }) => {
    const pagination = { ...state.pagination, currentPage, inputtedPage: currentPage };
    if (state.paginationEventListener) state.paginationEventListener({ pagination });
    return { ...state, pagination }
};

//Hide or Show Rows
export const expandRow = ({ rowIndex, state }) => {
    const actualIndex = rowIndex + ((state.pagination.currentPage - 1) * state.pagination.rowSize);
    const newRows = state.rows.map((row, index) => {
        return (index === actualIndex) ? { ...row, isOpen: !row.isOpen } : row
    });
    return { ...state, rows: newRows };
};
