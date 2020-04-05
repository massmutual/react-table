//React
import React, { Component }  from 'react';
import { TablePropType } from '../utils/propTypes';
//Components
import Search from './Search';
import Columns from './Columns';
import Rows from './Rows';
import Pagination from './Pagination';
import { calculateRows, sortColumn, nextPage, previousPage, goToPage, expandRow, changeSortFieldAndDirection } from '../actions/TableActions'
import { resizeTable } from '../actions/ResizeTableActions'
import { searchRows, clearSearch, toggleSearchInputIcons } from '../actions/SearchActions';
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
            paginationEventListener = null,
            totalPages = null,
            CustomPagination = null,
            icons = null,
            id = null,
            theme = 'react-collapsible-theme',
            showSearchIcon = true,
            showClearIcon = false,
            isCollapsible = true,
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
                totalPages: totalPages || ((rows.length === 0) ? 1 : Math.ceil(rows.length / rowSize)),
                isServerPagination: totalPages != null
            },
            sort: {
                column,
                direction,
            },
            callbacks,
            showSearch,
            showPagination,
            paginationEventListener,
            CustomPagination,
            icons,
            id,
            theme,
            showSearchIcon,
            showClearIcon,
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

    componentWillReceiveProps({ rows, columns, currentPage, totalPages }){
        this.setState(currentState => {
            return {
                ...currentState,
                rows,
                columns: columns.map(column => {
                    const sortable = column.hasOwnProperty('sortable') ? column.sortable : true;
                    return { ...column, isVisible: true, sortable }
                }),
                pagination: {
                    ...currentState.pagination,
                    currentPage: currentPage || 1,
                    totalPages: totalPages || ((rows.length === 0) ? 1 : Math.ceil(rows.length / currentState.pagination.rowSize)),
                    isServerPagination: totalPages != null
                }
            }
        })
    }

    componentDidUpdate(prevProps){
        if (prevProps.isCollapsible !== this.props.isCollapsible) {
            this.resizeTable()
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeTable);
    }

    resizeTable() {
        const { isCollapsible } = this.props;
        this.setState(currentState => {
            return resizeTable({ width: window.innerWidth, state: currentState, isCollapsible })
        })
    };

    sortRows({ column }) {
        if (!this.props.updateData) {
            this.setState(currentState => {
                return sortColumn({ column, state: currentState });
            });
            return
        }

        this.setState(currentState => {
            const { sortedColumn, sortedDirection } = changeSortFieldAndDirection({ newColumn: column, state: currentState });
            return { ...currentState, sort: { ...currentState.sort, column: sortedColumn, direction: sortedDirection } };
        }, () => {
            const { pagination: { currentPage }, sort } = this.state;
            this.props.updateData({ page: currentPage, sort });
        })
    }

    nextPage() {
        if (!this.props.updateData) {
            this.setState(currentState => {
                return nextPage({ state: currentState })
            });
            return
        }

        const { pagination: { currentPage, totalPages }, sort } = this.state;
        if (currentPage < totalPages) this.props.updateData({ page: currentPage + 1, sort });
    };

    previousPage() {
        if (!this.props.updateData) {
            this.setState(currentState => {
                return previousPage({ state: currentState })
            });
            return
        }

        const { pagination: { currentPage }, sort } = this.state;
        if (currentPage > 1) this.props.updateData({ page: currentPage - 1, sort });
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
        this.toggleSearchInputIcons(value);
        
        this.setState((currentState, currentProps) => {
            return searchRows({ searchString: value, state: currentState, initialRows: cloneDeep(currentProps.rows) })
        });
    }

    clearSearch() {
        this.toggleSearchInputIcons();

        this.setState((currentState, currentProps) => {
            return clearSearch({ state: currentState, initialRows: cloneDeep(currentProps.rows) })
        });
    }

    toggleSearchInputIcons(value) {
        this.setState((currentState) => {
            return toggleSearchInputIcons({ searchString: value, state: currentState })
        });
    }

    render(){
        const {
            columns,
            pagination: { currentPage, totalPages, inputtedPage, isServerPagination },
            callbacks,
            showSearch,
            showPagination,
            CustomPagination,
            icons,
            id,
            theme,
            rows
        } = this.state;
        const displayedRows = isServerPagination ? rows : calculateRows({ state: this.state })
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
                                                      clearSearch={ this.clearSearch }
                                                      showSearchIcon={ this.state.showSearchIcon }
                                                      showClearIcon={ this.state.showClearIcon } />;

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
