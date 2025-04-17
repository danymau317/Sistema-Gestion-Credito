export function listTab() {
    let listItems = document.querySelectorAll('.list__item');

    listItems.forEach((item) => {
        item.addEventListener('click', () => {
            listItems.forEach((el) => el.classList.remove('list__item--selected'));
            item.classList.add('list__item--selected');
        });
    });
}

export function handleTableActions() {
    const toggles = document.querySelectorAll('.table__actions-toggle');

    toggles.forEach((toggle) => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();

            const parent = toggle.closest('.table__actions');
            const options = parent?.querySelector('.table__actions-options');

            if (options) {
                options.classList.toggle('table__actions-options--visible');
            }
        });
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.table__actions-options').forEach((menu) => {
            menu.classList.remove('table__actions-options--visible');
        });
    });
}

export function enableForm() {
    let newCreditButton = document.querySelector('.new-credit__button');
    let newCreditForm = document.querySelector('.credit__form');
    let cancelCreditButton = document.querySelector('.form__cancel');

    newCreditButton.addEventListener('click', () => {
        newCreditForm.classList.add('credit__form--enable');
    });

    cancelCreditButton.addEventListener('click', () => {
        newCreditForm.classList.remove('credit__form--enable');
    });
}