import * as actions from '../../actions/FooterActions';

describe('Footer Actions', () => {
    it('should return an empty row', () => {
        const given = [
            {
                "accessor": "firstName",
                "label": "First Name",
                "priorityLevel": 1,
                "position": 1,
                "minWidth": 150,
                "isVisible": true,
                "sortable": true
            },
            {
                "accessor": "lastName",
                "label": "Last Name",
                "priorityLevel": 2,
                "position": 2,
                "minWidth": 150,
                "isVisible": true,
                "sortable": true
            },
            {
                "accessor": "age",
                "label": "Age",
                "priorityLevel": 3,
                "position": 3,
                "minWidth": 50,
                "isVisible": true,
                "sortable": true
            },
            {
                "accessor": "email",
                "label": "Email",
                "priorityLevel": 4,
                "position": 4,
                "minWidth": 250,
                "isVisible": true,
                "sortable": true
            },
            {
                "accessor": "address",
                "label": "Address",
                "priorityLevel": 4,
                "position": 5,
                "minWidth": 150,
                "isVisible": true,
                "sortable": true
            },
        ]
        const expected = {
            firstName: '',
            lastName: '',
            age: '',
            email: '',
            address: '',
            isOpen: false
        }

        expect(actions.getFooterRow(given)).toEqual(expected);
    });

    it('should return an row with some data', () => {
        const given = {
            state: {
                footerRow: { firstName: '', lastName: '', email: '', age: '', isOpen: false },
                totalFooter: { /* age: { totalValue: 39, values: [11, 12, 13] }  */},
                footerCallback: { age: ({ allPages }) => allPages.total }
            }
        }
        const expected = {
            firstName: "",
            lastName: "",
            age: [],
            email: "",
            isOpen: false,
        }
        expect(actions.setFooterRow(given)).toEqual(expected);
    });

    it('should return the field age with total value and values', () => {
        const given = [
            { firstName: 'Paul', lastName: 'Darragh', isOpen: true, age: 11 },
            { firstName: 'Matt', lastName: 'Smith', isOpen: true, age: 12 },
            { firstName: 'Michelle', lastName: 'Piper', isOpen: true, age: 13 }
        ]

        const expected = {
            age: {
                totalValue: 36,
                values: [
                    11,
                    12,
                    13
                ]
            }
        };
        expect(given.reduce((previousRow, currentRow, i) => actions.getTotalOfFooterColumns(previousRow, currentRow, i, ["age"]))).toEqual(expected);
    });
});
