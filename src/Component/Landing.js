import React, { Component } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import classnames from "classnames";
import axios from "axios";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceValue: "",
      monthValue: "",
      amountValidation: true,
      monthValidation: true,
      loanValidation: true,
      loadLoadDetail: true,
      resultData: []
    };
  }
  handleLoadAmonut = e => {
    // this.setState({ priceValue: e });
    console.log(e.target.value);
    var loadAmount = Number(e.target.value);
    if (loadAmount < 500 || loadAmount > 5000) {
      this.setState({ amountValidation: false });
    } else {
      this.setState({ amountValidation: true, priceValue: loadAmount });
    }
    this.setState({ priceValue: loadAmount });
  };

  handleMonth = e => {
    console.log(e.target.value);
    var month = Number(e.target.value);
    if (month < 6 || month > 24) {
      console.log("jfddfsdf");
      this.setState({ monthValidation: false });
    } else {
      this.setState({ monthValidation: true, monthValue: month });
    }
    this.setState({ monthValue: month });
  };
  handleloanDetail = () => {
    if (
      this.state.priceValue < 500 ||
      this.state.priceValue > 5000 ||
      this.state.monthValue < 6 ||
      this.state.monthValue > 24
    ) {
      console.log("sadadda");
      this.setState({ loanValidation: false, loadLoadDetail: true });
    } else {
      console.log("dsadjsadf");
      this.setState({ loanValidation: true });
      axios
        .get(
          `https://ftl-frontend-test.herokuapp.com/interest?amount=${
            this.state.priceValue
          }&numMonths=${this.state.monthValue}`
        )
        .then(res => {
          console.log(res);
          this.setState({ resultData: res.data, loadLoadDetail: false });
        });
    }
  };
  render() {
    console.log(this.state.resultData);
    var loadData = this.state.resultData ? this.state.resultData : "";
    return (
      <div className="loan-container">
        <div className="loan-section">
          <input
            className="loan-amount"
            type="Number"
            value={this.state.priceValue}
            placeholder="Enter Loan Amount"
            onChange={e => this.handleLoadAmonut(e)}
          />
          <div
            className={classnames("validation", {
              "display-none": this.state.amountValidation
            })}
          >
            please enter amount between 500$ to 5000$
          </div>
          <Slider
            min={500}
            max={5000}
            value={this.state.priceValue}
            orientation="horizontal"
            onChange={e => this.setState({ priceValue: e })}
          />
          <input
            className="month-input"
            type="Number"
            value={this.state.monthValue}
            placeholder="Enter Month "
            onChange={e => this.handleMonth(e)}
          />
          <div
            className={classnames("validation", {
              "display-none": this.state.monthValidation
            })}
          >
            please enter month between 6 to 24
          </div>
          <Slider
            min={6}
            max={24}
            value={this.state.monthValue}
            orientation="horizontal"
            onChange={e => this.setState({ monthValue: e })}
          />
        </div>
        <button onClick={() => this.handleloanDetail()} className="loan-button">
          GET LOAN DETAIL
        </button>
        <div
          className={classnames("validation", {
            "display-none": this.state.loanValidation
          })}
        >
          please enter valid amount and month
        </div>
        <div
          className={classnames("", {
            "display-none": this.state.loadLoadDetail
          })}
        >
          <div className="loan-detail-heading">LOAN DETAIL</div>
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-4 lable">Loan Amount</div>
            <div className=" col-sm-4 principle-amount">
              {loadData.principal && loadData.principal.amount
                ? loadData.principal.amount + "$"
                : 0}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-4 lable">Interest Rate</div>
            <div className="col-sm-4 interest-rate">
              {loadData.interestRate ? loadData.interestRate : 0}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-4 lable">Total Installment</div>
            <div className="col-sm-4 total-installment">
              {loadData.numPayments ? loadData.numPayments : 0}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-4 lable">Installment Amount</div>
            <div className="col-sm-4 installment-amount">
              {loadData.monthlyPayment && loadData.monthlyPayment.amount
                ? loadData.monthlyPayment.amount + "$"
                : 0}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
