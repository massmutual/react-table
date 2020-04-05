import React from 'react';
import faker from 'faker';
import moment from 'moment';
import Button from './button';
import Link from './link';
import TextInputPagination from './TextInputPagination';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export const generateFakeData = ({ totalRows }) => {
    let data = [];
    for(let i = 0; i < totalRows; i++) {
        data.push(
            {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                address: faker.address.streetAddress(),
                date: moment(faker.date.past()).format('MM/DD/YYYY'),
                city: faker.address.city(),
                state: faker.address.state(),
                country: faker.address.country(),
                zipCode: faker.address.zipCode(),
                bio: faker.lorem.sentence(),
            }
        )
    }

    return data
};

const onClickPressed = ({ rowIndex, cellIndex }) => {
    console.log(`hi there from row ${rowIndex + 1} and cell ${cellIndex + 1}`);
};

const linkUrl = () => {
    return 'https://www.google.com/';
};

export const getColumns = () => {
    return [
        { accessor: 'firstName', label: 'First Name', priorityLevel: 1, position: 1, minWidth: 150, },
        { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, position: 2, minWidth: 150, },
        { accessor: 'email', label: 'Email', priorityLevel: 3, position: 3, minWidth: 250, },
        { accessor: 'address', label: 'Address', priorityLevel: 4, position: 4, minWidth: 150, },
        { accessor: 'date', label: 'Date', priorityLevel: 3, position: 6, minWidth: 150, sortType: 'date', },
        { accessor: 'city', label: 'City', priorityLevel: 9, position: 5, minWidth: 120, },
        { accessor: 'state', label: 'State', priorityLevel: 6, position: 6, minWidth: 100, },
        { accessor: 'country', label: 'Country', priorityLevel: 8, position: 7, minWidth: 120, },
        { accessor: 'zipCode', label: 'Zip Code', priorityLevel: 7, position: 8, minWidth: 50, },
        { accessor: 'bio', label: 'Bio', priorityLevel: 5, position: 9, minWidth: 300, },
    ]
};

export const getColumnsCustomComponents = () => {
    return [
        { accessor: 'firstName', label: 'First Name', priorityLevel: 1, position: 1, minWidth: 150, },
        { accessor: 'lastName', label: 'Last Name', priorityLevel: 7, position: 2, minWidth: 150, },
        { accessor: 'email', label: 'Email', priorityLevel: 3, position: 3, minWidth: 250, CustomComponent: Button, },
        { accessor: 'address', label: 'Address', priorityLevel: 4, position: 4, minWidth: 150, },
        { accessor: 'city', label: 'City', priorityLevel: 9, position: 5, minWidth: 120, },
        { accessor: 'state', label: 'State', priorityLevel: 6, position: 6, minWidth: 100, },
        { accessor: 'country', label: 'Country', priorityLevel: 8, position: 7, minWidth: 120, },
        { accessor: 'zipCode', label: 'Zip Code', priorityLevel: 2, position: 8, minWidth: 50, CustomComponent: Link, },
        { accessor: 'bio', label: 'Bio', priorityLevel: 5, position: 9, minWidth: 300, },
    ]
};

export const sortableCoulmns = () => {
    return [
        { accessor: 'firstName', label: 'First Name', priorityLevel: 1, position: 1, minWidth: 150, sortable: true },
        { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, position: 2, minWidth: 150, sortable: true },
        { accessor: 'email', label: 'Email', priorityLevel: 3, position: 3, minWidth: 250, },
        { accessor: 'address', label: 'Address', priorityLevel: 4, position: 4, minWidth: 150, },
        { accessor: 'date', label: 'Date', priorityLevel: 3, position: 6, minWidth: 150, sortType: 'date', },
        { accessor: 'city', label: 'City', priorityLevel: 9, position: 5, minWidth: 120, sortable: false },
        { accessor: 'state', label: 'State', priorityLevel: 6, position: 6, minWidth: 100, sortable: false },
        { accessor: 'country', label: 'Country', priorityLevel: 8, position: 7, minWidth: 120, },
        { accessor: 'zipCode', label: 'Zip Code', priorityLevel: 7, position: 8, minWidth: 50, sortable: true },
        { accessor: 'bio', label: 'Bio', priorityLevel: 5, position: 9, minWidth: 300, sortable: false },
    ]
};

export const basicTableProps = {
    columns: getColumns(),
    rows: generateFakeData({ totalRows: 1000 }),
};

export const basicTablePropsPaginationAndSearchShow = {
    columns: getColumns(),
    rows: generateFakeData({ totalRows: 1000 }),
    showPagination: true,
    showSearch: true,
};

export const sortColumnAndDirectionProps = {
    columns: getColumns(),
    rows: generateFakeData({ totalRows: 1000 }),
    column: 'lastName',
    direction: 'descending',
};

export const rowSizeProps = {
    columns: getColumns(),
    rows: generateFakeData({ totalRows: 1000 }),
    rowSize: 25,
};

export const customComponentProps = {
    columns: getColumnsCustomComponents(),
    rows: generateFakeData({ totalRows: 1000 }),
    callbacks: { email: onClickPressed, zipCode: linkUrl }
};

export const paginationListenerProps = {
    columns: getColumns(),
    rowSize: 5,
    showPagination: true,
    rows: generateFakeData({ totalRows: 20 }),
    paginationEventListener: ({ pagination }) => console.log(`I am on page ${ pagination.currentPage } of ${ pagination.totalPages }`)
};

export const sortableColumnsProps = {
    columns: sortableCoulmns(),
    rows: generateFakeData({ totalRows: 1000 }),
};

export const customPaginationComponent = {
    columns: getColumns(),
    rows: generateFakeData({ totalRows: 1000 }),
    showPagination: true,
    showSearch: true,
    CustomPagination: TextInputPagination,
};

export const customIconProps = {
    id: 'customIdForTheTable',
    columns: getColumns(),
    rows: generateFakeData({ totalRows: 1000 }),
    icons: {
        ascending: <svg width="10" height="10"><circle cx="5" cy="5" r="4" stroke="blue" strokeWidth="1" fill="red" /></svg>,
        descending: <svg width="10" height="10"><circle cx="5" cy="5" r="4" stroke="red" strokeWidth="1" fill="blue" /></svg>,
        openRow: FaArrowDown,
        closeRow: FaArrowUp,
    }
};

export const differentTheme = {
    columns: getColumns(),
    rows: generateFakeData({ totalRows: 1000 }),
    theme: 'notTheDefault'
};

export const unsorted = {
    columns: getColumns().map(column => {
        column.sortable = false;
        return column;
    }),
    rows: generateFakeData({ totalRows: 1000 })
};

export const expandAllColumnsProps = {
    columns: getColumns(),
    rows: generateFakeData({ totalRows: 1000 }),
    isCollapsible: false,
};