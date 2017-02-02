import React, { PropTypes } from 'react';
import Row from './filter__row.jsx';

const FilterList = ({ items, onClick, className}) => (
    <ul className = { className }>
        {
            items.map((item ) => {
                let id = item.id || item.tag_id;
                return <Row
                    key={ id }
                    {...item}
                    onClick={
                        () => onClick(item.id, item.name)
                    }
                />;
            })
        }
    </ul>
);

FilterList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        tag_id: PropTypes.number,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default FilterList;
