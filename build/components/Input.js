'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this.state = _defineProperty({}, _this.props.name, _this.props.value ? _this.props.value : '');
    _this.value = _this.props.value;
    _this.validateInput = _this.validateInput.bind(_this);
    _this.saveToState = _this.saveToState.bind(_this);
    _this.timeoutCheck = null;
    return _this;
  }

  _createClass(Input, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.type !== 'submit') {
        this.props.init(this.validateInput);
      }
    }
  }, {
    key: 'validateInput',
    value: function validateInput(cb) {
      var _this2 = this;

      var input = this.state[this.props.name];
      var regex = new RegExp(this.props.regexToMatch, 'g');
      var revregex = new RegExp(this.props.regexNotToMatch, 'g');
      var name = this.props.name;
      if (this.state[this.props.name] === '' && this.props.required === false) {
        cb(true, null, name, input);return;
      }
      if (!input.match(regex)) {
        cb(false, this.props.validationFailMessage, name, input);
      } else if (input.match(revregex)) {
        cb(false, this.props.validationFailMessage, name, input);
      } else if (input.length > this.props.max || input.length < this.props.min) {
        cb(false, this.props.validationFailMessage, name, input);
      } else {
        this.props.customValidation(input, function (isValid) {
          //THIS WILL WAIT Untill u Validate against a server
          if (isValid) {
            cb(true, null, name, input);
          } else {
            cb(false, _this2.props.validationFailMessage, name, input);
          }
        });
      }
    }
  }, {
    key: 'saveToState',
    value: function saveToState(e) {
      var _this3 = this;

      this.value = null;
      clearTimeout(this.timeoutCheck);
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;

      this.setState(_defineProperty({}, name, value));
      if (this.props.onChangeValidation) {
        this.timeoutCheck = setTimeout(function () {
          return _this3.validateInput(_this3.props.onChangeValidation);
        }, this.props.onChangeValidationInterval);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement('input', {
        style: this.props.style,
        className: this.props.className,
        name: this.props.name,
        onChange: function onChange(e) {
          return _this4.saveToState(e);
        },
        type: this.props.type,
        value: this.value ? this.value : this.state[this.props.name]
      });
    }
  }]);

  return Input;
}(_react.Component);

Input.defaultProps = {
  max: 10000,
  min: -10000,
  style: null,
  onChangeValidationInterval: 2000,
  validateOn: 'submit',
  onChangeValidation: null,
  validationFailMessage: 'Add you validation message',
  name: 'fieldx' + Date.now().toString(),
  type: 'text',
  className: Date.now().toString(),
  regexToMatch: ".*",
  regexNotToMatch: "(?!.*)",
  value: null,
  required: true,
  customValidation: function customValidation(input, next) {
    return next(true);
  }
};
exports.default = Input;