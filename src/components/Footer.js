import React from 'react';
import { FooterPropType } from '../utils/propTypes';

import Row from './Row';

const Footer = ({ icons, footerRow, visibleColumns, hiddenColumns, expandRow }) => {

	/**
	 * If the footer row is open we need to disappear all the fields that do not 
	 * have information */
	if (footerRow['isOpen']) {
		for (const [key, value] of Object.entries(footerRow)) {
			if (value === '') {
				delete footerRow[key]
				hiddenColumns.forEach((field, i, arr) => {
					if (field['accessor'] === key)
						arr.splice(i, 1)
				})
			}
		}
	}

	return (
		<tfoot>
			<Row
				key={`${-1}-1`}
				rowIndex={-1}
				row={footerRow}
				icons={icons}
				visibleColumns={visibleColumns}
				hiddenColumns={hiddenColumns}
				callbacks={{}}
				expandRow={expandRow}
			/>
		</tfoot>
	);
};

Footer.propTypes = FooterPropType;

export default Footer;