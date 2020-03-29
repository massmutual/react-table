import { dynamicSort } from './TableActions'

export const resizeTable = ({ width, state, isCollapsible = true }) => {
    const { columns } = state;
    let visibleColumns = columns.filter(column => column.isVisible );

    let visibleColumnsWidth = 0;
    visibleColumns.map(column => visibleColumnsWidth += column.minWidth);

    if (isCollapsible) {
        state = visibleColumnsWidth > width ? 
                    tryToRemoveColumns({ visibleColumnsWidth, width, state }) :
                    tryToAddColumns({ visibleColumnsWidth, width, state });
    } else {
        state = addAllColumns({ state });
    }

    return state;
};

// Adds all hidden columns to the state irrespective of the available width
export const addAllColumns = ({ state }) => {
    const { columns } = state;
    const hiddenColumns = Object.assign([], columns.filter(column => !column.isVisible));
    hiddenColumns.sort(dynamicSort({column: 'priorityLevel'}));

    while (hiddenColumns.length !== 0) {
        hiddenColumns.shift();
        if (hiddenColumns.length === 0) {
            state = addColumn({ state });
            state = closeAllRows({ state });
        } else {
            state = addColumn({ state })
        }
    }
    return state
}

export const tryToRemoveColumns = ({ visibleColumnsWidth, width, state }) => {
    const { columns } = state;
    let visibleColumns = Object.assign([], columns.filter(column => column.isVisible ));
    visibleColumns.sort(dynamicSort({column: 'priorityLevel'}));

    while(visibleColumnsWidth > width && visibleColumns.length !== 0){
        visibleColumnsWidth -= visibleColumns.pop().minWidth;
        state = removeColumn({ state })
    }
    return state;
};

export const tryToAddColumns = ({ visibleColumnsWidth, width, state }) => {
    const { columns } = state;
    let hiddenColumns = Object.assign([], columns.filter(column => !column.isVisible ));
    hiddenColumns.sort(dynamicSort({column: 'priorityLevel'}));

    while(visibleColumnsWidth <= width && hiddenColumns.length !== 0){
        visibleColumnsWidth += hiddenColumns.shift().minWidth;
        if(visibleColumnsWidth <= width && hiddenColumns.length === 0) {
          state = addColumn({ state });
          state = closeAllRows({ state });
        } else if (visibleColumnsWidth <= width){
            state = addColumn({ state })
        }
    }
    return state;
};

export const closeAllRows = ({ state }) => {
  const { rows } = state;
  const updatedRows = rows.map(row => { return { ...row, isOpen: false } })
  return { ...state, rows: updatedRows };
};

export const removeColumn = ({ state }) => {
    const { columns } = state;
    let combinedColumns = Object.assign([], columns);
    let visibleColumns = Object.assign([], columns.filter(column => column.isVisible));
    let hiddenColumns = Object.assign([], columns.filter(column => !column.isVisible));

    if(visibleColumns.length !== 0) {
        visibleColumns.sort(dynamicSort({column: 'priorityLevel'}));
        const removedColumn = visibleColumns.pop()
        hiddenColumns.push({ ...removedColumn, isVisible: false });
        combinedColumns = [ ...visibleColumns, ...hiddenColumns ];
        combinedColumns.sort(dynamicSort({column: 'position'}));
    }
    return { ...state, columns: combinedColumns };
};
//
export const addColumn = ({ state }) => {
    const { columns } = state;
    let combinedColumns = Object.assign([], columns);
    let visibleColumns = Object.assign([], columns.filter(column => column.isVisible));
    let hiddenColumns = Object.assign([], columns.filter(column => !column.isVisible));

    if(hiddenColumns.length !== 0) {
        hiddenColumns.sort(dynamicSort({column: 'priorityLevel'}));
        const addedColumn = hiddenColumns.shift()
        visibleColumns.push({ ...addedColumn, isVisible: true });
        combinedColumns = [ ...visibleColumns, ...hiddenColumns ];
        combinedColumns.sort(dynamicSort({column: 'position'}));
    }
    return { ...state, columns: combinedColumns };
};
