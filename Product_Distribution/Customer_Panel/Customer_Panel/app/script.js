// First, declare chart variables globally
let quantityChart = null;
let paymentChart = null;

function populateTable(purchaseOrders) {
    try {
        // Get table body reference
        const tbody = document.querySelector('#ordersTable tbody');
        if (!tbody) {
            console.error("Table body element not found!");
            return;
        }

        // Clear existing table content
        tbody.innerHTML = '';

        // Check if we have data
        if (!purchaseOrders || !Array.isArray(purchaseOrders) || purchaseOrders.length === 0) {
            console.log("No purchase orders to display");
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 20px;">
                        No records found
                    </td>
                </tr>`;
            return;
        }

        // Log the data we're working with
        console.log("Populating table with data:", purchaseOrders);

        // Create and append each row
        purchaseOrders.forEach((order, index) => {
            try {
                console.log(`Processing order ${index}:`, order);

                // Create new row
                const row = document.createElement('tr');

                // Get field names from your Zoho Creator form
                const purchaseOrderNumber = order.Purchase_Order_Number || order.purchase_order_number || '-';
                const gstin = order.GSTIN || order.GSTIN_Number || '-';
                const manufacturerName = order.Manufacturer_Name.display_value || order.Manufacturer_Name || '-';
                const manufacturerEmail = order.Manufacturer_Email || order.Manufacturer_Email_ID || '-';
                const itemName = order.Item_Name.display_value || order.Item_Name || '-';
                const startDate = order.Start_Date || order.Start_Date_of_Manufacturing || '-';
                const endDate = order.End_Date || order.End_Date_of_Manufacturing || '-';
                const currrntUser = order.Currrnt_User || order.Added_User || '-';

                // Set row content
                row.innerHTML = `
                    <td>${purchaseOrderNumber}</td>
                    <td>${gstin}</td>
                    <td>${manufacturerName}</td>
                    <td>${manufacturerEmail}</td>
                    <td>${itemName}</td>
                    <td>${formatDate(startDate)}</td>
                    <td>${formatDate(endDate)}</td>
                    <td>${formatDate(currrntUser)}</td>
                `;

                // Add row to table
                tbody.appendChild(row);

                // Log successful row creation
                console.log(`Row ${index} created successfully`);

            } catch (err) {
                console.error(`Error processing order ${index}:`, err);
                console.error('Problem order:', order);
            }
        });

        // Add click event listeners for rows
        const rows = tbody.getElementsByTagName('tr');
        Array.from(rows).forEach(row => {
            row.addEventListener('click', function () {
                // Toggle selected class
                this.classList.toggle('selected');
            });
        });

        // Log completion
        console.log(`Table populated with ${purchaseOrders.length} records`);

    } catch (err) {
        console.error("Error in populateTable:", err);

        // Show error in table
        const tbody = document.querySelector('#ordersTable tbody');
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 20px; color: red;">
                        Error populating table: ${err.message}
                    </td>
                </tr>`;
        }
    }
}

// Helper function to format dates
function formatDate(dateString) {
    if (!dateString || dateString === '-') return '-';

    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; // Return original if invalid date

        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    } catch (err) {
        console.error('Error formatting date:', dateString, err);
        return dateString;
    }
}


ZOHO.CREATOR.init()
    .then(function (data) {
        
        var queryParams = ZOHO.CREATOR.UTIL.getInitParams();
        console.log(queryParams);

        let login = queryParams.loginUser;
        console.log("Logged in user:", login);


        var configMetadata = {
            appName: "product-distribution",
            reportName: "All_Purchase_Orders",
        }

        
        // Get all records
        ZOHO.CREATOR.API.getAllRecords(configMetadata)
            .then(function (response) {
                console.log("Sample record structure:", response.data);

                var config = {
                    appName: "product-distribution",
                    reportName: "All_Purchase_Orders",
                    // criteria: `(Email == \"${login}\")`
                }

                return ZOHO.CREATOR.API.getAllRecords(config);
                // return config
            })
            .then(function (response) {
                console.log(response);

                if (response && response.data && response.data.length > 0) {
                    console.log("Filtered records:", response.data);
                    populateTable(response.data);
                    createCharts(response.data);
                    initializeSearch()
                } else {
                    clearCharts();
                    const tbody = document.querySelector('#ordersTable tbody');
                    tbody.innerHTML = `
                    <tr>
                        <td colspan="7" style="text-align: center; padding: 20px;">No records found</td>
                    </tr>`;
                }
            })
            
            .catch(function (error) {
                console.error("Error:", error);
                clearCharts();
                const tbody = document.querySelector('#ordersTable tbody');
                tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 20px; color: red;">
                        Error loading data: ${error.message}
                    </td>
                </tr>`;
            });
    });

function createCharts(data) {
    createQuantityChart(data);
    createPaymentChart(data);
}


function createQuantityChart(data) {
    try {
        // Get canvas element
        const canvas = document.getElementById('quantityChart');
        if (!canvas) {
            console.error('Quantity chart canvas not found');
            return;
        }
        // Clear any existing chart
        if (quantityChart) {
            quantityChart.destroy();
        }
        // Process data to sum up quantities for each item
        const itemQuantities = {};
        // Log initial data
        console.log("Initial data:", data);
        data.forEach(order => {
            // Check if Item_Name is in display_value format
            const itemName = order.Item_Name.display_value || order.Item_Name || 'Unknown';
            // Ensure we're getting a number for quantity
            const quantity = parseInt(order.Total_Quantity_Allocation) || 0;

            if (itemQuantities[itemName]) {
                itemQuantities[itemName] += quantity;
            } else {
                itemQuantities[itemName] = quantity;
            }
        });

        // Log processed data
        console.log("Processed Item Quantities:", itemQuantities);

        // Prepare chart data
        const labels = Object.keys(itemQuantities);
        const quantities = Object.values(itemQuantities);

        // Log chart data
        console.log("Chart Labels:", labels);
        console.log("Chart Values:", quantities);

        // Create new chart
        quantityChart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Allocated Quantity',
                    data: quantities,
                    borderWidth: 2,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8
                }]
            },
            options: {
                indexAxis: 'y',  // This makes it a horizontal bar chart
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        right: 30,
                        top: 20,
                        bottom: 10
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function (context) {
                                return `Quantity: ${context.parsed.x}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {  // This was previously y
                        beginAtZero: true,
                        grid: {
                            display: true,
                            drawBorder: true,
                            drawOnChartArea: true,
                            drawTicks: true
                        },
                        ticks: {
                            stepSize: 1,
                            font: {
                                size: 12
                            }
                        },
                        title: {
                            display: true,
                            text: 'Total Allocated Quantity',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    },
                    y: {  // This was previously x
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12
                            }
                        },
                        title: {
                            display: true,
                            text: 'Item Name',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        });

        // Log successful creation
        console.log("Chart created successfully");

    } catch (error) {
        console.error('Error creating quantity chart:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
    }
}

function createPaymentChart(data) {
    try {
        // Get canvas element
        const canvas = document.getElementById('paymentChart');
        if (!canvas) {
            console.error('Payment chart canvas not found');
            return;
        }

        // Clear any existing chart
        if (paymentChart) {
            paymentChart.destroy();
        }

        // Process data to sum up quantities and payments for each item
        const chartData = {};

        // Log initial data
        console.log("Initial data for payment chart:", data);

        data.forEach(order => {
            // Get item name, handling possible display_value format
            const itemName = order.Item_Name.display_value || order.Item_Name || 'Unknown';

            // Get quantities and payments, ensure they're numbers
            const allocatedQuantity = parseInt(order.Total_Quantity_Allocation) || 0;
            const remainingPayment = parseFloat(order.Total_Remaining_Payment) || 0;

            if (!chartData[itemName]) {
                chartData[itemName] = {
                    allocatedQuantity: 0,
                    remainingPayment: 0
                };
            }

            chartData[itemName].allocatedQuantity += allocatedQuantity;
            chartData[itemName].remainingPayment += remainingPayment;
        });

        // Log processed data
        console.log("Processed Chart Data:", chartData);

        // Prepare chart data
        const labels = Object.keys(chartData);
        const allocatedQuantities = labels.map(item => chartData[item].allocatedQuantity);
        const remainingPayments = labels.map(item => chartData[item].remainingPayment);

        // Create new chart
        paymentChart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Remaining Payment',
                        data: remainingPayments,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        barPercentage: 0.8,
                        categoryPercentage: 0.9
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        right: 30,
                        top: 20,
                        bottom: 10
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        padding: {
                            top: 10,
                            bottom: 30
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function (context) {
                                if (context.dataset.label === 'Total Allocated Quantity') {
                                    return `Quantity: ${context.parsed.y}`;
                                } else {
                                    return `Payment: ₹${context.parsed.y.toFixed(2)}`;
                                }
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45,
                            font: {
                                size: 12
                            }
                        },
                        title: {
                            display: true,
                            text: 'Item Name',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: true,
                            drawBorder: true,
                            drawOnChartArea: true,
                            drawTicks: true
                        },
                        ticks: {
                            callback: function (value) {
                                return '₹' + value.toLocaleString();
                            },
                            font: {
                                size: 12
                            }
                        },
                        title: {
                            display: true,
                            text: 'Payment',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        });

        // Log successful creation
        console.log("Payment chart created successfully");

    } catch (error) {
        console.error('Error creating payment chart:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
    }
}

// search functionality

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');

    if (!searchInput || !searchBtn) {
        console.error('Search elements not found!');
        return;
    }

    // Add event listener for search button click
    searchBtn.addEventListener('click', performSearch);

    // Add event listener for input changes (real-time search)
    searchInput.addEventListener('input', performSearch);

    // Add event listener for Enter key press
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value.toLowerCase().trim();
    const tbody = document.querySelector('#ordersTable tbody');
    const rows = tbody.getElementsByTagName('tr');

    Array.from(rows).forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchValue) ? '' : 'none';
    });
}




function clearCharts() {
    if (quantityChart) {
        quantityChart.destroy();
        quantityChart = null;
    }

    if (paymentChart) {
        paymentChart.destroy();
        paymentChart = null;
    }
}























//----------------------------------------------------------------------
// // Sample data
// const purchaseOrders = [
//     {
//       orderNumber: 'ORD-611',
//       gstin: '72AAAAA0000A1Z5',
//       manufacturerName: 'PharmaACE',
//       manufacturerEmail: 'pharma.ace@gmail.com',
//       itemName: 'Drugs',
//       startDate: '03-Mar-2025 16:44:05',
//       endDate: '10-Mar-2025 16:44:12'
//     },
//     {
//       orderNumber: 'ORD-610',
//       gstin: '80QWEVG0000A1Z5',
//       manufacturerName: 'Global Logic',
//       manufacturerEmail: 'global.logic@gmail.com',
//       itemName: 'Keyboard',
//       startDate: '21-Feb-2025 00:00:00',
//       endDate: '27-Feb-2025 00:00:00'
//     },
//     {
//       orderNumber: 'ORD-609',
//       gstin: '22AAAAA0000A1Z5',
//       manufacturerName: 'Ficher Manufacturer',
//       manufacturerEmail: 'ficher@gmail.com',
//       itemName: 'Earphone',
//       startDate: '03-Mar-2025 16:21:19',
//       endDate: '14-Mar-2025 16:21:25'
//     }
//   ];

//   // Quantity allocation data
//   const quantityData = {
//     'Drugs': 20,
//     'Keyboard': 2,
//     'Earphone': 2
//   };

//   // Payment data
//   const paymentData = {
//     'Keyboard': 6000,
//     'Drugs': 3000
//   };

//   // Populate table
//   function populateTable() {
//     const tbody = document.querySelector('#ordersTable tbody');
//     tbody.innerHTML = '';

//     purchaseOrders.forEach(order => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td>${order.orderNumber}</td>
//         <td>${order.gstin}</td>
//         <td>${order.manufacturerName}</td>
//         <td>${order.manufacturerEmail}</td>
//         <td>${order.itemName}</td>
//         <td>${order.startDate}</td>
//         <td>${order.endDate}</td>
//       `;
//       tbody.appendChild(row);
//     });
//   }

//   // Create quantity allocation chart
//   function createQuantityChart() {
//     const chartContainer = document.getElementById('quantityChart');
//     chartContainer.innerHTML = ''; // Clear previous content

//     const maxQuantity = Math.max(...Object.values(quantityData));
//     const chartHeight = 200;
//     const chartWidth = chartContainer.clientWidth;
//     const margin = { top: 30, right: 20, bottom: 30, left: 100 };
//     const width = chartWidth - margin.left - margin.right;
//     const height = chartHeight - margin.top - margin.bottom;

//     // Create chart title
//     const title = document.createElement('div');
//     title.className = 'chart-title';
//     title.textContent = 'Total Quantity Allocation';
//     chartContainer.appendChild(title);

//     const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//     svg.setAttribute('width', chartWidth);
//     svg.setAttribute('height', chartHeight);

//     const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
//     g.setAttribute('transform', `translate(${margin.left},${margin.top})`);
//     svg.appendChild(g);

//     // Create x-axis
//     const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'g');
//     xAxis.setAttribute('transform', `translate(0,${height})`);

//     // Add x-axis labels
//     for (let i = 0; i <= maxQuantity; i += 5) {
//       const x = (i / maxQuantity) * width;
//       const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
//       label.textContent = i;
//       label.setAttribute('x', x);
//       label.setAttribute('y', 20);
//       label.setAttribute('text-anchor', 'middle');
//       label.setAttribute('fill', '#666');
//       label.setAttribute('font-size', '12px');
//       xAxis.appendChild(label);

//       // Add grid line
//       const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//       line.setAttribute('x1', x);
//       line.setAttribute('x2', x);
//       line.setAttribute('y1', 0);
//       line.setAttribute('y2', height);
//       line.setAttribute('stroke', '#eee');
//       line.setAttribute('stroke-width', '1');
//       g.appendChild(line);
//     }
//     g.appendChild(xAxis);

//     // Create bars
//     const barHeight = 30;
//     const barGap = 20;
//     const items = Object.entries(quantityData);

//     items.reverse().forEach(([item, quantity], index) => {
//       const y = index * (barHeight + barGap);
//       const barWidth = (quantity / maxQuantity) * width;

//       // Add item label
//       const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
//       label.textContent = item;
//       label.setAttribute('x', -10);
//       label.setAttribute('y', y + barHeight / 2 + 5);
//       label.setAttribute('text-anchor', 'end');
//       label.setAttribute('fill', '#333');
//       label.setAttribute('font-size', '14px');
//       g.appendChild(label);

//       // Add bar
//       const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
//       bar.setAttribute('x', 0);
//       bar.setAttribute('y', y);
//       bar.setAttribute('width', barWidth);
//       bar.setAttribute('height', barHeight);
//       bar.setAttribute('class', 'bar');
//       g.appendChild(bar);
//     });

//     chartContainer.appendChild(svg);
//   }

//   // Create payment chart
//   function createPaymentChart() {
//     const chartContainer = document.getElementById('paymentChart');
//     chartContainer.innerHTML = ''; // Clear previous content

//     const maxPayment = Math.max(...Object.values(paymentData));
//     const chartHeight = 200;
//     const chartWidth = chartContainer.clientWidth;
//     const margin = { top: 30, right: 20, bottom: 40, left: 60 };
//     const width = chartWidth - margin.left - margin.right;
//     const height = chartHeight - margin.top - margin.bottom;

//     // Create chart title
//     const title = document.createElement('div');
//     title.className = 'chart-title';
//     title.textContent = 'Total Remaining Payment';
//     chartContainer.appendChild(title);

//     const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//     svg.setAttribute('width', chartWidth);
//     svg.setAttribute('height', chartHeight);

//     const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
//     g.setAttribute('transform', `translate(${margin.left},${margin.top})`);
//     svg.appendChild(g);

//     // Create y-axis grid lines and labels
//     const yAxisSteps = [0, 2000, 4000, 6000];
//     yAxisSteps.forEach(value => {
//       const y = height * (1 - value / maxPayment);

//       // Add grid line
//       const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//       line.setAttribute('x1', 0);
//       line.setAttribute('x2', width);
//       line.setAttribute('y1', y);
//       line.setAttribute('y2', y);
//       line.setAttribute('stroke', '#eee');
//       line.setAttribute('stroke-width', '1');
//       g.appendChild(line);

//       // Add y-axis label
//       const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
//       label.textContent = value.toLocaleString();
//       label.setAttribute('x', -10);
//       label.setAttribute('y', y);
//       label.setAttribute('dy', '0.32em');
//       label.setAttribute('text-anchor', 'end');
//       label.setAttribute('fill', '#666');
//       label.setAttribute('font-size', '12px');
//       g.appendChild(label);
//     });

//     // Create bars
//     const barWidth = 60;
//     const items = Object.entries(paymentData);

//     items.forEach(([item, payment], index) => {
//       const x = index * (width / (items.length - 0.5)) + barWidth;
//       const barHeight = (payment / maxPayment) * height;

//       // Add bar
//       const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
//       bar.setAttribute('x', x - barWidth / 2);
//       bar.setAttribute('y', height - barHeight);
//       bar.setAttribute('width', barWidth);
//       bar.setAttribute('height', barHeight);
//       bar.setAttribute('class', 'bar-payment');
//       g.appendChild(bar);

//       // Add x-axis label
//       const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
//       label.textContent = index === 0 ? '2' : '20';
//       label.setAttribute('x', x);
//       label.setAttribute('y', height + 25);
//       label.setAttribute('text-anchor', 'middle');
//       label.setAttribute('fill', '#666');
//       label.setAttribute('font-size', '12px');
//       g.appendChild(label);
//     });

//     chartContainer.appendChild(svg);
//   }

//   // Initialize the dashboard
//   function initDashboard() {
//     populateTable();
//     createQuantityChart();
//     createPaymentChart();

//     // Add search functionality
//     const searchInput = document.getElementById('searchInput');
//     const searchBtn = document.querySelector('.search-btn');

//     searchBtn.addEventListener('click', () => {
//       const searchValue = searchInput.value.toLowerCase();
//       const filteredRows = document.querySelectorAll('#ordersTable tbody tr');

//       filteredRows.forEach(row => {
//         const text = row.textContent.toLowerCase();
//         row.style.display = text.includes(searchValue) ? '' : 'none';
//       });
//     });
//   }

//   // Initialize when the page loads
//   document.addEventListener('DOMContentLoaded', initDashboard);

