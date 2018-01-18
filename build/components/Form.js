'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.validators = [];
    _this.state = { childrenWithProps: [] };
    _this.formData = {};
    _this.submit = _this.submit.bind(_this);
    _this._setUpValidators = _this._setUpValidators.bind(_this);
    _this._addPropsToChildren = _this._addPropsToChildren.bind(_this);
    return _this;
  }

  _createClass(Form, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setUpValidators(this.props.children);
    }
  }, {
    key: '_prepareFailElement',
    value: function _prepareFailElement(id) {
      var element = void 0;
      if (!id) {
        element = document.createElement('div');
        element.innerHTML = '';
        return element;
      }
      element = document.getElementById(this.props.failMessageId);
      element.innerHTML = '';
      return element;
    }
  }, {
    key: 'submit',
    value: function submit(e) {
      var _this2 = this;

      e.preventDefault();
      this.formData = {};
      var element = this._prepareFailElement(this.props.failMessageId);
      var valid = true;
      var failMessage = '';
      this.validators.forEach(function (validator, i) {
        validator(function (bool, message, name, input) {
          if (_this2.formData[name]) {
            //if its not alraedy an array, make it to an array
            if (!Array.isArray(_this2.formData[name])) {
              var tmp = _this2.formData[name];
              _this2.formData[name] = [tmp];
            }
            _this2.formData[name].push(input);
          } else {
            _this2.formData[name] = input;
          }
          if (!bool) {
            valid = false;
            failMessage = message;
          }
          if (i === _this2.validators.length - 1) {
            if (valid) {
              //TODO:
              //if (this.props.action) {
              // middleware.makeRequest(this.props.url, this.formData ,()=>{
              //this.props.onSubmit(e)
              //})
              //}
              _this2.props.onSubmit(e, _this2.formData);
            } else {
              element.innerHTML = failMessage;
            }
          }
        });
      });
    }
  }, {
    key: '_setUpValidators',
    value: function _setUpValidators(incommingChildren) {
      var childrenWithProps = this._addPropsToChildren(incommingChildren, -1);
      this.setState({
        childrenWithProps: childrenWithProps
      });
    }
  }, {
    key: '_addPropsToChildren',
    value: function _addPropsToChildren(incommingChildren, key) {
      var _this3 = this;

      if (!Array.isArray(incommingChildren)) {
        if (!_config2.default.formElements.includes(incommingChildren.type.name)) {
          // !== 'Input'){
          return _react2.default.cloneElement(incommingChildren, {
            children: this._addPropsToChildren(incommingChildren.props.children, key)
          });
        }
        return _react2.default.cloneElement(incommingChildren, {
          init: function init(validateFunction) {
            _this3.validators.push(validateFunction);
          },
          key: key
        });
      }
      return incommingChildren.map(function (child, i) {
        if (_config2.default.formElements.includes(child.type.name)) {
          // === 'Input'){
          return _react2.default.cloneElement(child, {
            init: function init(validateFunction) {
              _this3.validators.push(validateFunction);
            },
            key: i
          });
        } else {
          if (child.props.children) {
            return _react2.default.cloneElement(child, {
              children: _this3._addPropsToChildren(child.props.children, i),
              key: i
            });
          }
          return child;
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'form',
        { onSubmit: function onSubmit(e) {
            return _this4.submit(e);
          } },
        this.state.childrenWithProps
      );
    }
  }]);

  return Form;
}(_react.Component);

Form.defaultProps = {
  className: '-1',
  onSubmit: function onSubmit(e) {}
};

exports.default = Form;