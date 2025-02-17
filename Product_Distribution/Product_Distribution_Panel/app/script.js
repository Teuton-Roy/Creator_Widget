console.log("Hello Word");

ZOHO.CREATOR.init().then(function(data){
    // fetchRecords();
    // updateCounts();
    // fetchChartData();

    var config1 = {
        appName : "product-distribution",
        formName : "All_Outward_Quantity",
        page: 1,
        pageSize: 200
    }

    ZOHO.CREATOR.API.getAllRecords(config1).then(function(response){
        var record = response.data
        a = 0
        record.forEach(data =>{
            a = a + parseInt(data.Remaining_Quantity)
        })
        document.getElementById("Total_Remaining_Outward").innerText = a
    })

    var config2 = {
        appName : "product-distribution",
        formName : "All_Warehouses",
        page: 1,
        pageSize: 200
    }

    ZOHO.CREATOR.API.getAllRecords(config2).then(function(response){
        var record = response.data
        a = 0
        record.forEach(data2 =>{
            a = a + parseInt(data2.Dispatched_Quantity)
        })
        document.getElementById("Total_Dispatched_Warehouse").innerText = a
    })
})






// const destinationData = {
//     labels: ['Siliguri', 'Pune', 'Kolkata', 'Bangalore','Shillong'],
//     data: [150, 40, 30, 45, 220]
// };

// const purchaseOrdersData = [
//     { number: 'ORD-5', gstn: '07ACZPX9228B1Z5', manufacturer: 'Fisher Manufacturer', item: 'Laptop' },
//     { number: 'ORD-4', gstn: '07ACZPX9228B1Z5', manufacturer: 'PharmaACE', item: 'Drugs' },
//     { number: 'ORD-3', gstn: '22AAFCP8765Z1', manufacturer: 'Global Logic', item: 'Alcohol' },
//     { number: 'ORD-2', gstn: '22AAAA1234A1Z5', manufacturer: 'Fisher Manufacturer', item: 'Keyboard' },
//     { number: 'ORD-1', gstn: '22AAAA1234A1Z5', manufacturer: 'Fisher Manufacturer', item: 'Keyboard' }
// ];

// console.log(destinationData);

// //Render bar chart
// // function renderBarChart() {
// //     const chartContainer = document.getElementById('destinationChart')
// //     const maxQuantity = Math.max(...destinationData.map(item => item.quantity))

// //     destinationData.forEach(data =>{
// //         const row = document.createElement('div')
// //         row.className = 'bar-row'

// //         const label = document.createElement('div')
// //         label.className = 'bar-label'
// //         label.textContent = data.city

// //         const bar = document.createElement('div')
// //         bar.className = 'bar'
// //         bar.style.width = `${(data.quantity / maxQuantity)*60}%`

// //         row.appendChild(label)
// //         row.appendChild(bar)
// //         chartContainer.appendChild(row)
// //     });
// // }

// function initializeChart() {
//     const ctx = document.getElementById('destinationChart').getContext('2d');
//     new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: destinationData.labels,
//             datasets: [{
//                 label: 'Quantity',
//                 data: destinationData.data,
//                 backgroundColor: '#8FBC8F',
//                 borderColor: '#556B2F',
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             },
//             plugins: {
//                 tooltip: {
//                     callbacks: {
//                         label: function(context) {
//                             return `Quantity: ${context.parsed.y}`;
//                         },
//                         title: function(context) {
//                             return context[0].label;
//                         }
//                     }
//                 }
//             },
//             interaction: {
//                 intersect: false,
//                 mode: 'index'
//             }
//         }
//     });
// }


// console.log(initializeChart);

// function renderTable(tableId, data){
//     const tbody = document.querySelector(`#${tableId} tbody`);
//     data.forEach( row=>{
//         const tr = document.createElement('tr')
//         tr.innerHTML= `
//         <td> ${row.number}</td>
//         <td> ${row.gstn}</td>
//         <td> ${row.manufacturer}</td>
//         <td> ${row.item}</td>
//         `;
//         tbody.appendChild(tr)
//     });
// }

// document.addEventListener('DOMContentLoaded', () => {
//     // renderBarChart();
//     initializeChart();
//     renderTable('allPurchaseOrders', purchaseOrdersData);
//     renderTable('monthlyPurchaseOrders', purchaseOrdersData.slice(0, 2));
// });

