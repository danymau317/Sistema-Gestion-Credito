export function listTab() {
    const listItems = document.querySelectorAll('.list__item');

    listItems.forEach((item) => {
        item.addEventListener('click', () => {
            listItems.forEach((el) => el.classList.remove('list__item--selected'));
            item.classList.add('list__item--selected');
        });
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
        editingRow = null;
    });
}