import Input from './Input';
import React from 'react';

export default class TextArea extends Input {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <textarea
        className={this.props.className}
        name={this.props.name}
        onChange={(e)=>this.saveToState(e)}
        type={this.props.type}
        value={this.value ? this.value : this.state[this.props.name]}
      />
    );
  }
}
