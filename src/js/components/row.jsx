import React from 'react';

class Row extends React.Component {

    render() {
        return(
            <li>
                <a href="/projects">{this.props.name}</a>
            </li>
        );
    }
}

export default Row;
