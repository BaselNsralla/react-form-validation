# React-validation-tiny :passport_control:
React js simple form validation. This is a very light react frontend validation module which uses
`textarea`, `input` tags as the text containers. With ability to handle asynchronous validations. Feel free to push more :)


## Documentation:
This module is base on three components `<Form> Beautiful children here </Form>`, `<Input />` and `<TextArea />`  

* `<Form />` Has to be a parent of Input, not necessary the first.
* `<Input />`
* `<TextArea />`

___

### Props

#### `<Form />`

- [x]  `onSubmit` is type function and will run after all the `Input` validators are done sending back some parameters to tell you about what happend.  
  	* `e` the submit event
  	* `success` is `true` if all the validations passed, otherwise `false`.
  	* `formData` all the data from all the Inputs and TextAreas.
  	* `failMessages`? `null` if success otherwise it will be an `object`  with arrays of fail. messages.
- [x]  `className` is the react `className` of the form, default is `'-1'`
- [x]  `children` to be validated.


###### failMessages example:
```javascript
	{
		numberoflife: ['Number should be of length 10', 'Potatos is not a number'],
	}
```


##### Props table

| Attributes            | Type          | Default     | Description |
| :---------            | :--:          | :-----      | :----------- |
| onSubmit              | `function`    | `void`      | The function to run after validating the inputs|
| className      			  | `string`      | `'-1'`   	  | class name	|

___
  

#### `<Input />` and `<TextArea />`

* `name` a string which can be used as an index, or even a namespace for inputs with same categories. `name` is used to index the `faileMessage` of an input in the `failMessages` object.
	* All inputs with the same name will be in the same array.
* `max` the max number of charecters constraint. 
* `min` the min number of charecters constraint.
* `validationFailMessage` a string which you can use as an index or message `e.g` `"Phone number does not have charecters"` or whatever you want. It will basicly be one one of the `failMessages` in the `onSubmit`  `failMessages` parameter.
* `regexToMatch` the pattern the text must match to succeed.
* `regexNotToMatch` the pattern that the text must never match.
* `customValidation` A COOL function which you can add to check the input in your own way, it will have two parameters:  
  	* `Input` value.
  	* `next` which is a callback that you should run when your validation is done and send it a parameter of `true` if success and `false` if not, 
* `required` default `true`
* `type` is the type of the input.
* `value` the initial value, if you want that.
* `validationFailMessage` the failing message. This will be sent in `failMessages` with the associativ `name` as the key.
* `onChangeValidation` callback function that will run every time you make a change in the input field, the interval is defaulted to 2 seconds, it is restarted for every input.
  	* `sucess`, `true` if validation succeeded
  	* `failmessage`? `null` if succeeded
  	* `name`, the name of the input
  	* `value`, the value of the input
* `onChangeValidationInterval` the interval for `onChangeValidation`, default to 2 seconds


##### Props table

| Attributes            | Type          | Default     | Description |
| :---------            | :--:          | :-----      | :----------- |
| name                  | `string`      | `'fieldx' + Date.now().toString()`      | name of the field |
| style                 | `Style`       | `null`      | Button container custom styles   |
| max            				| `number`      | `1000`      | Maximum length								   |
| min                		| `number`      | `-1000`     | Minimum length								   |
| regexToMatch          | `string`      | `'.*'`      | Pattern should be matched 			 |
| regexNotToMatch       | `string`      | `?!.*`      | Pattern should not have a match  |
| customValidation      | `function`    | `void`      | Custom async validation 				 |
| required              | `bool`        | `true`      | required HTML5									 |
| type      						| `string`      | `text`  		| Input type in HTML5  				  	 |
| value      						| `string`      | `''`   			| Initial value										 |
| onChangeValidation    | `function`    | `null`      | every change validation callback |
| onChangeValidationInterval | `number` | `2000`      | The interval for `onChangeValidation` |



