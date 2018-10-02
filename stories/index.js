import React from 'react';
import '../src/assets/styles/global.css';

import { storiesOf } from '@storybook/react';

import ReactCollapsingTable from '../src/index';
import {
    basicTableProps,
    basicTablePropsPaginationAndSearchShow,
    sortColumnAndDirectionProps,
    rowSizeProps,
    customComponentProps,
    paginationListenerProps,
    sortableColumnsProps,
    customPaginationComponent,
    customSortComponent,
    customIconProps,
    differentTheme,
    unsorted,
} from './props';


storiesOf('React Collapsing Table', module)
    .add('Basic Table', () => <ReactCollapsingTable {...basicTableProps} />)
    .add('Turn Pagination and Search On', () => <ReactCollapsingTable {...basicTablePropsPaginationAndSearchShow } />)
    .add('Set Column and Direction displayed on load', () => <ReactCollapsingTable {...sortColumnAndDirectionProps} />)
    .add('Set the total rows displayed', () => <ReactCollapsingTable {...rowSizeProps} />)
    .add('Set the a custom component and callback', () => <ReactCollapsingTable {...customComponentProps} />)
    .add('Set a pagination listener function', () => <ReactCollapsingTable {...paginationListenerProps} />)
    .add('Only certain columns can be sorted on', () => <ReactCollapsingTable {...sortableColumnsProps} />)
    .add('Custom Text Input Pagination', () => <ReactCollapsingTable {...customPaginationComponent} />)
    .add('Custom Sort', () => <ReactCollapsingTable {...customSortComponent} />)
    .add('Custom Icons for the open/close row and de/ascending icon', () => <ReactCollapsingTable {...customIconProps} />)
    .add('Columns with sort feature disabled', () => <ReactCollapsingTable {...unsorted} />)
    .add('Custom theme, no applied styles', () => <ReactCollapsingTable {...differentTheme} />);
