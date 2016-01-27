import React from 'react';

class Row extends React.Component {

  render() {
    return(
      <li>
        <a href="">{this.props.name} - {this.props.category}</a>
      </li>
    )
  }
}

export default Row
