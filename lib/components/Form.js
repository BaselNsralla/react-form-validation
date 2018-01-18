import React, { Component } from 'react';
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

  submit (e) {
    e.preventDefault();
    this.formData = {};
    let elemnet = document.getElementById(this.props.failMessageId);
    elemnet.innerHTML = '';
    let valid = true;
    let failMessage = '';
    this.validators.forEach((validator,i) => {
      validator((bool, message, name, input)=>{
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
          failMessage = message;
        }
        if (i === this.validators.length - 1) {
          if (valid) {
            //TODO:
            //if (this.props.action) {
            // middleware.makeRequest(this.props.url, this.formData ,()=>{
            //this.props.onSubmit(e)
            //})
            //}
            this.props.onSubmit(e,this.formData);
          } else {
            elemnet.innerHTML = failMessage;
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
      <form onSubmit={(e)=>this.submit(e)}>
        {this.state.childrenWithProps}
      </form>
    );
  }

}

Form.defaultProps = {
  className :'-1',
  onSubmit :(e) => {}
};


export default Form;
