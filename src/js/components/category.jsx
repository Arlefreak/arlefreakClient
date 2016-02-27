import React, { PropTypes } from 'react'

const Category = ({ active, children, onClick }) => {
    if (active) {
        return <span>{children}</span>
    }

    return (
        <li key={index}>
            <a href="#"
                onClick={e => {
                    e.preventDefault()
                    onClick()
                }}
            >
                {children}
            </a>
        </li>
    )
}

Category.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Category
