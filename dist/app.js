'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dateFormat = require('dateFormat');

var _dateFormat2 = _interopRequireDefault(_dateFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      currency: "USD",
      exRates: [],
      currData: [],
      txData: []
    };

    _this.setCurrency = _this.setCurrency.bind(_this);
    _this.setCurrency();

    return _this;
  }

  _createClass(App, [{
    key: 'setCurrency',
    value: function setCurrency() {
      var _this2 = this;

      console.log("HERE, time to play");
      _axios2.default.get('/exRates').then(function (res) {
        console.log("ding ding ding", res.data);
        _this2.setState({ exRates: res.data });
        console.log("TESTING ", _this2.state);
        renderExchangeRates(exRates);
      }).catch(function (err) {
        return console.error(err);
      });
    }
  }, {
    key: 'toggleCurrency',
    value: function toggleCurrency(e) {
      console.log("Here we go", e.target);
      // CURRENCY = $('#exchangeRates').val();
      //
      // $('.bCoinVal').text((idx) => {
      //   return generateValue(txData[idx].value);
      // });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'lastTen' },
        _react2.default.createElement(
          'h1',
          null,
          'HERE HERE HERE'
        ),
        _react2.default.createElement(CurrencySelect, {
          toggleCurrency: this.toggleCurrency, exRates: this.state.exRates })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

var CurrencySelect = function (_React$Component2) {
  _inherits(CurrencySelect, _React$Component2);

  function CurrencySelect(props) {
    _classCallCheck(this, CurrencySelect);

    return _possibleConstructorReturn(this, (CurrencySelect.__proto__ || Object.getPrototypeOf(CurrencySelect)).call(this, props));
  }

  _createClass(CurrencySelect, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'select',
        { id: 'exchangeRates',
          onChange: this.props.toggleCurrency, hidden: 'true' },
        this.props.exRates.map(function (country) {
          return _react2.default.createElement(
            'option',
            { name: country, value: country },
            country
          );
        })
      );
    }
  }]);

  return CurrencySelect;
}(_react2.default.Component);

var LastTenBits = function (_React$Component3) {
  _inherits(LastTenBits, _React$Component3);

  function LastTenBits() {
    _classCallCheck(this, LastTenBits);

    return _possibleConstructorReturn(this, (LastTenBits.__proto__ || Object.getPrototypeOf(LastTenBits)).apply(this, arguments));
  }

  _createClass(LastTenBits, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'City: Anywhere'
        )
      );
    }
  }]);

  return LastTenBits;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));

exports.default = App;