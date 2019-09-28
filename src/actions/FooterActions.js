/**
 * Returns only the structure to save it in the state
 * */
export const getFooterRow = columns => {
    const footerRow = {
        // Getting values from each column field
        ...columns.reduce((b, c, i) => {
            if (i === 1)
                b = { [b['accessor']]: '' }

            return Object.assign(b, { [c['accessor']]: '' })
        }),
        isOpen: false,
    }
    return footerRow
}

/**
* When the state has a change because the value of the table
* was changed, the footer row will be builded 
* with the new data in the table
*/
export const setFooterRow = ({ state, currentPage }) => {
    const { footerRow, totalFooter, footerCallback } = state

    // getting the footer fields
    const fieldsToSum = Object.keys(footerCallback)

    // If the footer fields are 0, then the footer will not appear in the table
    if (fieldsToSum.length === 0)
        return false

    // Creating the footer row 
    const fullFooterRow = {
        ...footerRow,
        // Getting total values for each field that contain a footerCallback function
        ...currentPage && currentPage.length > 0 ? currentPage.reduce((beforeRow, currentRow, i) => getTotalOfFooterColumns(beforeRow, currentRow, i, fieldsToSum)) : [],
    }

    // Setting each field of the footer with own callback function and passing the reults
    fieldsToSum.forEach(field => {
        fullFooterRow[field] = footerCallback[field]({
            currentPage: {
                total: fullFooterRow[field].totalValue,
                values: fullFooterRow[field].values,
            },
            allPages: {
                total: Object.keys(totalFooter).length !== 0 ? totalFooter[field].totalValue : [],
                values: Object.keys(totalFooter).length !== 0 ? totalFooter[field].values : [],
            }
        })
    })
    return fullFooterRow
}

// Getting the total result for each column
export const getTotalOfFooterColumns = (beforeRow, currentRow, i, fieldsToSum) => {
        let obj = {}
        fieldsToSum.forEach(field => {
            obj = {
                ...obj,
                [field]: {
                    totalValue: (parseFloat(i == 1 ? beforeRow[field] : beforeRow[field]['totalValue']) || 0) + (parseFloat(currentRow[field]) || 0),
                    values: (i === 1) ? [beforeRow[field], currentRow[field]] : [...beforeRow[field]['values'], currentRow[field]],
                }
            }
        })
        return obj
}
