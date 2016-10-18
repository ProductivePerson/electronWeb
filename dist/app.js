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
      exRates: {},
      currData: [],
      txData: []
    };

    // this.setCurrency = this.setCurrency.bind(this);
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getBitIndexes();
      this.setCurrency();
    }
  }, {
    key: 'getBitIndexes',
    value: function getBitIndexes() {
      var _this2 = this;

      _axios2.default.get('/get/latestBlock').then(function (res) {
        _this2.setState({ txData: res.data });
      }).catch(function (err) {
        return console.error("Error in getBitIndexes: ", err);
      });
    }
  }, {
    key: 'setCurrency',
    value: function setCurrency() {
      var _this3 = this;

      _axios2.default.get('/get/exRates').then(function (res) {
        _this3.setState({ exRates: res.data });
      }).catch(function (err) {
        return console.error("Error in setCurrency: ", err);
      });
    }
  }, {
    key: 'toggleCurrency',
    value: function toggleCurrency(e) {
      console.log("Here we go", e.target.value);
      this.setState({ currency: e.target.value });
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
          toggleCurrency: this.toggleCurrency, exRates: this.state.exRates }),
        _react2.default.createElement(LastTenBits, {
          txData: this.state.txData,
          currency: this.state.currency,
          exRates: this.state.exRates
        })
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
      var exRates = this.props.exRates;


      return _react2.default.createElement(
        'select',
        { id: 'exchangeRates',
          onChange: this.props.toggleCurrency },
        Object.keys(this.props.exRates).map(function (country, key) {
          return _react2.default.createElement(
            'option',
            { key: key, name: country, value: country },
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

  function LastTenBits(props) {
    _classCallCheck(this, LastTenBits);

    return _possibleConstructorReturn(this, (LastTenBits.__proto__ || Object.getPrototypeOf(LastTenBits)).call(this, props));
  }

  _createClass(LastTenBits, [{
    key: 'render',
    value: function render() {
      console.log("Testing: props are", this.props);
      return _react2.default.createElement(
        'div',
        { className: 'flipster' },
        _react2.default.createElement(
          'ul',
          null,
          this.props.txData.map(function (tx, key) {
            _react2.default.createElement(
              'li',
              null,
              'DO SOMETHING',
              _react2.default.createElement('singleExchange', { tx: tx })
            );
          })
        )
      );
    }
  }]);

  return LastTenBits;
}(_react2.default.Component);

var singleExchange = function (_React$Component4) {
  _inherits(singleExchange, _React$Component4);

  function singleExchange(props) {
    _classCallCheck(this, singleExchange);

    return _possibleConstructorReturn(this, (singleExchange.__proto__ || Object.getPrototypeOf(singleExchange)).call(this, props));
  }

  _createClass(singleExchange, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { 'class': 'transaction', title: this.props.tx.address },
        _react2.default.createElement(
          'p',
          { 'class': 'bCoinTime' },
          'A thing'
        ),
        _react2.default.createElement(
          'p',
          { 'class': 'bCoinVal' },
          'Another Thing'
        )
      );
    }
  }]);

  return singleExchange;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));

exports.default = App;