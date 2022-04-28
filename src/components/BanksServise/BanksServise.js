
import BankIdGenerator from "../BankIdGenerator/BankIdGenerator";

class BanksService {

  constructor() {
    this.selectedBank = null;
    this.banks = [
      {
        id: BankIdGenerator.getNextId(),
        name: "Privat",
        percentRate: 12,
        minAmount: 20_000,
        maxAmount: 200_000,
        termInMonths: 12
      },
      {
        id: BankIdGenerator.getNextId(),
        name: "Ukrsib",
        percentRate: 14,
        minAmount: 10_000,
        maxAmount: 150_000,
        termInMonths: 6
      }
    ];
  }


  getAll() {
    return this.banks;
  }

  findBankById(bankId) {
    return this.banks.find(bank => bank.id === bankId);
  }

  add(bank) {
    this.banks.push(bank);
  }

  delete(bankId) {
    const bankIndex = this.banks.findIndex(bank => bank.id === bankId);
    if (bankIndex >= 0) {
      const bank = this.banks[bankIndex];

      if (this.selectedBank === bank) {
        this.selectedBank = null;
      }
      this.banks.splice(bankIndex, 1);
    }
  }

  edit(bankId, info) {
    const foundBank = this.findBankById(bankId);
    if (foundBank) {
      foundBank.name = info.name;
      foundBank.percentRate = info.percentRate;
      foundBank.termInMonths = info.termInMonths;
    };
  }
}

export default new BanksService();