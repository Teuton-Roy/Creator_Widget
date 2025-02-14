console.log("Hello Word");

const destinationData = [
    {city:'Siliguri', quantity:150},
    {city:'Pune', quantity:40},
    {city:'Kolkata', quantity:30},
    {city:'Shillong', quantity:220},
    {city:'Bangalore', quantity:100}
];

const purchaseOrdersData = [
    { number: 'ORD-5', gstn: '07ACZPX9228B1Z5', manufacturer: 'Fisher Manufacturer', item: 'Laptop' },
    { number: 'ORD-4', gstn: '07ACZPX9228B1Z5', manufacturer: 'PharmaACE', item: 'Drugs' },
    { number: 'ORD-3', gstn: '22AAFCP8765Z1', manufacturer: 'Global Logic', item: 'Alcohol' },
    { number: 'ORD-2', gstn: '22AAAA1234A1Z5', manufacturer: 'Fisher Manufacturer', item: 'Keyboard' },
    { number: 'ORD-1', gstn: '22AAAA1234A1Z5', manufacturer: 'Fisher Manufacturer', item: 'Keyboard' }
];

console.log(destinationData);

//Render bar chart
function renderBarChart() {
    const chartContainer = document.getElementById('destinationChart')
    const maxQuantity = Math.max(...destinationData.map(item => item.quantity))

    destinationData.forEach(data =>{
        const row = document.createElement('div')
        row.className = 'bar-row'

        const label = document.createElement('div')
        label.className = 'bar-label'
        label.textContent = data.city

        const bar = document.createElement('div')
        bar.className = 'bar'
        bar.style.width = `${(data.quantity / maxQuantity)*60}%`

        row.appendChild(label)
        row.appendChild(bar)
        chartContainer.appendChild(row)
    });
}

// console.log(renderBarChart);

function renderTable(tableId, data){
    const tbody = document.querySelector(`#${tableId} tbody`);
    data.forEach( row=>{
        const tr = document.createElement('tr')
        tr.innerHTML= `
        <td> ${row.number}</td>
        <td> ${row.gstn}</td>
        <td> ${row.manufacturer}</td>
        <td> ${row.item}</td>
        `;
        tbody.appendChild(tr)
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderBarChart();
    renderTable('allPurchaseOrders', purchaseOrdersData);
    renderTable('monthlyPurchaseOrders', purchaseOrdersData.slice(0, 2));
});




// const destinationData = [
//     { city: 'Silguri', quantity: 220 },
//     { city: 'Pune', quantity: 40 },
//     { city: 'Kolkata', quantity: 30 },
//     { city: 'Bangalore', quantity: 65 }
// ];

// const purchaseOrdersData = [
//     { number: 'ORD-5', gstn: '07ACZPX9228B1Z5', manufacturer: 'Fisher Manufacturer', item: 'Laptop' },
//     { number: 'ORD-4', gstn: '07ACZPX9228B1Z5', manufacturer: 'PharmaACE', item: 'Drugs' },
//     { number: 'ORD-3', gstn: '22AAFCP8765Z1', manufacturer: 'Global Logic', item: 'Alcohol' },
//     { number: 'ORD-2', gstn: '22AAAA1234A1Z5', manufacturer: 'Fisher Manufacturer', item: 'Keyboard' },
//     { number: 'ORD-1', gstn: '22AAAA1234A1Z5', manufacturer: 'Fisher Manufacturer', item: 'Keyboard' }
// ];

// // Render bar chart
// function renderBarChart() {
//     const chartContainer = document.getElementById('destinationChart');
//     const maxQuantity = Math.max(...destinationData.map(d => d.quantity));

//     destinationData.forEach(data => {
//         const row = document.createElement('div');
//         row.className = 'bar-row';

//         const label = document.createElement('div');
//         label.className = 'bar-label';
//         label.textContent = data.city;

//         const bar = document.createElement('div');
//         bar.className = 'bar';
//         bar.style.width = `${(data.quantity / maxQuantity) * 60}%`;

//         row.appendChild(label);
//         row.appendChild(bar);
//         chartContainer.appendChild(row);
//     });
// }

// // Render tables
// function renderTable(tableId, data) {
//     const tbody = document.querySelector(`#${tableId} tbody`);
//     data.forEach(row => {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//             <td>${row.number}</td>
//             <td>${row.gstn}</td>
//             <td>${row.manufacturer}</td>
//             <td>${row.item}</td>
//         `;
//         tbody.appendChild(tr);
//     });
// }

// Initialize
