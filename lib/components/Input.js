import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  constructor(props){
    super(props);
    this.state = {
      [this.props.name] : this.props.value ? this.props.value : ''
    };
    this.value = this.props.value;
    this.validateInput = this.validateInput.bind(this);
    this.saveToState = this.saveToState.bind(this);
    this.timeoutCheck = null
  }

  componentDidMount(){
    if (this.props.type !== 'submit') {  
      this.props.init(this.validateInput);
    }
  }

  validateInput (cb) {
    const input = this.state[this.props.name];
    const regex = new RegExp(this.props.regexToMatch, 'g');
    const revregex = new RegExp(this.props.regexNotToMatch, 'g');
    const name = this.props.name;
    if (this.state[this.props.name] === '' && this.props.required === false) {cb(true, null, name, input); return}
    if (!input.match(regex)) {
      cb(false, this.props.validationFailMessage, name, input);
    } else if (input.match(revregex)) {
      cb(false, this.props.validationFailMessage, name, input);
    } else if (input.length > this.props.max || input.length < this.props.min) {
      cb(false, this.props.validationFailMessage, name, input);
    } else {
      this.props.customValidation(input, (isValid)=>{
        //THIS WILL WAIT Untill u Validate against a server
        if (isValid) {
          cb(true, null, name, input);
        } else {
          cb(false, this.props.validationFailMessage, name, input);
        }
      });
    }
  }

  saveToState (e) {
    this.value = null;
    clearTimeout(this.timeoutCheck)
    const { name, value } = e.target;
    this.setState({ [name] : value });
    if (this.props.onChangeValidation) {
      this.timeoutCheck = setTimeout(()=>this.validateInput(this.props.onChangeValidation), this.props.onChangeValidationInterval)
    }
  }

  render(){
    return (
      <input
        style={this.props.style}
        className={this.props.className}
        name={this.props.name}
        onChange={(e)=>this.saveToState(e)}
        type={this.props.type}
        value={this.value ? this.value : this.state[this.props.name]}
      />
    );
  }
}

Input.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  onChangeValidationInterval: PropTypes.number,
  onChangeValidation: PropTypes.func,
  validationFailMessage: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  regexToMatch: PropTypes.string,
  regexNotToMatch: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
  customValidation: PropTypes.func
}

Input.defaultProps = {
  max: 10000,
  min: -10000,
  style: null,
  onChangeValidationInterval: 1000,
  validateOn: 'submit',
  onChangeValidation: null,
  validationFailMessage: 'Failed',
  name: 'fieldx' + Date.now().toString(),
  type: 'text',
  className: 'classic2',
  regexToMatch: ".*",
  regexNotToMatch: "(?!.*)",
  value: null,
  required: true,
  customValidation: (input, next) => next(true)
};
export default Input;
