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

    form.addEventListener('submit', async (e) => {
        e.preventDefault();


        const data = {
            id: editingRow ? parseInt(editingRow.getAttribute('data-id')) : null,
            cliente: form.client.value,
            monto: parseFloat(form.amount.value),
            tasa_interes: parseFloat(form.interest.value),
            plazo: parseInt(form.time.value),
            fecha_otorgamiento: form.date.value,
        };

        await setCredit(data);
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
        cliente: cells[1].textContent.trim(),
        monto: parseFloat(cells[2].textContent.replace('$', '')),
        tasa_interes: parseFloat(cells[3].textContent.replace('%', '')),
        plazo: parseInt(cells[4].textContent),
        fecha_otorgamiento: cells[5].textContent.trim(),
    };

    const form = document.querySelector('.credit__form');
    form.client.value = data.cliente;
    form.amount.value = data.monto;
    form.interest.value = data.tasa_interes;
    form.time.value = data.plazo;
    form.date.value = data.fecha_otorgamiento;
    form.classList.add('credit__form--enable');

    editingRow = row;

}

export function renderAll() {
    const tableBody = document.querySelector('.table__body');
    tableBody.innerHTML = '';

    credits.forEach((data, index) => {
        const newTr = document.createElement('tr');
        newTr.setAttribute('data-id', data.id);
        newTr.innerHTML = `
            <td>${index + 1}</td>
            <td>${data.cliente}</td>
            <td>$${data.monto.toFixed(2)}</td>
            <td>${data.tasa_interes.toFixed(2)}%</td>
            <td>${data.plazo} meses</td>
            <td>${data.fecha_otorgamiento}</td>
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
