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
                            this.props.nav.map((cat) => {
                                return (
                                    <li>
                                        <a href="#">{ cat.name }</a>
                                    </li>
                                    );
                            })
                        }
                    </ul>
                </nav>
                <ul>
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
                </article>
        );
    }
}

export default List;
