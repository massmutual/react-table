//React
import React from 'react';
//Component
import Table from '../../components/Table';
import * as searchActions from '../../actions/SearchActions';
import * as resizeTableActions from '../../actions/ResizeTableActions';
import * as tableActions from '../../actions/TableActions';
import TextInputPagination from '../../../stories/TextInputPagination';

//Testing
import { mount, shallow, } from 'enzyme';

describe('Table', () => {
    let wrapper, props, instance;

    beforeEach(() => {
        props = {
            sort: { direction: 'none', column: '', defaultSortColumn: 'email' },
            pagination: { currentPage: 1, inputtedPage: 1, rowSize: 5, totalPages: 1 },
            columns: [
                { accessor: 'firstName', label: 'First Name', isVisible: true, minWidth: 100, priorityLevel: 3, position: 1, },
                { accessor: 'lastName', label: 'Last Name', isVisible: true, minWidth: 50, priorityLevel: 1, position: 2, },
                { accessor: 'email', label: 'Email', isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
            ],
            rows: [
                { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
                { firstName: 'Matt', lastName: 'Smith', isOpen: true },
                { firstName: 'Michelle', lastName: 'Piper', isOpen: true },
            ],
        };

        searchActions.clearSearch = jest.fn();
        searchActions.searchRows = jest.fn();

        resizeTableActions.resizeTable = jest.fn();

        tableActions.sortColumn = jest.fn();
        tableActions.nextPage = jest.fn();
        tableActions.goToPage = jest.fn();
        tableActions.previousPage = jest.fn();
        tableActions.expandRow = jest.fn();

        wrapper = shallow(<Table { ...props } />);
        instance = wrapper.instance();
    });

    it('should have all of the basic default table components', () => {
        wrapper = mount(<Table { ...props }/>);
        const searches = wrapper.find('Search');
        const columns = wrapper.find('Columns');
        const rows = wrapper.find('Rows');
        const paginations = wrapper.find('Pagination');

        expect(paginations.length).toBe(0);
        expect(rows.length).toBe(1);
        expect(columns.length).toBe(1);
        expect(searches.length).toBe(0);
    });

    it('should render Search component', () => {
        props = { ...props, showSearch: true };
        wrapper = shallow(<Table { ...props }/>);
        const searches = wrapper.find('Search');

        expect(searches.length).toBe(1);
    });

    it('should render Pagination component', () => {
        props = { ...props, showPagination: true };
        wrapper = shallow(<Table { ...props }/>);

        const paginations = wrapper.find('Pagination');

        expect(paginations.length).toBe(1);
    });

    it('should not render Search component', () => {
        props = { ...props, showSearch: false };
        wrapper = shallow(<Table { ...props }/>);
        const searches = wrapper.find('Search');

        expect(searches.length).toBe(0);
    });

    it('should not render Pagination component', () => {
        props = { ...props, showPagination: false };
        wrapper = shallow(<Table { ...props }/>);

        const paginations = wrapper.find('Pagination');

        expect(paginations.length).toBe(0);
    });

    it('should render a Custom Pagination component', () => {
        props = { ...props, showPagination: true, CustomPagination: TextInputPagination };
        wrapper = shallow(<Table { ...props }/>);

        const paginations = wrapper.find('TextInputPagination');

        expect(paginations.length).toBe(1);
    });

    it('should render correctly with no rows', () => {
        props = {
            sort: { direction: 'none', column: '', defaultSortColumn: 'email' },
            pagination: { currentPage: 1, rowSize: 5, },
            columns: [
                { accessor: 'firstName', label: 'First Name', isVisible: true, minWidth: 100, priorityLevel: 3, position: 1, },
                { accessor: 'lastName', label: 'Last Name', isVisible: true, minWidth: 50, priorityLevel: 1, position: 2, },
                { accessor: 'email', label: 'Email', isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
            ],
        };
        wrapper = mount(<Table { ...props }/>);
        const searches = wrapper.find('Search');
        const columns = wrapper.find('Columns');
        const rows = wrapper.find('Rows');
        const paginations = wrapper.find('Pagination');

        expect(paginations.length).toBe(0);
        expect(rows.length).toBe(1);
        expect(columns.length).toBe(1);
        expect(searches.length).toBe(0);
    });

    it('should test all of the Search Actions', () => {
        instance.searchRows({ target: { value: 'Tim' }});
        expect(searchActions.searchRows).toHaveBeenCalled();

        instance.clearSearch();
        expect(searchActions.clearSearch).toHaveBeenCalled();
    });

    it('should test all of the Resize Table Actions', () => {
        instance.resizeTable();
        expect(resizeTableActions.resizeTable).toHaveBeenCalled();
    });

    it('should test all of the Table Actions', () => {
        instance.sortRows({ column: 'firstName' });
        expect(tableActions.sortColumn).toHaveBeenCalled();

        instance.nextPage();
        expect(tableActions.nextPage).toHaveBeenCalled();

        instance.previousPage();
        expect(tableActions.previousPage).toHaveBeenCalled();

        instance.expandRow({ rowIndex: 3 });
        expect(tableActions.expandRow).toHaveBeenCalled();
    });

    it('should test the goToPage Table Actions if a page number is given to it', () => {
        instance.goToPage({ newPage: '4' });
        expect(tableActions.goToPage).toHaveBeenCalledWith({ newPage: '4', shouldCall: true, state: instance.state });
    });

    it('should test the goToPage Table Actions if an input is received', () => {
        instance.goToPage({ target: { value: '44' } });
        expect(tableActions.goToPage).toHaveBeenCalledWith({ newPage: '44', shouldCall: false, state: instance.state });
    });

    it('should test the goToPage Table Actions if an input is received and the charCode is enter', () => {
        instance.goToPage({ charCode: 13, target: { value: '44' } });
        expect(tableActions.goToPage).toHaveBeenCalledWith({ newPage: '44', shouldCall: true, state: instance.state });
    });

    it('should test the goToPage Table Actions if an there is no input and the charCode is enter', () => {
        instance.goToPage({ charCode: 13, });
        expect(tableActions.goToPage).toHaveBeenCalledWith({ newPage: 1, shouldCall: true, state: instance.state });
    });

    it('should test that the mounting and unmounting of the component is called', () => {
        const willMount = jest.spyOn(Table.prototype, 'componentWillMount');
        const didMount = jest.spyOn(Table.prototype, 'componentDidMount');
        const willUnmount = jest.spyOn(Table.prototype, 'componentWillUnmount');

        wrapper = mount(<Table { ...props } />);
        instance = wrapper.instance();

        expect(willMount).toHaveBeenCalled();
        expect(didMount).toHaveBeenCalled();
        expect(willUnmount.mock.calls).toEqual([]);
        wrapper.unmount();
        expect(willMount).toHaveBeenCalled();
        expect(didMount).toHaveBeenCalled();
        expect(willUnmount).toHaveBeenCalled();
    });

    it('should test that when new params are passed they are set', () => {
        const willReceiveProps = jest.spyOn(Table.prototype, 'componentWillReceiveProps');
        props = { ...props, rowSize: 3, };

        wrapper = mount(<Table { ...props } />);
        instance = wrapper.instance();

        expect(wrapper.state().rows.length).toBe(3);
        expect(wrapper.state().pagination.totalPages).toBe(1);

        wrapper.setProps({ rows: [{}, {}, {}, {},] });

        expect(wrapper.state().rows.length).toBe(4);
        expect(wrapper.state().pagination.totalPages).toBe(2);
        expect(willReceiveProps).toHaveBeenCalled();
    });

    it('should test that when an empty array of rows is passed to the table that it updates the totalPages to 1', () => {
        props = { ...props, rowSize: 2, };

        wrapper = mount(<Table { ...props } />);
        instance = wrapper.instance();

        expect(wrapper.state().rows.length).toBe(3);
        expect(wrapper.state().pagination.totalPages).toBe(2);

        wrapper.setProps({ rows: [] });

        expect(wrapper.state().rows.length).toBe(0);
        expect(wrapper.state().pagination.totalPages).toBe(1);
    });

    it('should be able to handle a column with or without a sortable key', () => {
        props = {
            ...props,
            columns: [
                { sortable: true, accessor: 'firstName', label: 'First Name', minWidth: 100, priorityLevel: 3, position: 1, },
                { sortable: false, accessor: 'lastName', label: 'Last Name', minWidth: 50, priorityLevel: 1, position: 2, },
                { accessor: 'email', label: 'email', minWidth: 90, priorityLevel: 3, position: 3, },
            ],
        };
        wrapper = mount(<Table { ...props }/>);
        const [ firstName, lastName, email] = wrapper.state().columns;

        expect(firstName.sortable).toBe(true);
        expect(lastName.sortable).toBe(false);
        expect(email.sortable).toBe(true);
    });

    it('should allow to change columns after being mounted', () => {
        wrapper = mount(<Table {...props} />)
        
        expect(wrapper.state().columns.length).toBe(3)
        expect(wrapper.find('thead th')).toHaveLength(3)

        // all of a sudden, there is only 2 columns
        wrapper.setProps({ columns: props.columns.slice(1) })

        expect(wrapper.state().columns.length).toBe(2)
        expect(wrapper.find('thead th')).toHaveLength(2)
    });

    it('should be able to handle a sortable new column', () => {
        wrapper = mount(<Table {...props} />)

        expect(wrapper.state().columns.length).toBe(3)
        expect(wrapper.find('thead th')).toHaveLength(3)

        // all of a sudden, there is only 2 columns
        const newColumns = [
            ...props.columns, 
            { 
                accessor: 'newColumn', 
                label: 'New Column', 
                isVisible: true, 
                sortable: true,
                minWidth: 100, 
                priorityLevel: 3, 
                position: 1, 
            }
        ]
        wrapper.setProps({ columns: newColumns })

        expect(wrapper.state().columns.length).toBe(4)
        expect(wrapper.find('thead th')).toHaveLength(4)
    });

    it('should show search icon when the input field is empty', () => {
        instance.toggleSearchInputIcons();
        expect(wrapper.state().showSearchIcon).toBe(true);
        expect(wrapper.state().showClearIcon).toBe(false);
    });

    it('should show clear icon when the input field is not empty', () => {
        const searchValue = "paul";

        instance.toggleSearchInputIcons(searchValue);
        expect(wrapper.state().showSearchIcon).toBe(false);
        expect(wrapper.state().showClearIcon).toBe(true);
    });

    it('should test Resize Table Actions is called when isCollapsible flag changes', () => {
        wrapper = mount(<Table {...props} />)
        
        expect(wrapper.state().columns.length).toBe(3)
        expect(wrapper.find('thead th')).toHaveLength(3)

        // Now we set the isCollapsible flag to false
        wrapper.setProps({ isCollapsible: false })

        // Resize table is called
        expect(resizeTableActions.resizeTable).toHaveBeenCalled();

        // Table state should remain same
        expect(wrapper.state().columns.length).toBe(3)
        expect(wrapper.find('thead th')).toHaveLength(3)
    });

    describe('when server pagination is used', () => {
        let updateDataSpy, pagination = {}, sort = {};

        beforeEach(() => {
            updateDataSpy = jest.fn();
            props = {
                ...props,
                updateData: updateDataSpy,
            };
            wrapper = mount(<Table { ...props } />);
            instance = wrapper.instance();
        });

        describe('nextPage()', () => {
            it('should call updateData with correct page when currentPage < totalPages', () => {
                pagination = {
                    currentPage: 1,
                    totalPages: 2,
                    isServerPagination: true
                }
                sort = {
                    column: 'lastName',
                    direction: 'ascending'
                }
                wrapper.setState({ pagination });
                instance.nextPage();

                expect(updateDataSpy).toHaveBeenCalledTimes(1);
                expect(updateDataSpy).toHaveBeenCalledWith({ page: pagination.currentPage + 1, sort });
            });

            it('should not call updateData if currentPage >= totalPages', () => {
                pagination = {
                    totalPages: 2,
                    currentPage: 2,
                    isServerPagination: true
                }
                wrapper.setState({ pagination });
                instance.nextPage();

                expect(updateDataSpy).not.toHaveBeenCalled();
            });
        });

        describe('previousPage()', () => {
            it('should call updateData with correct page when currentPage > 1', () => {
                pagination = {
                    currentPage: 2,
                    totalPages: 4,
                    isServerPagination: true
                }
                sort = {
                    column: 'lastName',
                    direction: 'ascending'
                }
                wrapper.setState({ pagination });
                instance.previousPage();

                expect(updateDataSpy).toHaveBeenCalledTimes(1);
                expect(updateDataSpy).toHaveBeenCalledWith({ page: pagination.currentPage - 1, sort });
            });

            it('should not call updateData if currentPage <= 1', () => {
                pagination = {
                    totalPages: 1,
                    currentPage: 1,
                    isServerPagination: true
                }
                wrapper.setState({ pagination });
                instance.previousPage();

                expect(updateDataSpy).not.toHaveBeenCalled();
            });
        });
    });

    describe('displayedRows', () => {
        it('should equal row length when server pagination is used', () => {
            jest.spyOn(tableActions, 'calculateRows').mockReturnValue([]);
            props = {
                ...props,
                rows: [
                    { firstName: 'Paul', lastName: 'Darragh', isOpen: true }
                ],
                pagination: {
                    isServerPagination: true,
                },
            }
            wrapper = mount(<Table { ...props } />);
            instance = wrapper.instance();

            expect(wrapper.state().rows.length).toBe(props.rows.length);
        });

        it('should equal calculateRows result when sever pagination is not used', () => {
            const rows = [
                { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
                { firstName: 'Dave', lastName: 'Smith', isOpen: true },
            ];
            jest.spyOn(tableActions, 'calculateRows').mockReturnValue(rows);
            props = {
                ...props,
                rows,
                pagination: {
                    isServerPagination: false,
                },
            }
            wrapper = mount(<Table { ...props } />);
            instance = wrapper.instance();

            expect(wrapper.state().rows.length).toBe(rows.length);
        });
    });

    describe('when server side sorting is used', () => {
        let updateDataSpy, pagination = {}, sort = {};

        beforeEach(() => {
            updateDataSpy = jest.fn();
            props = {
                ...props,
                updateData: updateDataSpy
            };
            wrapper = mount(<Table {...props} />)
            instance = wrapper.instance();
        });

        describe('sortRows()', () => {
            it('should call updateData with the current sort column but the direction reversed', () => {
                pagination = {
                    currentPage: 1,
                    totalPages: 2,
                }
                sort = {
                    column: 'firstName',
                    direction: 'ascending'
                }
                wrapper.setState({ pagination, sort });
                instance.sortRows({ column: 'firstName' });

                expect(updateDataSpy).toHaveBeenCalledTimes(1);
                expect(updateDataSpy).toHaveBeenCalledWith({page: pagination.currentPage, sort: {...sort, direction: 'descending'}});
            });

            it('should call updateData with new sort column and the default ascending direction', () => {
                pagination = {
                    currentPage: 1,
                    totalPages: 2,
                }
                sort = {
                    column: 'firstName',
                    direction: 'ascending'
                }
                wrapper.setState({ pagination, sort });
                instance.sortRows({ column: 'lastName' });

                expect(updateDataSpy).toHaveBeenCalledTimes(1);
                expect(updateDataSpy).toHaveBeenCalledWith({page: pagination.currentPage, sort: {column: 'lastName', direction: 'ascending'}});
            });
        });
    });
});
