import React, { Component } from 'react';
import {Form, Input, TextArea} from '../lib'

class App extends Component {

  submitValidationResult = (e, bool, data, reason) => {
    console.log('SUCCESS ? ', bool)
    console.log('DATA ',    data)
    console.log('REASON IT FAILED IF IT FAILED? ', reason)
  }

  inputChangedValidationResult = (bool, reason) => {
    console.log('onChange validation DID NOT FAIL ?  ', bool)
    console.log('REASON IT FAILED IF IT FAILED ', reason)
  }

  customValidation = (input, next, myArgument) => {
    //simulate a server check
    setTimeout(() => {
      console.log(input)
      console.log(myArgument)
      next(true)
    }, 3000);
  }

  render() {
    return (
      <div className="App">
        <Form onSubmit={this.submitValidationResult}>
          <TextArea
          required
            name= "lala"
            customValidation = {(input, next) => {this.customValidation(input, next, "lala")}}
            validationFailMessage={"Reason1"}
            onChangeValidation = {this.inputChangedValidationResult}
            regexToMatch = "\w+11"
          />
          <div>
            <Input
              required={false}
              validationFailMessage= {"Reason2"}
              name ="lala2"
              customValidation = {(input, next) => {this.customValidation(input, next, "lala2")}}
              onChangeValidation = {this.inputChangedValidationResult}
              regexToMatch = "^\w+22$"
            />
          </div>
          <Input type='submit' />
        </Form>
      </div>
    );
  }
}

export default App;
