import { credits } from "./state.js";

export function renderStadistics() {
    const totalCredits = document.querySelector('.stats__item:first-child .stats__title');

    const amountCredits = document.querySelector('.stats__item:nth-child(2) .stats__title');

    const averageMount = document.querySelector('.stats__item:last-child .stats__title');

    const total = credits.length;
    const totalAmount = credits.reduce((acc, credit) => acc + credit.monto, 0);
    const average = total > 0 ? totalAmount / total : 0;

    totalCredits.textContent = total;
    amountCredits.textContent = totalAmount;
    averageMount.textContent = average;

}