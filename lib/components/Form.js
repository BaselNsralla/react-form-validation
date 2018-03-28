import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from './config';

class Form extends Component {
  constructor(props){
    super(props);
    this.validators = [];
    this.state = { childrenWithProps : [] };
    this.formData = {};
    this.submit = this.submit.bind(this);
    this._setUpValidators = this._setUpValidators.bind(this);
    this._addPropsToChildren = this._addPropsToChildren.bind(this);
  }

  componentDidMount () {
    this._setUpValidators(this.props.children);
  }

  _prepareFailElement (id) {
    let element;
    if (!id) {
      element = document.createElement('div');
      element.innerHTML = '';
      return element;
    }
    element = document.getElementById(this.props.failMessageId);
    element.innerHTML = '';
    return element;
  }

  submit (e) {
    e.preventDefault();
    this.formData = {};
    let element = this._prepareFailElement(this.props.failMessageId);
    let valid = true;
    let failMessages = {};
    this.validators.forEach((validator, i) => {
      validator((bool, message, name, input) => {
        if (this.formData[name]) {
          //if its not alraedy an array, make it to an array
          if (!Array.isArray(this.formData[name])) {
            let tmp = this.formData[name];
            this.formData[name] = [tmp];
          }
          this.formData[name].push(input);
        } else {
          this.formData[name] = input;
        }
        if (!bool) {
          valid = false;
          if(failMessages[name]) {failMessages[name].push(message)} else {failMessages[name] = [message]}
        }
        if (i === this.validators.length - 1) {
          if (valid) {
            //TODO:  if (this.props.action) { middleware.makeRequest(this.props.url, this.formData ,()=> this.props.onSubmit(e)}) }
            this.props.onSubmit(e, true, this.formData, null);
          } else {
            //element.innerHTML = failMessage;
            this.props.onSubmit(e, false, this.formData, failMessages);
          }
        }
      });
    });
  }

  _setUpValidators (incommingChildren) {
    let childrenWithProps = this._addPropsToChildren(incommingChildren, -1);
    this.setState({
      childrenWithProps : childrenWithProps
    });
  }

  _addPropsToChildren (incommingChildren, key) {
    if (!Array.isArray(incommingChildren)) {
      if (!config.formElements.includes(incommingChildren.type.name)){// !== 'Input'){
        return React.cloneElement(incommingChildren, {
          children : this._addPropsToChildren(incommingChildren.props.children, key)
        });
      }
      return React.cloneElement(incommingChildren, {
        init : (validateFunction) => {
          this.validators.push(validateFunction);
        },
        key: key
      });
    }
    return incommingChildren.map((child,i) => {
      if (config.formElements.includes(child.type.name)){// === 'Input'){
        return React.cloneElement(child, {
          init : (validateFunction) => {
            this.validators.push(validateFunction);
          },
          key : i
        });
      } else {
        if (child.props.children) {
          return React.cloneElement(child, {
            children: this._addPropsToChildren(child.props.children, i),
            key: i
          });
        }
        return child;
      }
    });
  }

  render(){
    return (
      <form style={this.props.style} onSubmit={(e)=>this.submit(e)}>
        {this.state.childrenWithProps}
      </form>
    );
  }

}

Form.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func
}


Form.defaultProps = {
  className :'classic1',
  style: null,
  onSubmit :(e) => {}
};


export default Form;
