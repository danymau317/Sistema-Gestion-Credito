export function listTab() {
    const listItems = document.querySelectorAll('.list__item');

    listItems.forEach((item) => {
        item.addEventListener('click', () => {
            listItems.forEach((el) => el.classList.remove('list__item--selected'));
            item.classList.add('list__item--selected');
        });
    });
}

export function handleTableActions() {
    const tableBody = document.querySelector('.table__body');

    tableBody.addEventListener('click', (e) => {
        const toggle = e.target.closest('.table__actions-toggle');

        if (toggle) {
            e.stopPropagation();
            document.querySelectorAll('.table__actions-options').forEach((menu) => {
                menu.classList.remove('table__actions-options--visible');
            });

            const parent = toggle.closest('.table__actions');
            const options = parent?.querySelector('.table__actions-options');

            if (options) {
                options.classList.toggle('table__actions-options--visible');
            }
        }
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.table__actions-options').forEach((menu) => {
            menu.classList.remove('table__actions-options--visible');
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
    });
}

export function handleSubmitForm() {
    const form = document.querySelector('.credit__form');

    form.addEventListener('submit', (e) => {

        e.preventDefault();

        const data = {
            client: form.client.value,
            amount: parseFloat(form.amount.value),
            interest: parseFloat(form.interest.value),
            time: parseInt(form.time.value),
            date: form.date.value,
            state: form.state.value
        };
        console.log(data);

        renderToDashBoard(data);

        form.reset();

    });
}

function renderToDashBoard(data) {
    const tableBody = document.querySelector('.table__body');

    const newTr = document.createElement('tr')
    newTr.innerHTML = `
     <td>${data.client}</td>
        <td>$${data.amount.toFixed(2)}</td>
        <td>${data.interest.toFixed(2)}%</td>
        <td>${data.time} meses</td>
        <td>${data.date}</td>
        <td class="table__state ${getStateClass(data.state)}">${data.state}</td>
        <td class="table__actions">

            <span class="table__actions-toggle">...</span>
                <div class="table__actions-options">
                    <div class="actions-options__item">
                        <img src="./assets/icons/edit.png" alt="edit-icon" />
                        <p>Editar</p>
                    </div>
                    <div class="actions-options__item">
                        <img
                            src="./assets/icons/delete.png"
                            alt="delete-icon"
                        />
                        <p class="actions-options-delete-text">Borrar</p>
                    </div>
                </div>
        </td>
    `;
    tableBody.appendChild(newTr);
}

function getStateClass(state) {
    switch (state.toLowerCase()) {
        case "aprobado":
            return "table__state--approved";
        case "pagado":
            return "table__state--paid"
        case "pendiente":
            return "table__state--pending";
        case "rechazado":
            return "table__state--rejected";
    }
}