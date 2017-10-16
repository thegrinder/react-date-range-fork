import React, { Component } from 'react';

export default class Section extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>{ this.props.title }</h2>
          <div>
            { this.props.children[0] }
          </div>
        </div>
        <div>
          { this.props.children[1] }
        </div>
      </div>
    )
  }
}
