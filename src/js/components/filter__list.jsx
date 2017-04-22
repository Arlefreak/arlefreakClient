import PropTypes from 'prop-types';
import React from 'react';
import Row from './filter__row.jsx';

const FilterList = ({ items, onClick, className, active, allActive}) => (
    <ul className = { className }>
        {
            <Row 
                key={0}
                active={ allActive }
                name='All'
                onClick={
                    () => onClick(0, 'All')
                }
            />
        }
        {
            items.map((item, index) => {
                let id = item.id || item.tag_id;
                let name =  item.name || item.tag;
                let className = active[index] ? 'active' : '';

                return <Row
                    key={ id }
                    className={ className }
                    name={ name }
                    {...item}
                    onClick={
                        () => onClick(id, name)
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
        name: PropTypes.string,
        tag: PropTypes.string,
    }).isRequired).isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    active: PropTypes.arrayOf(PropTypes.bool).isRequired,
    allActive: PropTypes.bool.isRequired,
};

export default FilterList;
