class MonthlyPaymentCalculator {

    static #MONTHS_IN_YEAR = 12;

    calculate(creditAmount, percent, months) {
        return (creditAmount + (((creditAmount / 100) * percent) / MonthlyPaymentCalculator.#MONTHS_IN_YEAR) * months) / months;
    }
}
export default MonthlyPaymentCalculator;