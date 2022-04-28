import React from "react";

import banksService from "../BanksServise/BanksServise";
import BankIdGenerator from "../BankIdGenerator/BankIdGenerator";
import BankModal from "../BankModal/BankModal";

import "./BankList.css";

class BanksList extends React.Component {

  static #INITIAL_INFO = {
    id: -1,
    name: "",
    percentRate: 0,
    termInMonths: 0,
    maxAmount: 0, // dob
    minAmount: 0  //dob
  };

  constructor(props) {
    super(props);

    this.state = {
      banks: banksService.getAll(),
      show: false,
      editableBankInfo: Object.assign({}, BanksList.#INITIAL_INFO)
    };
  }

  addNewBank(name, percentRate, minAmount, maxAmount, termInMonths) {
    const newBank = {
      id: BankIdGenerator.getNextId(),
      name: name,
      percentRate: percentRate,
      minAmount: minAmount,
      maxAmount: maxAmount,
      termInMonths: termInMonths
    };

    banksService.add(newBank);

    this.setState({ banks: banksService.getAll() });

    this.hideAddDialog();
  }

  deleteBankById(id) {
    banksService.delete(id);

    this.setState({ banks: banksService.getAll() });
    this.stopEditBankForm();
  }

  showAddDialog() {
    this.setState({ show: true });

  }

  hideAddDialog() {
    this.setState({ show: false });
  }

  startEditBankFormById(id) {
    const bank = banksService.findBankById(id);
    if (bank) {
      const newInfo = Object.assign({}, this.state.editableBankInfo);
      newInfo.id = bank.id;
      newInfo.name = bank.name;
      newInfo.percentRate = bank.percentRate;
      newInfo.termInMonths = bank.termInMonths;
      newInfo.maxAmount = bank.maxAmount;//dobav
      newInfo.minAmount = bank.minAmount;//dobav

      this.setState({ editableBankInfo: newInfo });
    }
  }

  stopEditBankForm() {
    this.setState({ editableBankInfo: Object.assign({}, BanksList.#INITIAL_INFO) });
  }

  handleEditBankNameChange(val) {
    const newInfo = Object.assign({}, this.state.editableBankInfo);
    newInfo.name = val;

    this.setState({ editableBankInfo: newInfo });
  }

  handleEditBankPercentRateChange(val, max) {
    const percentRate = Number(val);
    const maxPercentRate = Number(max);

    if (percentRate > maxPercentRate) {
      return;
    }

    const newInfo = Object.assign({}, this.state.editableBankInfo);
    newInfo.percentRate = percentRate;

    this.setState({ editableBankInfo: newInfo });
  }

  handleEditBankTermChange(val, max) {
    const months = Number(val);
    const maxMonths = Number(max);

    if (months > maxMonths) {
      return;
    }

    const newInfo = Object.assign({}, this.state.editableBankInfo);
    newInfo.termInMonths = months;

    this.setState({ editableBankInfo: newInfo });
  }

  editBankById(id) {
    banksService.edit(id, this.state.editableBankInfo);
    this.setState({ banks: banksService.getAll() });

    this.stopEditBankForm();
  }

  render() {
    const banks = this.state.banks;

    const rows = banks.map(bank => {
      return (
        <>
          <tr key={bank.id}>
            <td>{bank.name}</td>
            <td>{bank.percentRate}</td>
            <td>{bank.termInMonths}</td>
            <td>{bank.maxAmount}</td>
            <td>{bank.minAmount}</td>
            <td>
              {this.state.editableBankInfo.id === -1 &&
                <button type="button" onClick={() => this.startEditBankFormById(bank.id)}>Edit</button>
              }
              <button type="button" onClick={() => this.deleteBankById(bank.id)}>Delete</button>
            </td>
          </tr>
          {this.state.editableBankInfo.id === bank.id &&
            <tr>
              <td>
                <input type="text" value={this.state.editableBankInfo.name} onChange={(e) => this.handleEditBankNameChange(e.target.value)} />
                {/* maxlength="255" */}
              </td>
              <td>
                <input type="number" value={this.state.editableBankInfo.percentRate} min="0" max="100" onChange={(e) => this.handleEditBankPercentRateChange(e.target.value, e.target.max)} />
              </td>
              <td>
                <input type="number" value={this.state.editableBankInfo.termInMonths} min="1" max="240" onChange={(e) => this.handleEditBankTermChange(e.target.value, e.target.max)} />
              </td>
              <td>
                <input type="number" value={this.state.editableBankInfo.maxAmount} min="100" max="2400000" onChange={(e) => this.handleEditBankTermChange(e.target.value, e.target.max)} />
              </td>
              <td>
                <input type="number" value={this.state.editableBankInfo.minAmount} min="100" max="2400000" onChange={(e) => this.handleEditBankTermChange(e.target.value, e.target.max)} />
              </td>
              <td>
                <button type="button" onClick={() => this.editBankById(bank.id)}>Save</button>
                <button type="button" className="button button-outline" onClick={() => this.stopEditBankForm()}>Close</button>
              </td>
            </tr>
          }
        </>
      );
    });

    return (
      <div>
        <h1>Banks</h1>

        <table id="customers">
          <thead>
            <tr>
              <td>Name</td>
              <td>Percent</td>
              <td>Term (Month)</td>
              <td>Max Amount</td>
              <td>Min Amount</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>

        <button type="button" onClick={() => this.showAddDialog()}>Add new bank</button>

        <BankModal show={this.state.show}
          banks={this.state.banks}
          handleSave={(name, percentRate, termInMonths, maxAmount, minAmount) => this.addNewBank(name, percentRate, termInMonths, maxAmount, minAmount)}
          handleClose={() => this.hideAddDialog()}>
        </BankModal>
      </div>
    );
  }
}








// class BanksList extends React.Component {

//   static #INITIAL_INFO = {
//     id: -1,
//     name: "",
//     percentRate: 0,
//     termInMonths: 0
//   };

//   constructor(props) {
//     super(props);

//     this.state = {
//       banks: banksService.getAll(),
//       show: false,
//       editableBankInfo: Object.assign({}, BanksList.#INITIAL_INFO)
//     };
//   }

//   addNewBank(name, percentRate) {
//     const newBank = {
//       id: BankIdGenerator.getNextId(),
//       name: name,
//       percentRate: percentRate,
//       minAmount: 20_000,
//       maxAmount: 200_000,
//       termInMonths: 12
//     };

//     banksService.add(newBank);
//     this.setState({ banks: banksService.getAll() });
//     this.hideAddDialog();
//   }

//   deleteBankById(id) {
//     banksService.delete(id);
//     this.setState({ banks: banksService.getAll() });
//     this.stopEditBankForm();
//   }

//   showAddDialog() {
//     this.setState({ show: true });
//   }

//   hideAddDialog() {
//     this.setState({ show: false });
//   }

//   startEditBankFormById(id) {
//     const bank = banksService.findBankById(id);
//     if (bank) {
//       const newInfo = Object.assign({}, this.state.editableBankInfo);
//       newInfo.id = bank.id;
//       newInfo.name = bank.name;
//       newInfo.percentRate = bank.percentRate;
//       newInfo.termInMonths = bank.termInMonths;

//       this.setState({ editableBankInfo: newInfo });
//     }
//   }

//   stopEditBankForm() {
//     this.setState({ editableBankInfo: Object.assign({}, BanksList.#INITIAL_INFO) });
//   }

//   handleEditBankNameChange(val) {
//     const newInfo = Object.assign({}, this.state.editableBankInfo);
//     newInfo.name = val;

//     this.setState({ editableBankInfo: newInfo });
//   }

//   handleEditBankPercentRateChange(val, max) {
//     const percentRate = Number(val);
//     const maxPercentRate = Number(max);

//     if (percentRate > maxPercentRate) {
//       return;
//     }

//     const newInfo = Object.assign({}, this.state.editableBankInfo);
//     newInfo.percentRate = percentRate;
//     this.setState({ editableBankInfo: newInfo });
//   }

//   handleEditBankTermChange(val, max) {
//     const months = Number(val);
//     const maxMonths = Number(max);

//     if (months > maxMonths) {
//       return;
//     }

//     const newInfo = Object.assign({}, this.state.editableBankInfo);
//     newInfo.termInMonths = months;
//     this.setState({ editableBankInfo: newInfo });
//   }

//   editBankById(id) {
//     banksService.edit(id, this.state.editableBankInfo);
//     this.setState({ banks: banksService.getAll() });
//     this.stopEditBankForm();
//   }

//   render() {
//     const banks = this.state.banks;

//     const rows = banks.map(bank => {
//       return (
//         <>
//           <tr key={bank.id}>
//             <td>{bank.name}</td>
//             <td>{bank.percentRate}</td>
//             <td>{bank.termInMonths}</td>
//             <td>
//               {this.state.editableBankInfo.id === -1 &&
//                 <button type="button" onClick={() => this.startEditBankFormById(bank.id)}>Edit</button>
//               }
//               <button type="button" onClick={() => this.deleteBankById(bank.id)}>Delete</button>
//             </td>
//           </tr>
//           {this.state.editableBankInfo.id === bank.id &&
//             <tr>
//               <td>
//                 <input type="text" value={this.state.editableBankInfo.name} onChange={(e) => this.handleEditBankNameChange(e.target.value)} />
//               </td>
//               <td>
//                 <input type="number" value={this.state.editableBankInfo.percentRate} min="0" max="100" onChange={(e) => this.handleEditBankPercentRateChange(e.target.value, e.target.max)} />
//               </td>
//               <td>
//                 <input type="number" value={this.state.editableBankInfo.termInMonths} min="1" max="240" onChange={(e) => this.handleEditBankTermChange(e.target.value, e.target.max)} />
//               </td>
//               <td>
//                 <button type="button" onClick={() => this.editBankById(bank.id)}>Save</button>
//                 <button type="button" className="button button-outline" onClick={() => this.stopEditBankForm()}>Close</button>
//               </td>
//             </tr>
//           }
//         </>
//       );
//     });

//     return (
//       <div>
//         <h1>Banks</h1>
//         <table>
//           <thead>
//             <tr>
//               <td>Name</td>
//               <td>Percent</td>
//               <td>term (month)</td>
//               <td>Actions</td>
//             </tr>
//           </thead>
//           <tbody>
//             {rows}
//           </tbody>
//         </table>

//         <button type="button" onClick={() => this.showAddDialog()}>Add new bank</button>

//         <BankModal
//           show={this.state.show}
//           banks={this.state.banks}
//           handleSave={(name, percentRate) => this.addNewBank(name, percentRate)}
//           handleClose={() => this.hideAddDialog()}>
//         </BankModal>
//       </div>
//     );
//   }
// }

export default BanksList;