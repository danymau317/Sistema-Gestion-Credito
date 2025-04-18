export let credits = [
    {
        id: Date.now(),
        client: "Daniel Mauricio Saavedra Gonzalez",
        amount: 20000,
        interest: 10.5,
        time: 12,
        date: '2025-04-15',
        state: 'pagado'
    }
];

export function setCredit(newCredit) {
    const exists = credits.some((credits) => credits.id === newCredit.id);
    if (exists) {
        credits = credits.map((credit) => credit.id === newCredit.id ? newCredit : credit);
    } else {
        credits = [...credits, newCredit];
    }
}

export function deleteCredit(id) {
    credits = credits.filter((credit) => credit.id !== parseInt(id));
}