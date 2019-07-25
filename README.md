# React-validation-tiny
React js simple form validation. This is a very light react frontend validation module which uses
`textarea`, `input` tags as the text containers. It can also handle **asynchronous** validations :twisted_rightwards_arrows:

[![npm](https://img.shields.io/npm/v/react-validation-tiny.svg?style=plastic)](https://www.npmjs.com/package/react-validation-tiny)


## Install

```
$ npm install react-validation-tiny -s
```

## Documentation:
This module is based on three components `<Form> Beautiful children here </Form>`, `<Input />` and `<TextArea />`  

* `<Form />` Has to be a parent of Input/TextArea, not necessary the first.
* `<Input />`
* `<TextArea />`

For styling, just use the *`style`* prop
___

### Props:

#### `<Form />`

- **`onSubmit`** is of type function and will run after all the `Input` validators are done, then it will send back some parameters to tell you about what happend.  
  	* `e` the submit event
  	* `success` is `true` if all the validations passed, otherwise `false`.
  	* `formData` all the data from all the Inputs and TextAreas.
  	* `failMessages`? `null` if success otherwise it will be an `object`  with arrays of fail. messages.
- **`className`** is the react `className` of the form, default is `'classic1'`
- **`children`** to be validated.


###### failMessages example:
```javascript
  {
  	target_field: ['Number should be of length 10', 'Potatos is not a number'],
  }
```


#### Props table

| Attributes            | Type          | Default     | Description |
| :---------            | :--:          | :-----      | :----------- |
| **`onSubmit`**              | `function`    | `void`      | The function to run after validating the inputs|
| **`className`**      			  | `string`      | `'classic1'`   	  | class name	|

___
  

#### `<Input />` and `<TextArea />`

* **`name`** a string which can be used as an index, or even a namespace for inputs with same categories. `name` is used to index the `faileMessage` of an input in the `failMessages` object.
	* All inputs with the same name will be in the same array.
* **`max`** the max number of characters constraint. 
* **`min`** the min number of characters constraint.
* **`validationFailMessage`** a string which you can use as an index or message `e.g` `"Phone number does not have charecters"` or whatever you want. It will basicly be one one of the `failMessages` in the `onSubmit`  `failMessages` parameter.
* **`regexToMatch`** the pattern the text must match to succeed.
* **`regexNotToMatch`** the pattern that the text must never match.
* **`customValidation`** A *COOL* function which you can add to check the input in your own way, it will have two parameters:  
  	* `Input` value.
  	* `next` which is a callback that you should run when your custom validation is done and send it a parameter of `true` if success otherwise `false`. 
* **`required`** default `true`
* **`type`** is the type of the input.
* **`value`** the initial value, if you want that.
* **`onChangeValidation`** a callback that will run every time you make a change in the input field, the interval is defaulted to 1 second, it is restarted for every input.
  	* `sucess`, `true` if validation succeeded
  	* `failmessage`? `null` if succeeded
  	* `name`, the name of the input
  	* `value`, the value of the input
* **`onChangeValidationInterval`** the interval for `onChangeValidation`, defaults to 1 second.


#### Props table

| Attributes            			| Type          | Default     | Description |
| :---------            			| :--:          | :-----:     | :----------- |
| **`name`**                  | `string`      | `'fieldx'+Date.now()`      | name of the field |
| **`style`**                 | `style`       | `null`      | Button container custom styles   |
| **`max`**            				| `number`      | `1000`      | Maximum length								   |
| **`min`**                		| `number`      | `-1000`     | Minimum length								   |
| **`regexToMatch`**          | `string`      | `'.*'`      | Pattern should be matched 			 |
| **`regexNotToMatch`**       | `string`      | `'?!.*'`      | Pattern should not have a match  |
| **`customValidation`**      | `function`    | `void`      | Custom async validation 				 |
| **`required`**              | `bool`        | `true`      | required HTML5									 |
| **`type`**      						| `string`      | `'text'`  		| Input type in HTML5  				  	 |
| **`value`**     						| `string`      | `''`   			| Initial value										 |
| **`onChangeValidation`**    | `function`    | `null`      | every change validation callback |
| **`onChangeValidationInterval`** | `number` | `1000`      | The interval for `onChangeValidation` |
| **`className`**                  | `string` | `'classic2'`    | The class name             |
| **`validationFailMessage`** | `string` | `'Failed'` | The message which tells you what failes | 
