import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import dateformat from 'dateFormat';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "USD",
      exRates: [],
      currData: [],
      txData: []
    };

    this.setCurrency = this.setCurrency.bind(this);
    this.setCurrency();

  }

  setCurrency() {
    console.log("HERE, time to play");
    axios.get('/exRates')
        .then(res => {
          console.log("ding ding ding", res.data);
          this.setState({exRates: res.data});
          console.log("TESTING ", this.state);
          renderExchangeRates(exRates);
        })
        .catch(err => console.error(err));
  }

  toggleCurrency(e){
    console.log("Here we go", e.target);
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
    return <select id="exchangeRates"
        onChange={this.props.toggleCurrency} hidden="true" >
          {this.props.exRates.map(country =>
            <option name={country} value={country}>{country}</option>
          )}
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