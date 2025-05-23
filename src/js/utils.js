import { renderStadistics } from "./stats.js";

export function listTab() {
    const listItems = document.querySelectorAll('.list__item');

    listItems.forEach((item) => {
        item.addEventListener('click', () => {
            listItems.forEach((el) => el.classList.remove('list__item--selected'));
            item.classList.add('list__item--selected');
        });
    });
}

export function showCreditStadistics() {
    const creditList = document.querySelector('.list__item:first-of-type');

    const creditStadistics = document.querySelector('.list__item:last-of-type');

    const creditArticle = document.querySelector('.credit__dashboard');

    const stadisticCreditArticle = document.querySelector('.graph');

    creditList.addEventListener('click', () => {
        creditArticle.classList.remove('credit__dashboard--disable');
        stadisticCreditArticle.classList.add('graph--disable');
    });

    creditStadistics.addEventListener('click', () => {
        stadisticCreditArticle.classList.remove('graph--disable');
        creditArticle.classList.add('credit__dashboard--disable');
        renderStadistics();
    });
}

export function enableForm() {
    const newCreditButton = document.querySelector('.new-credit__button');
    const newCreditForm = document.querySelector('.credit__form');
    const cancelCreditButton = document.querySelector('.form__cancel');

    newCreditButton.addEventListener('click', () => {
        newCreditForm.classList.add('credit__form--enable');
    });

    cancelCreditButton.addEventListener('click', () => {
        newCreditForm.classList.remove('credit__form--enable');
    });
}

