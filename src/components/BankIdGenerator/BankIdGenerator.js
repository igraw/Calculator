class BankIdGenerator {

  static bankId = 1;

  static getNextId() {
    return ++BankIdGenerator.bankId;
  }
}
export default BankIdGenerator;