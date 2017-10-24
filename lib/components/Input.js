import React, { Component } from 'react';

class Input extends Component {
  constructor(props){
    super(props);
    this.state = {
      [this.props.name] : this.props.value ? this.props.value : ''
    };
    this.value = this.props.value;
    this.validateInput = this.validateInput.bind(this);
    this.saveToState = this.saveToState.bind(this);
  }

  componentDidMount(){
    if (this.props.type !== 'submit') {
      if (this.state[this.props.name] !== '' && this.props.required === true) {
        this.props.init(this.validateInput);
      }
    }
  }

  validateInput (cb) {
    const input = this.state[this.props.name];
    const regex = new RegExp(this.props.regexToMatch, 'g');
    const revregex = new RegExp(this.props.regexNotToMatch, 'g');
    const name = this.props.name;
    if (!input.match(regex)) {
      cb(false, this.props.validationFailMessage);
    } else if (input.match(revregex)) {
      cb(false, this.props.validationFailMessage);
    } else if (input.length > this.props.max || input.length < this.props.min) {
      cb(false, this.props.validationFailMessage);
    } else {
      this.props.customValidation(input, (isValid)=>{
        //THIS WILL WAIT Untill u Validate against a server
        if (isValid) {
          cb(true, null, name, input);
        } else {
          cb(false, this.props.validationFailMessage);
        }
      });
    }
  }

  saveToState (e) {
    this.value = null;
    const { name, value } = e.target;
    this.setState({ [name] : value });
  }

  render(){
    return (
      <input
        className={this.props.className}
        name={this.props.name}
        onChange={(e)=>this.saveToState(e)}
        type={this.props.type}
        value={this.value ? this.value : this.state[this.props.name]}
      />
    );
  }
}

Input.defaultProps = {
  max : 10000,
  min: -10000,
  validateOn : 'submit',
  validateAfter : 0,
  validationFailMessage: 'Add you validation message',
  name : 'fieldx' + Date.now().toString(),
  type : 'text',
  className: Date.now().toString(),
  regexToMatch : ".*",
  regexNotToMatch : "(?!.*)",
  value : null,
  required: false,
  customValidation : (input, next)=> next(true)
};
export default Input;
