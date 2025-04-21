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

        const cliente = form.client.value;
        const clienteInput = form.client;

        if (!/^[a-zA-Z\s]{3,}$/.test(cliente.trim())) {
            alert('El nombre del cliente solo debera contener al menos 3 letras y solo letras');
            clienteInput.classList.add('form__input-text--error');
            clienteInput.focus();
            return;
        }

        clienteInput.classList.remove('form__input-text--error');

        const monto = parseFloat(form.amount.value);
        const montoInput = form.amount;
        if (monto <= 0) {
            alert('El monto debe de ser mayor a 0');
            montoInput.classList.add('form__input-text--error');
            montoInput.focus();
            return;
        }

        montoInput.classList.remove('form__input-text--error');

        const tasa_interes = parseFloat(form.interest.value);
        const tasa_interesInput = form.interest;

        if (tasa_interes < 0 || tasa_interes > 100) {
            alert('La tasa de interes debe ser un porcentaje valido entre 0 y 100');
            tasa_interesInput.classList.add('form__input-text--error');
            tasa_interesInput.focus();
            return;
        }

        tasa_interesInput.classList.remove('form__input-text--error');

        const plazo = parseInt(form.time.value);
        const plazoInput = form.time;
        if (plazo < 1 || plazo > 360) {
            alert('El plazo debera de ser de 1 a 360 meses');
            plazoInput.classList.add('form__input-text--error');
            plazoInput.focus();
            return;
        }

        plazoInput.classList.remove('form__input-text--error');

        const fecha_otorgamiento = new Date(form.date.value);
        const fecha_otorgamientoInput = form.date;
        const fechaHoy = new Date();

        fechaHoy.setHours(0, 0, 0, 0);
        if (fecha_otorgamiento > fechaHoy) {
            alert('La fecha de expedicion no puede ser en el futuro');
            fecha_otorgamientoInput.classList.add('form__input-text--error');
            fecha_otorgamientoInput.focus();
            return;
        }

        if (isNaN(fecha_otorgamiento.getTime())) {
            alert('fecha invalida');
            return;
        }

        fecha_otorgamientoInput.remove('form__input-text--error');

        const data = {
            id: editingRow ? parseInt(editingRow.getAttribute('data-id')) : null,
            cliente,
            monto,
            tasa_interes,
            plazo,
            fecha_otorgamiento,
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
