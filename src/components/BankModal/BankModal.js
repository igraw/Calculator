import React from "react";
import "./Modal.css"

class BankModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      percentRate: 0,
      minAmount: 0,
      maxAmount: 0,
      termInMonths: 0
    };
  }

  handleTermChange(e) {
    this.setState({ termInMonths: e.target.value });
  }
  handleMaxAmount(e) {
    this.setState({ maxAmount: e.target.value });
  }
  handleMinAmount(e) {
    this.setState({ minAmount: e.target.value });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handlePercentRateChange(e) {
    const val = e.target.value;
    this.setState({ percentRate: val ? Number(val) : 0 });

  }

  handleSave() {
    const name = this.state.name;
    const percentRate = this.state.percentRate;
    const termInMonths = this.state.termInMonths;
    const maxAmount = this.state.maxAmount;
    const minAmount = this.state.minAmount;

    if (!name) {
      this.setState({ message: `Bank name must not be empty` });
      return;
    }

    if (!percentRate || Number(percentRate) < 1 || Number(percentRate) > 100) {
      this.setState({ message: `Percent term must be between 1 and 100` });
      return;
    }

    const index = this.props.banks.findIndex(b => b.name === this.state.name);
    if (index >= 0) {
      this.setState({ message: `Bank with the name ${name} already exists` });
      return;
    }

    this.setState({ message: "" });
    this.props.handleSave(name, percentRate, minAmount, maxAmount, termInMonths);
  }

  render() {
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName}>

        <div className=" modal modal-main">
          <h2>Add bank</h2>
          <h2 className="error">{this.state.message}</h2>
          <div>
            <label>
              Name:
              <input type="text" name="bank-name" placeholder="Bank name" length="255"
                value={this.state.name}
                onChange={(e) => this.handleNameChange(e)}
              />
            </label>
            <label>
              Percent rate:
              <input type="number" name="percent-rate" min="0" max="100" placeholder="Percent rate"
                value={this.state.percentRate}
                onChange={(e) => this.handlePercentRateChange(e)}
              />
            </label>
            <label>
              Min Amount:
              <input type="number" name="minAmount" min="0" max="100" placeholder="MinAmount"
                value={this.state.minAmount}
                onChange={(e) => this.handleMinAmount(e)}
              />
            </label>
            <label>
              Max Amount:
              <input type="number" name="maxAmount" min="0" max="100" placeholder="MaxAmount"
                value={this.state.maxAmount}
                onChange={(e) => this.handleMaxAmount(e)}
              />
            </label>
            <label>
              Term (Months):
              <input type="number" name="termInMonths" min="0" max="100" placeholder="termInMonths"
                value={this.state.termInMonths}
                onChange={(e) => this.handleTermChange(e)}
              />
            </label>
            <button className="btn" type="button" onClick={() => this.handleSave()}>
              Save
            </button>
            <button className="btn" type="button button-outline" onClick={this.props.handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default BankModal;