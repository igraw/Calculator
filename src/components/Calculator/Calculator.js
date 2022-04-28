import React from "react";

import banksService from "../BanksServise/BanksServise";
import MonthlyPaymentCalculator from "../MonthlyPaymentCalculator/MonthlyPaymentCalculator";

import "./Calculator.css";

class Calculator extends React.Component {

  static #MONTHS_IN_YEAR = 12;

  constructor(props) {
    super(props);

    const amountBorrowed = 0;
    const downPayment = 0;
    const months = 0;

    this.state = {
      banks: banksService.getAll(),
      selectedBank: null,
      amountBorrowed: amountBorrowed,
      downPayment: downPayment,
      monthlyPayment: new MonthlyPaymentCalculator().calculate(amountBorrowed - downPayment, 0, months),
      message: ''
    };
  }

  selectBank(bankId) {
    const foundBank = banksService.findBankById(bankId);
    if (foundBank) {
      this.setState({
        selectedBank: foundBank,
        amountBorrowed: 0,
        downPayment: 0,
        monthlyPayment: 0
      });
    }

  }

  handleAmountBorrowedChange(amount) {
    this.setState({ amountBorrowed: amount ? Number(amount) : 0 });
  }

  handleDownPaymentChange(amount) {
    this.setState({ downPayment: amount ? Number(amount) : 0 });
  }

  calculateMonthlyPayment() {

    const creditAmount = this.state.amountBorrowed - this.state.downPayment;
    const percent = this.state.selectedBank.percentRate;
    const months = this.state.selectedBank.termInMonths;

    const monthlyPayment = new MonthlyPaymentCalculator().calculate(creditAmount, percent, months);
    this.setState({ monthlyPayment });

  }

  bankLimit() {
    this.calculateMonthlyPayment()

    const checkAmount = this.state.selectedBank;
    const amountBorr = this.state.amountBorrowed;

    if (amountBorr <= checkAmount.maxAmount && amountBorr >= checkAmount.minAmount) {
      this.setState({ message: `` });
    }
    else {
      this.setState({ message: `Choose an amount within the bank limit` });
    };
  }

  render() {
    const banksInfo = this.state.banks.length ? (
      <ul>{
        this.state.banks.map(bank => (<li
          key={bank.id}
          className={bank === this.state.selectedBank ? "bank bank-selected" : "bank"}
          onClick={() => this.selectBank(bank.id)}>{bank.name}</li>))
      }</ul>)
      :
      (<div>There are no banks to choose</div>);

    const selectedBankInfo = this.state.selectedBank
      ? (
        <div className="bank-parameters">
          <p>Name: {this.state.selectedBank.name}</p>
          <p>Rate, %: {this.state.selectedBank.percentRate}</p>
          <p>Term (month): {this.state.selectedBank.termInMonths}</p>
          <p>Min amount, $: {this.state.selectedBank.minAmount}</p>
          <p>Max amount, $: {this.state.selectedBank.maxAmount}</p>

          <p>
            Amount borrowed, $: <input type="number" placeholder="Amount borrowed" value={this.state.amountBorrowed}
              onChange={(e) => this.handleAmountBorrowedChange(e.target.value)} /> </p>
          <p>
            Down payment, $:  <input type="number" placeholder="Down payment" value={this.state.downPayment}
              onChange={(e) => this.handleDownPaymentChange(e.target.value)} />  </p>

          <button onClick={() => this.bankLimit()}>Calculate</button>
          <p>
            Monthly payment, $: {!this.state.message ? this.state.monthlyPayment.toFixed() : this.state.message}
          </p>
        </div>)
      :
      (<div>Bank is not selected</div>);

    return (
      <div>
        <h1>Calculate:</h1>

        <h2>Banks:</h2>
        {banksInfo}

        <h2>Selected bank info:</h2>
        {selectedBankInfo}
      </div>
    );
  }
}
export default Calculator;