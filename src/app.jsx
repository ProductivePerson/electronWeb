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
      currData: []
    };

    // this.setCurrency = this.setCurrency.bind(this);
  }

  componentDidMount() {
    this.getBitIndexes();
    this.setCurrency();
  }

  getBitIndexes() {
    axios.get('/get/latestBlock')
      .then(res => {
        this.setState({txData: res.data});
      })
      .catch(err => console.error("Error in getBitIndexes: ", err));
  }

  setCurrency() {
    axios.get('/get/exRates')
        .then(res => {
          this.setState({exRates: res.data});
        })
        .catch(err => console.error("Error in setCurrency: ", err));
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
      <CurrencySelect
        toggleCurrency = {this.toggleCurrency} exRates={this.state.exRates} />
      {this.state.txData &&
        <LastTenBits txData = {this.state.txData}
          currency = {this.state.currency}
          exRates = {this.state.exRates} />
      }
    </div>;
  }
}

class CurrencySelect extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { exRates } = this.props;

    return <select id="exchangeRates" hidden="true"
        onChange={this.props.toggleCurrency}>
          {
            Object.keys(this.props.exRates).map((country, key) =>
              <option key={key} name={country} value={country}>
                {country}
              </option>)
          }
        </select>;
  }
}

class LastTenBits extends React.Component {
  constructor(props) {
    super(props);
  }

  initializeFlipster() {
    console.log("ding ding flipster starts", this.props.txData[3]);
    $('.flipster').flipster({
        style: 'carousel',
        start: 0
    });
    $('#exchangeRates, #links').fadeIn(1000);
  }

  componentDidMount() {
    this.initializeFlipster();
  }

  renderSingleExchange(data) {
    return <div className="transaction">
              <p className="bCoinTime">A thing</p>
              <p className="bCoinVal">Another Thing</p>
           </div>;
  }
  render() {
    const { exRates, currency } = this.props;

    return <div className="flipster">
            <ul>
            {
              this.props.txData.map((data, key) =>
                <li key={key}>
                  {/* {this.renderSingleExchange(data)} */}
                    <SingleExchange data={data} {...this.props}/>
                </li>
              )
            }
            </ul>
          </div>;
  }
}

class SingleExchange extends React.Component {
  constructor(props) {
    super(props);

    const txDate = new Date(this.props.data.time);
    // this.setState({
      // formattedDate: dateformat(txDate, "longTime"),
      // type: this.props.data.spent ? 'Expense' : 'Transfer',
      // value: this.generateValue(this.props.data.value)
    // });
  }

  componentWillReceiveProps(newProps) {
      if (newProps.currency) {
        this.setState({value: this.generateValue(this.props.data.value)});
      }
  }

  generateValue(num) {
    const { exRates, currency } = this.props;

    return exRates[currency].symbol +
      (num / 100000000 * exRates[currency]['15m']).toFixed(2);
  }

  render() {
    const { data } = this.props,
          formattedDate = dateformat(new Date(data.time), "longTime"),
          type = data.spent ? 'Expense' : 'Transfer',
          value = this.generateValue(data.value);

    return <div className="transaction">
              <p className="bCoinTime">{type} #{data.index} at {formattedDate}</p>
              <p className="bCoinVal">{value}</p>
           </div>;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
