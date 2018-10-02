//React
import React from 'react';

const CustomSearch = ({ searchString, searchRows, clearSearch }) => {
    return (
        <div className="react-collapsible-search">
            <h2>Custom search</h2>
            <input onChange={ searchRows } value={ searchString } placeholder="search"/>
            <button className="react-collapsible-clear" onClick={ clearSearch }>&#9587;</button>
        </div>
    );
};

export default CustomSearch
