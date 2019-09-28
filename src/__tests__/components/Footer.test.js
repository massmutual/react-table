//React
import React from 'react';
//Component
import Footer from '../../components/Footer';
//Testing
import { mount, shallow, } from 'enzyme';

describe('Footer', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            icons: null,
            footerRow: {
                firstName: "",
                lastName: "",
                age: 36,
                email: "",
                isOpen: true,
            },
            visibleColumns: [
                {
                    accessor: 'email',
                    label: 'Email',
                    isVisible: true,
                    minWidth: 90,
                    priorityLevel: 3,
                    position: 3,
                    sortable: true
                },
                {
                    accessor: 'age',
                    label: 'Age',
                    isVisible: true,
                    minWidth: 50,
                    priorityLevel: 3,
                    position: 4,
                    sortable: true
                },
                {
                    accessor: 'newColumn',
                    label: 'New Column',
                    isVisible: true,
                    sortable: true,
                    minWidth: 100,
                    priorityLevel: 3,
                    position: 1
                }
            ],
            hiddenColumns: [
                {
                    accessor: 'firstName',
                    label: 'First Name',
                    isVisible: true,
                    minWidth: 100,
                    priorityLevel: 3,
                    position: 1,
                    sortable: true
                },
                {
                    accessor: 'lastName',
                    label: 'Last Name',
                    isVisible: true,
                    minWidth: 50,
                    priorityLevel: 1,
                    position: 2,
                    sortable: true
                },
            ],
            expandRow: jest.fn()
        };

        wrapper = shallow(<Footer {...props} />);
    });

    it('should have 1 rows', () => {
        const rows = wrapper.find('Row');
        console.log('rows.length :', rows.length);
        expect(rows.length).toBe(1);
    });

    it('should have 1 tfoot', () => {
        const ths = wrapper.find('tfoot');

        expect(ths.length).toBe(1);
    });

    it('should have 1 hidden elements in the row', () => {
        props = {
            icons: null,
            footerRow: {
                firstName: "",
                lastName: "",
                age: 36,
                email: "",
                isOpen: true,
            },
            visibleColumns: [
                {
                    accessor: 'firstName',
                    label: 'First Name',
                    isVisible: true,
                    minWidth: 100,
                    priorityLevel: 3,
                    position: 1,
                    sortable: true
                },
                {
                    accessor: 'email',
                    label: 'Email',
                    isVisible: true,
                    minWidth: 90,
                    priorityLevel: 3,
                    position: 3,
                    sortable: true
                },
                {
                    accessor: 'age',
                    label: 'Age',
                    isVisible: true,
                    minWidth: 50,
                    priorityLevel: 3,
                    position: 4,
                    sortable: true
                },
                {
                    accessor: 'newColumn',
                    label: 'New Column',
                    isVisible: true,
                    sortable: true,
                    minWidth: 100,
                    priorityLevel: 3,
                    position: 1
                },
             
            ],
            hiddenColumns: [   {
                accessor: 'lastName',
                label: 'Last Name',
                isVisible: true,
                minWidth: 50,
                priorityLevel: 1,
                position: 2,
                sortable: true
            },],
            expandRow: jest.fn()
        };

        wrapper = mount(<Footer {...props} />);
        const rows = wrapper.find('Row');
        const expandedRows = wrapper.find('ExpandedRow');

        expect(expandedRows.length).toBe(0);
        expect(rows.length).toBe(1);

    });
});
