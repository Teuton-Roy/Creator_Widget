## Zoho Creator Wedget

I'll explain the key changes made to fetch more than 200 records. Here's the breakdown:

Original Code (Limited to 200 records)

async function fetchRecords() {
    const config4 = {
        appName: "product-distribution",
        reportName: "All_Purchase_Orders"
    };
    
    const response = await ZOHO.CREATOR.API.getAllRecords(config4);
    // Only fetches first 200 records
}

Copy

Insert at cursor
javascript
New Code with Pagination (Fetches All Records)

async function fetchRecords() {
    const config4 = {
        appName: "product-distribution",
        reportName: "All_Purchase_Orders"
    };

    try {
        let allRecords = []; // Array to store all records
        let page = 1;        // Start with page 1
        let hasMoreRecords = true;

        // Keep fetching while there are more records
        while (hasMoreRecords) {
            const response = await ZOHO.CREATOR.API.getAllRecords({
                ...config4,
                page: page,    // Current page number
                pageSize: 200  // Records per page (max 200)
            });

            if (response && response.data && response.data.length > 0) {
                // Add new records to existing array
                allRecords = [...allRecords, ...response.data];
                console.log(`Fetched ${allRecords.length} records so far...`);
                
                // Check if we need to fetch more
                if (response.data.length < 200) {
                    hasMoreRecords = false; // No more records to fetch
                } else {
                    page++; // Move to next page
                }
            } else {
                hasMoreRecords = false;
            }

            // Add delay to prevent rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        console.log("Total records fetched:", allRecords.length);
        paginationState.allPurchaseOrders.data = allRecords;
        displayRecords('allPurchaseOrders', 'purchaseTableBody', 'allPurchaseOrdersPagination');

    } catch (error) {
        console.error("Error fetching records:", error);
    }
}

Copy

Insert at cursor
javascript
Key Components Explained:

Pagination Variables :

let allRecords = []; // Stores all fetched records
let page = 1;        // Tracks current page
let hasMoreRecords = true; // Controls the fetch loop

Copy

Insert at cursor
javascript
Page Size and Navigation :

const response = await ZOHO.CREATOR.API.getAllRecords({
    ...config4,
    page: page,    // Current page number
    pageSize: 200  // Maximum records per request
});

Copy

Insert at cursor
javascript
Record Accumulation :

allRecords = [...allRecords, ...response.data];

Copy

Insert at cursor
javascript
Check for More Records :

if (response.data.length < 200) {
    hasMoreRecords = false; // Stop if less than 200 records returned
} else {
    page++; // Move to next page
}

Copy

Insert at cursor
javascript
Rate Limiting Protection :

await new Promise(resolve => setTimeout(resolve, 1000));

Copy

Insert at cursor
javascript
The same changes were applied to fetchRecords2() and fetchChartData() functions.

How it Works:

Starts fetching from page 1

Gets 200 records per request

If 200 records received, moves to next page

If less than 200 records received, means we've reached the end

Combines all records into one array

Updates the pagination state with all records

Displays the records in the table

Benefits:

Can fetch unlimited records

Handles rate limiting

Shows progress during fetching

Maintains existing pagination display

Error handling included

Progress logging for debugging

Example Console Output:

Fetched 200 records so far...
Fetched 400 records so far...
Fetched 600 records so far...
Fetched 750 records so far...
Total records fetched: 750

This allows you to fetch and display all records in your application, not just the first 200. The client-side pagination still works the same way, but now it has access to all the records instead of just the first 200.

### ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
