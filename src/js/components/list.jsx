import React from 'react';
import Row from './row.jsx';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: props.initialCount};
    }

    render() {
        return (
            <article className="projects">
                <h2>Projects</h2>
                <nav>
                    <ul>
                        {
                            <li><a href="#">All</a></li>
                            }
                            {
                                this.props.nav.map((cat, index) => {
                                    return (
                                        <li key={index}>
                                            <a href="#">{ cat.name }</a>
                                        </li>
                                        );
                                })
                            }
                        </ul>
                    </nav>
                    <ul className="vertical-list">
                        {
                            this.props.list.map((single) => {
                                return (
                                    <Row
                                        key={ single.id }
                                        id={ single.id }
                                        name={ single.name }
                                    />
                                    );})
                        }
                    </ul>
                    <img className="index" src="img/p.svg" alt="Icono"/>
                </article>
        );
    }
}

export default List;
