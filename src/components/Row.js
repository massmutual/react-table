//React
import React from 'react';
import { RowPropType } from '../utils/propTypes';
//Components
import Cell from './Cell';
import ExpandedRow from './ExpandedRow';

const Row = ({ row, visibleColumns, hiddenColumns, expandRow, rowIndex, callbacks, icons }) => {
    const hiddenColumnsLength = hiddenColumns.length;

    const cells = visibleColumns.map(({ accessor, CustomComponent }, index) => {
        return <Cell key={ accessor }
                     row={ row }
                     rowIndex={ rowIndex }
                     cellIndex={ index }
                     icons={ icons }
                     accessor={ accessor }
                     expandRow={ expandRow }
                     hiddenColumnsLength={ hiddenColumnsLength }
                     CustomComponent={ rowIndex === -1 ? undefined : CustomComponent }
                     CustomFunction={ callbacks[accessor] } />
    });

    return (
            <tr key='normalRow'>
                { cells }
            </tr>
    );
};

Row.propTypes = RowPropType;

export default Row
