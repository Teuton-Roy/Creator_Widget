// ZOHO.CREATOR.init()
//     .then(function (data) {
//         console.log("Initialization successful");

//         updateCounts()
//         fetchRecords()
//         fetchRecords2()
//         fetchChartData()
//         initializeShippingSearch()


//         // First API call for Outward Quantity
//         var config1 = {
//             appName: "product-distribution",
//             reportName: "All_Outward_Quantity",
//         };

//         ZOHO.CREATOR.API.getAllRecords(config1)
//             .then(function (response) {
//                 var record = response.data;
//                 console.log("All Outward Quantity", record);

//                 let total = 0;
//                 record.forEach(item => {
//                     total += parseInt(item.Remaining_Quantity) || 0;
//                 });
//                 document.getElementById("Total_Remaining_Outward").innerText = total;
//             })

//         // Second API call for Warehouses
//         var config2 = {
//             appName: "product-distribution",
//             reportName: "All_Warehouses",
//         };

//         ZOHO.CREATOR.API.getAllRecords(config2)
//             .then(function (response) {
//                 var record = response.data;
//                 console.log("All warehouses", record);

//                 let total = 0;
//                 record.forEach(item => {
//                     total += parseInt(item.Dispatched_Quantity) || 0;
//                 });
//                 document.getElementById("Total_Dispatched_Warehouse").innerText = total;
//             })
//     })

//     function initializeShippingSearch() {
//         const searchInput = document.querySelector('.search-container input');
//         searchInput.addEventListener('input', (e) => {
//             const searchTerm = e.target.value.toLowerCase();
//             searchShippingRecords(searchTerm);
//         });
//     }

//     function searchShippingRecords(searchTerm) {
//         var config = {
//             appName: "product-distribution",
//             reportName: "All_Shippings",
//             criteria: `(Destination1.display_value.toLowerCase().contains("${searchTerm}") || Quantity.toString().contains("${searchTerm}"))`
//         };
    
//         ZOHO.CREATOR.API.getAllRecords(config)
//             .then(function(response) {
//                 if (response.data) {
//                     updateShippingResults(response.data);
//                 } else {
//                     console.error("Error: No data received from All_Shipping.");
//                 }
//             })
//             .catch(function(error) {
//                 console.error("Error searching shipping records:", error);
//             });
//     }






// function updateCounts() {
//     const reports = {
//         "Total_Purchase_Orders": "All_Purchase_Orders",
//         "Total_Shipping": "All_Shippings",
//         "Total_Agencies": "All_Distribution_Agency_Masters",
//         "Total_Manufacturers": "All_Manufacturer_Name_Masters",
//         "Total_Employees": "All_Employee_Name_Masters",
//         "Total_Godowns": "All_Godown_Masters"
//     }

//     Object.entries(reports).forEach(([id, reportName]) => {
//         config3 = {
//             appName: "product-distribution",
//             reportName: reportName
//         }

//         ZOHO.CREATOR.API.getRecordCount(config3)
//             .then(response => {
//                 if (response && response.result && response.result.records_count !== undefined) {
//                     document.getElementById(id).innerText = response.result.records_count;
//                 } else {
//                     document.getElementById(id).innerText = "N/A";
//                 }
//             }).catch(error => {
//                 console.error("Error fetching count for", reportName, error);
//                 document.getElementById(id).innerText = "Error";
//             });
//     })
// }

// function fetchRecords() {
//     var config4 = {
//         appName: "product-distribution",
//         reportName: "All_Purchase_Orders",
//     };

//     ZOHO.CREATOR.API.getAllRecords(config4).then(function (response) {
//         var recordArr = response.data;
//         console.log("All purchase order", recordArr);

//         populateTable(recordArr);
//     });
// }

// function populateTable(records) {
//     const tableBody = document.getElementById("purchaseTableBody");
//     tableBody.innerHTML = "";
//     $(document).ready(function () {
//         $('#table1').DataTable({
//             "paging": true,
//             "searching": true,
//             "ordering": true,
//             "info": true,
//             "lengthMenu": [5, 10, 25, 50]
//         });
//     });

//     records.forEach(record => {

//         const row = document.createElement("tr");
//         row.innerHTML = `
//         <td>${record.Purchase_Order_Number}</td>
//         <td>${record.GSTIN_Number}</td>
//         <td>${record.Manufacturer_Name.display_value}</td>
//         <td>${record.Manufacturer_Email_ID}</td>
//         <td>${record.Item_Name.display_value}</td>
//         <td>${record.Start_Date_of_Manufacturing}</td>
//         <td>${record.End_Date_of_Manufacturing}</td>
//     `;
//         tableBody.appendChild(row);
//     });
// }

// function fetchRecords2() {
//     var config5 = {
//         appName: "product-distribution",
//         reportName: "All_Purchase_Orders",
//     };

//     ZOHO.CREATOR.API.getAllRecords(config5)
//         .then(function (response) {
//             var recordArr = response.data;

//             var currentMonthRecords = recordArr.filter(record =>
//                 isCurrentMonth(record.Start_Date_of_Manufacturing)
//             );
//             populateTable1(currentMonthRecords);
//         });
// }

// function isCurrentMonth(dateString) {
//     if (!dateString) return false;

//     let recordDate = new Date(dateString);
//     let currentDate = new Date();

//     return (recordDate.getFullYear() === currentDate.getFullYear() &&
//         recordDate.getMonth() === currentDate.getMonth());
// }

// function populateTable1(records) {
//     const tableBody = document.getElementById("monthlypurchaseorder");

//     tableBody.innerHTML = "";
//     $(document).ready(function () {
//         $('#table2').DataTable({
//             "paging": true,
//             "searching": true,
//             "ordering": true,
//             "info": true,
//             "lengthMenu": [5, 10, 25, 50]
//         });
//     });
//     records.forEach(record => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>${record.Purchase_Order_Number}</td>
//             <td>${record.GSTIN_Number}</td>
//             <td>${record.Manufacturer_Name.display_value}</td>
//             <td>${record.Manufacturer_Email_ID}</td>
//             <td>${record.Item_Name.display_value}</td>
//             <td>${record.Start_Date_of_Manufacturing}</td>
//             <td>${record.End_Date_of_Manufacturing}</td>
//             `;
//         tableBody.appendChild(row);
//     });
// }

// function fetchChartData() {
//     var config6 = {
//         appName: "product-distribution",
//         reportName: "All_Shippings"
//     };

//     ZOHO.CREATOR.API.getAllRecords(config6)
//         .then(response => {
//             if (response && response.data) {
//                 let shippingData = processChartData(response.data);
//                 updateChart(shippingData);
//             } else {
//                 console.error("Error: No data received from All_Shipping.");
//             }
//         }).catch(error => {
//             console.error("Error fetching shipping data:", error);
//         })
// }

// function processChartData(records) {
//     let shippingMap = {};

//     records.forEach(record => {
//         let destination = record.Destination1.display_value || "Unknown";
//         let quantity = parseInt(record.Quantity) || 0;

//         if (shippingMap[destination]) {
//             shippingMap[destination] += quantity;
//         } else {
//             shippingMap[destination] = quantity;
//         }
//     });

//     return {
//         labels: Object.keys(shippingMap),
//         data: Object.values(shippingMap)
//     };
// }

// let chartInstance = null;

// function updateChart(shippingData) {
//     const ctx = document.getElementById('destinationChart').getContext('2d');

//     if (chartInstance) {
//         chartInstance.destroy();
//     }

//     chartInstance = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: shippingData.labels,
//             datasets: [{
//                 label: 'Quantity Shipped',
//                 data: shippingData.data,
//                 backgroundColor: 'rgba(41, 112, 55, 0.7)',
//                 borderColor: 'rgb(34, 106, 44)',
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     title: {
//                         display: true,
//                         text: 'Quantity'
//                     }
//                 },
//                 x: {
//                     title: {
//                         display: true,
//                         text: 'Destination'
//                     }
//                 }
//             },
//         }
//     });
// }


//-----------------------------
ZOHO.CREATOR.init()
    .then(function (data) {
        console.log("Initialization successful");

        updateCounts();
        fetchRecords();
        fetchRecords2();
        fetchChartData();
        initializeShippingSearch();

        // First API call for Outward Quantity
        var config1 = {
            appName: "product-distribution",
            reportName: "All_Outward_Quantity",
        };

        ZOHO.CREATOR.API.getAllRecords(config1)
            .then(function (response) {
                var record = response.data;
                console.log("All Outward Quantity", record);

                let total = 0;
                record.forEach(item => {
                    total += parseInt(item.Remaining_Quantity) || 0;
                });
                document.getElementById("Total_Remaining_Outward").innerText = total;
            });

        // Second API call for Warehouses
        var config2 = {
            appName: "product-distribution",
            reportName: "All_Warehouses",
        };

        ZOHO.CREATOR.API.getAllRecords(config2)
            .then(function (response) {
                var record = response.data;
                console.log("All warehouses", record);

                let total = 0;
                record.forEach(item => {
                    total += parseInt(item.Dispatched_Quantity) || 0;
                });
                document.getElementById("Total_Dispatched_Warehouse").innerText = total;
            });
    });

function initializeShippingSearch() {
    const searchInput = document.querySelector('.search-container input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        searchShippingRecords(searchTerm);
    });
}

function searchShippingRecords(searchTerm) {
    var config = {
        appName: "product-distribution",
        reportName: "All_Shippings",
        criteria: `(Destination1.display_value.toLowerCase().contains("${searchTerm}") || Quantity.toString().contains("${searchTerm}"))`
    };

    ZOHO.CREATOR.API.getAllRecords(config)
        .then(function(response) {
            if (response.data) {
                updateShippingResults(response.data);
            } else {
                console.error("Error: No data received from All_Shipping.");
            }
        })
        .catch(function(error) {
            console.error("Error searching shipping records:", error);
        });
}

function updateCounts() {
    const reports = {
        "Total_Purchase_Orders": "All_Purchase_Orders",
        "Total_Shipping": "All_Shippings",
        "Total_Agencies": "All_Distribution_Agency_Masters",
        "Total_Manufacturers": "All_Manufacturer_Name_Masters",
        "Total_Employees": "All_Employee_Name_Masters",
        "Total_Godowns": "All_Godown_Masters"
    };

    Object.entries(reports).forEach(([id, reportName]) => {
        config3 = {
            appName: "product-distribution",
            reportName: reportName
        };

        ZOHO.CREATOR.API.getRecordCount(config3)
            .then(response => {
                if (response && response.result && response.result.records_count !== undefined) {
                    document.getElementById(id).innerText = response.result.records_count;
                } else {
                    document.getElementById(id).innerText = "N/A";
                }
            }).catch(error => {
                console.error("Error fetching count for", reportName, error);
                document.getElementById(id).innerText = "Error";
            });
    });
}

// Pagination variables - separate states for each table
let paginationState = {
    allPurchaseOrders: {
        currentPage: 1,
        data: []
    },
    monthlyPurchaseOrders: {
        currentPage: 1,
        data: []
    }
};


const recordsPerPage = 100;

function fetchRecords() {
    var config4 = {
        appName: "product-distribution",
        reportName: "All_Purchase_Orders",
        pageSize: 200
    };

    ZOHO.CREATOR.API.getAllRecords(config4).then(function (response) {
        if (response && response.data) {
            paginationState.allPurchaseOrders.data = response.data;
            console.log("All purchase order", paginationState.allPurchaseOrders.data);
            
            // Check if elements exist before calling displayRecords
            if (document.getElementById('purchaseTableBody') && 
                document.getElementById('allPurchaseOrdersPagination')) {
                displayRecords('allPurchaseOrders', 'purchaseTableBody', 'allPurchaseOrdersPagination');
            } else {
                console.error("Required table elements not found in DOM");
            }
        }
    }).catch(error => {
        console.error("Error fetching records:", error);
    });
}

function displayRecords(stateKey, tableId, paginationId) {
    // Get required elements
    const tableBody = document.getElementById(tableId);
    const paginationElement = document.getElementById(paginationId);

    // Check if elements exist
    if (!tableBody || !paginationElement) {
        console.error(`Required elements not found. TableBody: ${tableId}, Pagination: ${paginationId}`);
        return;
    }

    const state = paginationState[stateKey];
    const records = state.data;
    const start = (state.currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const paginatedRecords = records.slice(start, end);
    const totalPages = Math.ceil(records.length / recordsPerPage);

    // Clear existing content
    tableBody.innerHTML = '';

    // Add records
    paginatedRecords.forEach(record => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.Purchase_Order_Number || ''}</td>
            <td>${record.GSTIN_Number || ''}</td>
            <td>${record.Manufacturer_Name?.display_value || ''}</td>
            <td>${record.Manufacturer_Email_ID || ''}</td>
            <td>${record.Item_Name?.display_value || ''}</td>
            <td>${record.Start_Date_of_Manufacturing || ''}</td>
            <td>${record.End_Date_of_Manufacturing || ''}</td>
        `;
        tableBody.appendChild(row);
    });

    // Update pagination
    paginationElement.innerHTML = `
        <div class="pagination-info">
            Showing ${start + 1} to ${Math.min(end, records.length)} of ${records.length}
        </div>
        <div class="pagination-controls">
            <button 
                onclick="changePage('${stateKey}', '${tableId}', '${paginationId}', ${state.currentPage - 1})"
                ${state.currentPage === 1 ? 'disabled' : ''}>
                Previous
            </button>
            <span class="page-info">Page ${state.currentPage} of ${totalPages}</span>
            <button 
                onclick="changePage('${stateKey}', '${tableId}', '${paginationId}', ${state.currentPage + 1})"
                ${state.currentPage === totalPages ? 'disabled' : ''}>
                Next
            </button>
        </div>
    `;
}

function changePage(stateKey, tableId, paginationId, newPage) {
    const state = paginationState[stateKey];
    const totalPages = Math.ceil(state.data.length / recordsPerPage);
    
    if (newPage >= 1 && newPage <= totalPages) {
        state.currentPage = newPage;
        displayRecords(stateKey, tableId, paginationId);
    }
}

function fetchRecords2() {
    var config5 = {
        appName: "product-distribution",
        reportName: "All_Purchase_Orders",
        pageSize:200
    };

    ZOHO.CREATOR.API.getAllRecords(config5)
        .then(function (response) {
            paginationState.monthlyPurchaseOrders.data = response.data.filter(record =>
                isCurrentMonth(record.Start_Date_of_Manufacturing)
            );
            displayRecords('monthlyPurchaseOrders', 'monthlypurchaseorder', 'monthlyPurchaseOrdersPagination');
        });
}

function isCurrentMonth(dateString) {
    if (!dateString) return false;
    let recordDate = new Date(dateString);
    let currentDate = new Date();
    return (recordDate.getFullYear() === currentDate.getFullYear() &&
        recordDate.getMonth() === currentDate.getMonth());
}

function fetchChartData() {
    var config6 = {
        appName: "product-distribution",
        reportName: "All_Shippings",
    };

    ZOHO.CREATOR.API.getAllRecords(config6)
        .then(response => {
            if (response && response.data) {
                let shippingData = processChartData(response.data);
                updateChart(shippingData);
            } else {
                console.error("Error: No data received from All_Shipping.");
            }
        }).catch(error => {
            console.error("Error fetching shipping data:", error);
        });
}

function processChartData(records) {
    let shippingMap = {};

    records.forEach(record => {
        let destination = record.Destination1.display_value || "Unknown";
        let quantity = parseInt(record.Quantity) || 0;

        if (shippingMap[destination]) {
            shippingMap[destination] += quantity;
        } else {
            shippingMap[destination] = quantity;
        }
    });

    return {
        labels: Object.keys(shippingMap),
        data: Object.values(shippingMap)
    };
}

let chartInstance = null;

function updateChart(shippingData) {
    const ctx = document.getElementById('destinationChart').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: shippingData.labels,
            datasets: [{
                label: 'Quantity Shipped',
                data: shippingData.data,
                backgroundColor: 'rgba(41, 112, 55, 0.7)',
                borderColor: 'rgb(34, 106, 44)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Quantity'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Destination'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Quantity: ${context.parsed.y}`;
                        }
                    }
                }
            }
        }
    });
}
//-----------------------------



















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

