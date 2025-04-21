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
    averageMount.textContent = average.toFixed(1);

    renderChart({ total, totalAmount, average });
}

let statsChart;

export function renderChart(stats) {
    const ctx = document.getElementById('statsChart').getContext('2d');

    if (statsChart) {
        statsChart.destroy();
    }

    statsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Créditos', 'Monto Total', 'Monto Promedio'],
            datasets: [{
                label: 'Estadísticas',
                data: [stats.total, stats.totalAmount, stats.average],
                backgroundColor: ['#4c6ef5', '#82c91e', '#f59f00'],
                borderRadius: 8,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y;
                            return `${label}: $${value.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}