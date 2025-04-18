import { credits, setCredit, deleteCredit } from "./state.js";

let editingRow = null;

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
            return;
        }

        const actionItem = e.target.closest('.actions-options__item');
        const row = e.target.closest('tr');

        if (actionItem && row) {
            const action = actionItem.dataset.action;

            if (action === 'delete') {
                deleteRow(row);
            }
            if (action === 'edit') {
                editRow(row);
            }
        }
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.table__actions-options').forEach((menu) => {
            menu.classList.remove('table__actions-options--visible');
        });
    });
}

export function handleSubmitForm() {
    const form = document.querySelector('.credit__form');

    form.addEventListener('submit', (e) => {

        e.preventDefault();

        const data = {
            id: editingRow ? parseInt(editingRow.getAttribute('data-id')) : Date.now(),
            client: form.client.value,
            amount: parseFloat(form.amount.value),
            interest: parseFloat(form.interest.value),
            time: parseInt(form.time.value),
            date: form.date.value,
            state: form.state.value
        };
        setCredit(data);
        console.table(credits);
        renderAll();
        editingRow = null;
    });
}


function deleteRow(row) {
    const id = row.getAttribute('data-id');
    deleteCredit(id);
    renderAll();
}

function editRow(row) {
    const cells = row.querySelectorAll('td');
    const data = {
        id: parseInt(row.getAttribute('data-id')),
        client: cells[1].textContent.trim(),
        amount: parseFloat(cells[2].textContent.replace('$', '')),
        interest: parseFloat(cells[3].textContent.replace('%', '')),
        time: parseInt(cells[4].textContent),
        date: cells[5].textContent.trim(),
        state: cells[6].textContent.trim()
    };

    const form = document.querySelector('.credit__form');
    form.client.value = data.client;
    form.amount.value = data.amount;
    form.interest.value = data.interest;
    form.time.value = data.time;
    form.date.value = data.date;
    form.state.value = data.state;

    form.classList.add('credit__form--enable');

    editingRow = row;

}

export function renderAll() {
    const tableBody = document.querySelector('.table__body');
    tableBody.innerHTML = '';

    credits.forEach((data) => {
        const newTr = document.createElement('tr');
        newTr.setAttribute('data-id', data.id);
        newTr.innerHTML = `
            <td>${data.id}</td>
            <td>${data.client}</td>
            <td>$${data.amount.toFixed(2)}</td>
            <td>${data.interest.toFixed(2)}%</td>
            <td>${data.time} meses</td>
            <td>${data.date}</td>
            <td class="table__state ${getStateClass(data.state)}">${data.state}</td>
            <td class="table__actions">
                <span class="table__actions-toggle">...</span>
                <div class="table__actions-options">
                    <div class="actions-options__item" data-action="edit">
                        <img src="./assets/icons/edit.png" alt="edit-icon" />
                        <p>Editar</p>
                    </div>
                    <div class="actions-options__item" data-action="delete">
                        <img src="./assets/icons/delete.png" alt="delete-icon" />
                        <p class="actions-options-delete-text">Borrar</p>
                    </div>
                </div>
            </td>
        `;
        tableBody.appendChild(newTr);
    });
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