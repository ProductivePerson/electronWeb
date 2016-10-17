import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import dateformat from 'dateFormat';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "USD",
      exRates: {},
      currData: [],
      txData: []
    };

    // this.setCurrency = this.setCurrency.bind(this);
  }

  componentDidMount() {
    this.getBitIndexes(this.interpretBitIndexes);
    this.setCurrency();
  }

  setCurrency() {
    axios.get('/exRates')
        .then(res => {
          this.setState({exRates: res.data});
        })
        .catch(err => console.error(err));
  }

  toggleCurrency(e){
    console.log("Here we go", e.target.value);
    this.setState({currency: e.target.value});
    // CURRENCY = $('#exchangeRates').val();
    //
    // $('.bCoinVal').text((idx) => {
    //   return generateValue(txData[idx].value);
    // });
  }

  render() {
    return <div id="lastTen">
      <h1>HERE HERE HERE</h1>
      <CurrencySelect
        toggleCurrency = {this.toggleCurrency} exRates={this.state.exRates} />
      {/* <LastTenBits /> */}
      {/* <div className="flipster">
        <ul>
        </ul>
      </div> */}
    </div>;
  }
}

class CurrencySelect extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { exRates } = this.props;

    return <select id="exchangeRates"
        onChange={this.props.toggleCurrency}>
          {
            Object.keys(this.props.exRates).map((country, key) =>
              <option key={key} name={country} value={country}>
                {country}
              </option>)
          }
          {/* {this.props.exRates.map(country =>
            <option name={country} value={country}>{country}</option>
          )} */}
        </select>;
  }
}

class LastTenBits extends React.Component {
  render() {
    return <div>
        <h1>City: Anywhere</h1>
      </div>;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
