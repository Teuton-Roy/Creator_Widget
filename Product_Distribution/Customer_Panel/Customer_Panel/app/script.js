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


//getAllRecords according to the {loginUser}
ZOHO.CREATOR.init()
    .then(function(data) {
        var queryParams = ZOHO.CREATOR.UTIL.getInitParams();
        let login = queryParams.loginUser;
        let userName = queryParams.userName;
        console.log("Logged in user:", login);
        console.log("Logged in user:", userName);

        var configMetadata = {
            appName: "product-distribution",        
            reportName: "All_Purchase_Orders",
        }

        // Get all records
        ZOHO.CREATOR.API.getAllRecords(configMetadata)
        .then(function(response) {
            console.log("Sample record structure:", response.data);
            var config = {
                appName: "product-distribution",        
                reportName: "All_Purchase_Orders",
                criteria: `(Email == \"${login}\")`
            }
            
            return ZOHO.CREATOR.API.getAllRecords(config);
        })
        .then(function(response) {
            if (response && response.data) {
                console.log("Filtered records:", response.data);
                displayUserRecords(response.data);
            } else {
                displayNoRecordsMessage();
            }
        })
        .catch(function(error) {
            console.error("Error:", error);
            displayErrorMessage(error);
        });
    });