import React from 'react';
import Row from './row.jsx';


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }

  render() {
    return (
        <ul>
          {
            this.props.list.map((single) => {
              return <Row
                key={ single.id }
                name={ single.name }
                category={ single.category }
              />
              })
          }
        </ul>
    )
  }
}

export default List
