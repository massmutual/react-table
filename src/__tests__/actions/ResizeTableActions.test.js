import * as actions from '../../actions/ResizeTableActions';

describe('Resize Table Actions', () => {
  //RESIZE TABLE
  it('should try to add a column', () => {
      const given = {
        width: 151,
        state: {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: true, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
        }
      };
      const expected = {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: true, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
      };

      expect(actions.resizeTable(given)).toEqual(expected);
  });

  it('should try to remove a column', () => {
      const given = {
        width: 149,
        state: {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: true, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
        }
      };
      const expected = {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: false, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
      };

      expect(actions.resizeTable(given)).toEqual(expected);
  });
  //TRY TO REMOVE COLUMN
  it('should remove a column based on what is still visible and priorityLevel', () => {
      const given = {
        visibleColumnsWidth: 150,
        width: 100,
        state: {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: true, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
        }
      };
      const expected = {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: false, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
      };

      expect(actions.tryToRemoveColumns(given)).toEqual(expected);
  });

  it('should remove all of the columns based on what is still visible and priorityLevel', () => {
      const given = {
        visibleColumnsWidth: 240,
        width: 90,
        state: {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: true, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: true, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
        }
      };
      const expected = {
          columns: [
            { isVisible: false, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: false, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
      };

      expect(actions.tryToRemoveColumns(given)).toEqual(expected);
  });

  it('should remove no columns based on what is still visible and priorityLevel', () => {
      const given = {
        visibleColumnsWidth: 240,
        width: 240,
        state: {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: true, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: true, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
        }
      };
      const expected = {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: true, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: true, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
      };

      expect(actions.tryToRemoveColumns(given)).toEqual(expected);
  });

  it('should remove no columns because there are no visible columns', () => {
      const given = {
        visibleColumnsWidth: 0,
        width: 90,
        state: {
          columns: [
            { isVisible: false, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: false, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
        }
      };
      const expected = {
          columns: [
            { isVisible: false, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: false, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
      };

      expect(actions.tryToRemoveColumns(given)).toEqual(expected);
  });
  //TRY TO ADD COLUMN
  it('should change one column to be visible based on the priorityLevel', () => {
      const given = {
        visibleColumnsWidth: 100,
        width: 200,
        state: {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: false, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
        }
      };
      const expected = {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: true, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
      };

      expect(actions.tryToAddColumns(given)).toEqual(expected);
  });

  it('should change one column to be visible based on the priorityLevel at the exact width that the column can first be added', () => {
      const given = {
        visibleColumnsWidth: 100,
        width: 150,
        state: {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: false, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
        }
      };
      const expected = {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: true, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
      };

      expect(actions.tryToAddColumns(given)).toEqual(expected);
  });

  it('should not change any columns visibility due to the possible columns width being greater than screen width', () => {
      const given = {
        visibleColumnsWidth: 100,
        width: 149,
        state: {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: false, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
        }
      };
      const expected = {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: false, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
      };

      expect(actions.tryToAddColumns(given)).toEqual(expected);
  });

  it('should not change any columns visibility due to the priorityLevel factoring in which column width to check', () => {
      const given = {
        visibleColumnsWidth: 100,
        width: 149,
        state: {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: false, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 40, priorityLevel: 3, position: 3, },
          ],
        }
      };
      const expected = {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: false, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 40, priorityLevel: 3, position: 3, },
          ],
      };

      expect(actions.tryToAddColumns(given)).toEqual(expected);
  });

  it('should make every row visible', () => {
      const given = {
        visibleColumnsWidth: 100,
        width: 190,
        state: {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: false, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 40, priorityLevel: 3, position: 3, },
          ],
          rows: [
            { isOpen: false, firstName: 'Paul', },
            { isOpen: true, firstName: 'Matt', },
            { isOpen: false, firstName: 'Michelle', },
          ],
        }
      };
      const expected = {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: true, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: true, minWidth: 40, priorityLevel: 3, position: 3, },
          ],
          rows: [
            { isOpen: false, firstName: 'Paul', },
            { isOpen: false, firstName: 'Matt', },
            { isOpen: false, firstName: 'Michelle', },
          ],
      };

      expect(actions.tryToAddColumns(given)).toEqual(expected);
  });
  //CLOSE ALL ROWS
    it('should close every row', () => {
        const given = {
          state: {
            rows: [
              { isOpen: false, firstName: 'Paul', },
              { isOpen: true, firstName: 'Matt', },
              { isOpen: false, firstName: 'Michelle', },
            ],
          }
        };
        const expected = {
          rows: [
            { isOpen: false, firstName: 'Paul', },
            { isOpen: false, firstName: 'Matt', },
            { isOpen: false, firstName: 'Michelle', },
          ],
        };

        expect(actions.closeAllRows(given)).toEqual(expected);
    });
    //REMOVE COLUMN
    it('should change the visibility of the least important row so that the row will no longer be visible', () => {
        const given = {
          state: {
            columns: [
              { isVisible: true, priorityLevel: 1, position: 1 },
              { isVisible: true, priorityLevel: 2, position: 2 },
              { isVisible: true, priorityLevel: 3, position: 3 },
            ],
          }
        };
        const expected = {
          columns: [
            { isVisible: true, priorityLevel: 1, position: 1 },
            { isVisible: true, priorityLevel: 2, position: 2 },
            { isVisible: false, priorityLevel: 3, position: 3 },
          ],
        };

        expect(actions.removeColumn(given)).toEqual(expected);
    });

    it('should change the visibility of the least important visible row so that the row will no longer be visible', () => {
        const given = {
          state: {
            columns: [
              { isVisible: true, priorityLevel: 1, position: 1 },
              { isVisible: true, priorityLevel: 2, position: 2 },
              { isVisible: false, priorityLevel: 3, position: 3 },
            ],
          }
        };
        const expected = {
          columns: [
            { isVisible: true, priorityLevel: 1, position: 1 },
            { isVisible: false, priorityLevel: 2, position: 2 },
            { isVisible: false, priorityLevel: 3, position: 3 },
          ],
        };

        expect(actions.removeColumn(given)).toEqual(expected);
    });

    it('should not change anything because there are no rows to remove', () => {
        const given = {
          state: {
            columns: [
              { isVisible: false, priorityLevel: 1, position: 1 },
              { isVisible: false, priorityLevel: 2, position: 2 },
              { isVisible: false, priorityLevel: 3, position: 3 },
            ],
          }
        };
        const expected = {
          columns: [
            { isVisible: false, priorityLevel: 1, position: 1 },
            { isVisible: false, priorityLevel: 2, position: 2 },
            { isVisible: false, priorityLevel: 3, position: 3 },
          ],
        };

        expect(actions.removeColumn(given)).toEqual(expected);
    });

    //ADD COLUMN
    it('should change the visibility of the least important row so that the row will now be visible', () => {
        const given = {
          state: {
            columns: [
              { isVisible: true, priorityLevel: 1, position: 1 },
              { isVisible: true, priorityLevel: 2, position: 2 },
              { isVisible: false, priorityLevel: 3, position: 3 },
            ],
          }
        };
        const expected = {
          columns: [
            { isVisible: true, priorityLevel: 1, position: 1 },
            { isVisible: true, priorityLevel: 2, position: 2 },
            { isVisible: true, priorityLevel: 3, position: 3 },
          ],
        };

        expect(actions.addColumn(given)).toEqual(expected);
    });

    it('should change the visibility of the least important hidden row so that the row will now be visible', () => {
        const given = {
          state: {
            columns: [
              { isVisible: true, priorityLevel: 1, position: 1 },
              { isVisible: false, priorityLevel: 2, position: 2 },
              { isVisible: false, priorityLevel: 3, position: 3 },
            ],
          }
        };
        const expected = {
          columns: [
            { isVisible: true, priorityLevel: 1, position: 1 },
            { isVisible: true, priorityLevel: 2, position: 2 },
            { isVisible: false, priorityLevel: 3, position: 3 },
          ],
        };

        expect(actions.addColumn(given)).toEqual(expected);
    });

    it('should not change anything because there are no rows to add', () => {
        const given = {
          state: {
            columns: [
              { isVisible: true, priorityLevel: 1, position: 1 },
              { isVisible: true, priorityLevel: 2, position: 2 },
              { isVisible: true, priorityLevel: 3, position: 3 },
            ],
          }
        };
        const expected = {
          columns: [
            { isVisible: true, priorityLevel: 1, position: 1 },
            { isVisible: true, priorityLevel: 2, position: 2 },
            { isVisible: true, priorityLevel: 3, position: 3 },
          ],
        };

        expect(actions.addColumn(given)).toEqual(expected);
    });

    it('should add all hidden columns if isCollapsible is false', () => {
      const given = {
        isCollapsible: false,
        width: 149,
        state: {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: false, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
          rows: [
            { isOpen: false, firstName: 'Paul', },
            { isOpen: true, firstName: 'Matt', },
            { isOpen: false, firstName: 'Michelle', },
          ],
        }
      };
      const expected = {
          columns: [
            { isVisible: true, minWidth: 100, priorityLevel: 1, position: 1, },
            { isVisible: true, minWidth: 50, priorityLevel: 2, position: 2, },
            { isVisible: true, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
          rows: [
            { isOpen: false, firstName: 'Paul', },
            { isOpen: false, firstName: 'Matt', },
            { isOpen: false, firstName: 'Michelle', },
          ]
      };
  
      expect(actions.resizeTable(given)).toEqual(expected);
    });  
});
