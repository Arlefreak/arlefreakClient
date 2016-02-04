import React from 'react';
import { Link } from 'react-router';

class Row extends React.Component {

    render() {
        return(
            <li>
                <Link to={'/projects/' + this.props.id }>{this.props.name}</Link>
            </li>
        );
    }
}

export default Row;
