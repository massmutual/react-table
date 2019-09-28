import React from 'react';
import '../src/assets/styles/global.css';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

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
    customIconProps,
    differentTheme,
    unsorted,
    footerCallbackProps,
    CustomComponentAndfooterCallbackProps
} from './props';

storiesOf('React Collapsing Table', module)
    .addDecorator(withA11y)
    .add(
        'Basic Table', 
        () => <ReactCollapsingTable {...basicTableProps} />, 
        { jest: ['Table.test.js',],})
    .add('Turn Pagination and Search On', () => <ReactCollapsingTable {...basicTablePropsPaginationAndSearchShow } />)
    .add('Set Column and Direction displayed on load', () => <ReactCollapsingTable {...sortColumnAndDirectionProps} />)
    .add('Set the total rows displayed', () => <ReactCollapsingTable {...rowSizeProps} />)
    .add('Set the a custom component and callback', () => <ReactCollapsingTable {...customComponentProps} />)
    .add('Set a pagination listener function', () => <ReactCollapsingTable {...paginationListenerProps} />)
    .add('Only certain columns can be sorted on', () => <ReactCollapsingTable {...sortableColumnsProps} />)
    .add('Custom Text Input Pagination', () => <ReactCollapsingTable {...customPaginationComponent} />)
    .add('Custom Icons for the open/close row and de/ascending icon', () => <ReactCollapsingTable {...customIconProps} />)
    .add('Columns with sort feature disabled', () => <ReactCollapsingTable {...unsorted} />)
    .add('Custom theme, no applied styles', () => <ReactCollapsingTable {...differentTheme} />)
    .add('Dynamic table columns', () => {
        const dynamicColumns = basicTableProps.columns.filter(column => boolean(column.label, true))
        return <ReactCollapsingTable {...basicTableProps} columns={dynamicColumns} />
    })
    .add('Footer Callback', () => <ReactCollapsingTable {...footerCallbackProps} />)
    .add('Set The custom Component and Footer Callback', () => <ReactCollapsingTable {...CustomComponentAndfooterCallbackProps} />);
