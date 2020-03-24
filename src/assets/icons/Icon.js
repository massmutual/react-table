//React
import React from 'react';
//Imported Icons
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdSearch } from 'react-icons/md';
import { FaCaretUp, FaCaretDown, FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti'

export const getIcon = ({ onClick, name='', size=16 }) => {
    switch (name) {
        case 'OpenRow':
            return <span><MdKeyboardArrowDown onClick={ onClick } size={ size } className="brand-primary-light" /></span>;
        case 'CloseRow':
            return <span><MdKeyboardArrowUp onClick={ onClick } size={ size } className="brand-primary-light" /></span>;
        case 'ascending':
            return <span><FaCaretUp onClick={ onClick } size={ size } className="brand-primary-light" /></span>;
        case 'descending':
            return <span><FaCaretDown onClick={ onClick } size={ size } className="brand-primary-light" /></span>;
        case 'leftChevron':
            return <span className="arrow-left"><FaChevronLeft onClick={ onClick } size={ size } className="brand-primary-light" /></span>;
        case 'rightChevron':
            return <span className="arrow-right"><FaChevronRight onClick={ onClick } size={ size } className="brand-primary-light" /></span>;
        case 'search':
            return <span className="search-icon"><MdSearch size={ size } className="brand-primary-light" /></span>;
        case 'clear':
            return <span className="clear-icon"><TiDeleteOutline size={ size } className="brand-primary-light" /></span>;   
        default:
            return <span />;
    }
};

/**
 * Handles expand and collapse of row using Keyboard event "Enter"
 */
const handleKeyDown = (rowIndex, expandRow, event) => {
    if (event && event.key === "Enter") {
        expandRow({ rowIndex })
    }
}

export const expandIcon = ({ cellIndex, rowIndex, row, hiddenColumnsLength, expandRow, icons }) => {
    const EXPAND_DIRECTION_ICONS = icons !== null && icons.closeRow !== undefined && icons.openRow !== undefined;
    const name = row.isOpen ? 'CloseRow' : 'OpenRow';
    const IS_FIRST_CELL = cellIndex === 0;
    const IS_HIDDEN_COULMNS = hiddenColumnsLength > 0;
    const IS_NOT_EMPTY_ROW = Object.keys(row).length > 1;

    if(IS_FIRST_CELL && IS_HIDDEN_COULMNS && IS_NOT_EMPTY_ROW && !EXPAND_DIRECTION_ICONS){
        return getIcon({ name, onClick: () => expandRow({ rowIndex }) });
    } else if(IS_FIRST_CELL && IS_HIDDEN_COULMNS && IS_NOT_EMPTY_ROW && EXPAND_DIRECTION_ICONS){
        const rowIcon = row.isOpen ? icons.closeRow : icons.openRow;
        return <span
                onClick={() => expandRow({ rowIndex })}
                onKeyDown={e => handleKeyDown(rowIndex, expandRow, e)}> { rowIcon }</span>;
    }

    return getIcon({ onClick: {}, name: 'none' });
};

export const sortDirection = ({ direction='none', size=20, icons }) => {
    const SORT_DIRECTION_ICONS = icons !== null && icons.ascending !== undefined && icons.descending !== undefined;

    switch (direction) {
        case 'ascending':
          return SORT_DIRECTION_ICONS
          ? <button className="col-sort" aria-label="Sort ascending">{icons.ascending}</button>
          : <button className="col-sort" aria-label="Sort ascending"><FaCaretUp size={ size } className="brand-primary-light" /></button>;
    case 'descending':
        return SORT_DIRECTION_ICONS
            ? <button className="col-sort" aria-label="Sort descending">{icons.descending}</button>
            : <button className="col-sort" aria-label="Sort descending"><FaCaretDown size={ size } className="brand-primary-light" /></button>;
    default:
        return <button className="col-sort" aria-label="Not sorted" />;
      }
};