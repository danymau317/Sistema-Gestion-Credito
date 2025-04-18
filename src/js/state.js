import { renderAll } from "./credit.js";
import { renderStadistics } from "./stats.js";

export let credits = [];

export async function setCredit(newCredit) {
    try {
        let response;
        if (newCredit.id) {
            response = await fetch(`http://127.0.0.1:5000/api/creditos/${newCredit.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCredit),
            });
        } else {
            response = await fetch('http://127.0.0.1:5000/api/creditos', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCredit)
            });
        }

        if (!response.ok) {
            throw new Error('Error al guardar el credito');
        }

        const savedCredit = await response.json();
        console.log('Credito Guardado', savedCredit);
        await fetchCredits();
    } catch (error) {
        console.log(error);
    }
}

export async function deleteCredit(id) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/api/creditos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el crédito');
        }

        console.log('Crédito eliminado');
        renderAll();
    } catch (error) {
        console.error(error);
    }
}

export async function fetchCredits() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/creditos');
        const data = await response.json();
        console.log("Créditos obtenidos desde la API:", data);
        credits = data;
        renderAll();
        renderStadistics();
    } catch (error) {
        console.error('Error al obtener los créditos:', error);
    }
}