//React
import React, { Component }  from 'react';
import { TablePropType } from '../utils/propTypes';
//Components
import Search from './Search';
import Columns from './Columns';
import Rows from './Rows';
import Pagination from './Pagination';
import { calculateRows, sortColumn, nextPage, previousPage, goToPage, expandRow, setInputtedPage } from '../actions/TableActions'
import { resizeTable } from '../actions/ResizeTableActions'
import { searchRows, clearSearch } from '../actions/SearchActions';
import throttle from 'lodash.throttle';
import cloneDeep from 'lodash.clonedeep';

const ENTER_WAS_PRESSED = 13;

export class Table extends Component {
    constructor(props) {
        super(props);

        const {
            columns,
            rows = [],
            rowSize = 10,
            currentPage = 1,
            column = props.columns.reduce((prev, curr) => {
                return prev.priorityLevel < curr.priorityLevel ? prev : curr;
            }).accessor,
            direction = 'ascending',
            callbacks = {},
            showSearch = false,
            showPagination = false,
            resetPagination = true,
            paginationEventListener = null,
            totalPages = (rows.length === 0) ? 1 : Math.ceil(rows.length / rowSize),
            CustomPagination = null,
            icons = null,
            id = null,
            theme = 'react-collapsible-theme'
        } = props;

        this.state = {
            columns: columns.map(column => {
                const sortable = column.hasOwnProperty('sortable') ? column.sortable : true;
                return { ...column, isVisible: true, sortable } }),
            rows,
            searchString: '',
            pagination: {
                rowSize,
                currentPage,
                inputtedPage: currentPage,
                totalPages,
            },
            sort: {
                column,
                direction,
            },
            callbacks,
            showSearch,
            showPagination,
            resetPagination,
            paginationEventListener,
            CustomPagination,
            icons,
            id,
            theme,
        };

        this.resizeTable = this.resizeTable.bind(this);
        this.sortRows = this.sortRows.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.expandRow = this.expandRow.bind(this);
        this.searchRows = this.searchRows.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }

    componentWillMount(){
        window.addEventListener('resize', throttle(this.resizeTable, 150));
    }

    componentDidMount(){
        this.resizeTable();
    }

    componentWillReceiveProps({ rows }){
        this.setState(currentState => {
            const totalPages = (rows.length === 0) ? 1 : Math.ceil(rows.length / currentState.pagination.rowSize);
            const nextPage = currentState.resetPagination ? 1 : Math.min(totalPages, currentState.pagination.currentPage);
            return {
                ...currentState,
                rows,
                pagination: {
                    ...currentState.pagination,
                    currentPage: nextPage,
                    totalPages: totalPages
                }
            }
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeTable);
    }

    resizeTable() {
        this.setState(currentState => {
            return resizeTable({ width: window.innerWidth, state: currentState })
        })
    };

    sortRows({ column }) {
        this.setState(currentState => {
            return sortColumn({ column, state: currentState })
        });
    }

    nextPage() {
        this.setState(currentState => {
            return nextPage({ state: currentState })
        });
    };

    previousPage() {
        this.setState(currentState => {
            return previousPage({ state: currentState })
        });
    };

    goToPage({ newPage, charCode, target }) {
        const shouldCall = (newPage !== undefined || charCode === ENTER_WAS_PRESSED );
        const pageNumber = newPage === undefined ? target === undefined ? this.state.pagination.currentPage : target.value : newPage;

        this.setState(currentState => {
            return goToPage({newPage: pageNumber, state: currentState, shouldCall})
        })
    }

    expandRow({ rowIndex }) {
        this.setState(currentState => {
            return expandRow({ rowIndex, state: currentState })
        });
    }

    searchRows({ target: { value }}) {
        this.setState((currentState, currentProps) => {
            return searchRows({ searchString: value, state: currentState, initialRows: cloneDeep(currentProps.rows) })
        });
    }

    clearSearch() {
        this.setState((currentState, currentProps) => {
            return clearSearch({ state: currentState, initialRows: cloneDeep(currentProps.rows) })
        });
    }

    render(){
        const {
            columns,
            pagination: { currentPage, totalPages, inputtedPage },
            callbacks,
            showSearch,
            showPagination,
            CustomPagination,
            icons,
            id,
            theme,
        } = this.state;
        const displayedRows = calculateRows({ state: this.state });
        const visibleColumns = Object.assign([], columns.filter(column => column.isVisible));
        const hiddenColumns = Object.assign([], columns.filter(column => !column.isVisible));

        const PaginationComponent = showPagination && CustomPagination
            ? <CustomPagination currentPage={ currentPage }
                                inputtedPage={ inputtedPage }
                                totalPages={ totalPages }
                                goToPage={ this.goToPage }
                                nextPage={ this.nextPage }
                                previousPage={ this.previousPage } />
            : showPagination
                ? <Pagination currentPage={ currentPage }
                              totalPages={ totalPages }
                              nextPage={ this.nextPage }
                              previousPage={ this.previousPage } />
                : null;

        const SearchComponent = showSearch && <Search searchString={ this.state.searchString }
                                                      searchRows={ this.searchRows }
                                                      clearSearch={ this.clearSearch } />;

        return (
            <div className={theme}>
                { SearchComponent }
                <table className="react-collapsible" id={ id }>
                    <Columns icons={ icons }
                             columns={ visibleColumns }
                             sortRows={ this.sortRows }
                             sort={ this.state.sort } />
                    <Rows icons={ icons }
                          rows={ displayedRows }
                          visibleColumns={ visibleColumns }
                          hiddenColumns={ hiddenColumns }
                          expandRow={ this.expandRow }
                          callbacks={ callbacks } />
                </table>
                { PaginationComponent }
            </div>
        );
    }
}

Table.propTypes = TablePropType;

export default Table
