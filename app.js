const express = require('express');
const bodyParser = require('body-parser');
//const mysql = require('mysql2'); 
const sql = require('mssql'); // Import the mssql module
const app = express();
const PORT = process.env.PORT || 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Variable to store the latest webhook data
let latestWebhookData = {};

/** 
const db = mysql.createConnection({
    host: 'localhost', // e.g., 'localhost' or your database IP
    user: 'root', // e.g., 'root'
    password: 'Golden@1010#',
    database: 'webhook_data', // e.g., 'webhook_data'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});
*/


// Handle Xola webhook
app.post('/webhook', async(req, res) => {
    console.log('Webhook received:');
   console.log(req.body); // Log the entire webhook payload
   console.log(JSON.stringify(req.body, null, 2));

    // Store the received data
    latestWebhookData = {
        eventName: req.body.eventName ?? null,
        id: req.body.data.id ?? null,
        paymentMethod: req.body.data.adjustments[0]?.meta?.payment?.method ?? null,
        customerName: req.body.data.customerName ?? null,
        currency: req.body.data.items[0]?.currency ?? null,
        customerEmail: req.body.data.customerEmail ?? null,
        phone: req.body.data.phone ?? null,
        amount: req.body.data.amount ?? null,
        createdAt: req.body.data.items[0]?.arrivalDatetime ?? null,
        Experience: req.body.data.items[0]?.name ?? null,
        Notes: req.body.data.notes[0]?.text ?? null,
        Addons1: req.body.data.items[0]?.addOns[0]?.configuration?.name ?? null,
        Addons2: req.body.data.items[0]?.addOns[1]?.configuration?.name ?? null,
        AddonsPrice: req.body.data.items[0]?.addOns[0]?.configuration?.price ?? null,
        Addons2Price: req.body.data.items[0]?.addOns[1]?.configuration?.price ?? null,
        // Add guest quantity if necessary (assuming it's in the webhook)
    };
    console.log('Stored webhook data:', latestWebhookData);

    if (latestWebhookData.eventName === 'order.create') {
        // Insert data into SQL Server when a new order is created
     //  await insertData(latestWebhookData)
      // res.status(200).send('Webhook received and data inserted');

      //  await insertData2(latestWebhookData)
     //   res.status(200).send('Webhook received and data inserted 2 ');

     await insertData3(latestWebhookData)
    res.status(200).send('Webhook received and data inserted in jennys database');

    /**

    if (latestWebhookData.eventName === 'order.create') {
    // Insert the latest webhook data into the MySQL database
    const query = `
        INSERT INTO webhook_data (event_name, id, payment_method, customer_name, currency, customer_email, phone, amount, created_at, experience) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        latestWebhookData.eventName,
        latestWebhookData.id,
        latestWebhookData.paymentMethod,
        latestWebhookData.customerName,
        latestWebhookData.currency,
        latestWebhookData.customerEmail,
        latestWebhookData.phone,
        latestWebhookData.amount,
        latestWebhookData.createdAt,
        latestWebhookData.Experience,
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).send('Error inserting data');
        }
        console.log('Data inserted into MySQL:', result.insertId);
        res.status(200).send('Webhook received');
    
         // Respond with 200 OK to acknowledge receipt of the webhook

    });
}
else if (latestWebhookData.eventName === 'order.update') {

     // First, fetch the existing record for the given id
     const fetchQuery = `SELECT * FROM webhook_data WHERE id = ?`;

     db.query(fetchQuery, [latestWebhookData.id], (err, rows) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.status(500).send('Error fetching data');
        }
        if (rows.length === 0) {
            return res.status(404).send('Order not found for update');
        }
    // Update existing record for order.update
        const updateQuery = `
        UPDATE webhook_data
        SET event_name = ?, payment_method = ?, customer_name = ?, currency = ?, customer_email = ?, phone = ?, amount = ?, created_at = ?, experience = ?
        WHERE id = ?
        `;
    const updateValues = [
        latestWebhookData.eventName,
        latestWebhookData.paymentMethod,
        latestWebhookData.customerName,
        latestWebhookData.currency,
        latestWebhookData.customerEmail,
        latestWebhookData.phone,
        latestWebhookData.amount,
        latestWebhookData.createdAt,
        latestWebhookData.Experience,
        latestWebhookData.id,
    ];

    db.query(updateQuery, updateValues, (err, result) => {
        if (err) {
            console.error('Error updating data in MySQL:', err);
            return res.status(500).send('Error updating data');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Order not found for update');
        }
        console.log('Data updated in MySQL:', result.affectedRows);
        return res.status(200).send('Order updated successfully');
    });
});

} else if (latestWebhookData.eventName === 'order.cancel') {
    // First, fetch the existing record for the given id
    const fetchQuery = `SELECT * FROM webhook_data WHERE id = ?`;

    db.query(fetchQuery, [latestWebhookData.id], (err, rows) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.status(500).send('Error fetching data');
        }
        if (rows.length === 0) {
            return res.status(404).send('Order not found for cancellation');
        }
   
    const deleteQuery = `
        DELETE FROM webhook_data WHERE id = ?
    `;

    db.query(deleteQuery, [latestWebhookData.id], (err, result) => {
        if (err) {
            console.error('Error deleting data from MySQL:', err);
            return res.status(500).send('Error deleting data');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Order not found for deletion');
        }
        console.log('Data deleted from MySQL:', result.affectedRows);
        return res.status(200).send('Order canceled and data deleted');
    });
});

    } else {
    return res.status(400).send('Unsupported event type');
    }
  */
}
else if(latestWebhookData.eventName === 'order.update') {
    // Insert data into SQL Server when a new order is created
    await updateDataById(latestWebhookData.id, latestWebhookData)
    res.status(200).send('Webhook received and data inserted');

}
    });

async function insertData(latestWebhookData) { // Accept booking as a parameter
        try {
            // Database configuration
            const config = {
                user: 'Prabin', // Replace with your SQL Server username
                password: 'T00664996@mytru.ca', // Replace with your SQL Server password
                server: 'siralex.database.windows.net', // Replace with your server name
                database: 'cpaws-sql-test', // Replace with your database name
                options: {
                    encrypt: true, // Use encryption if needed
                    trustServerCertificate: true, // Change this as per your setup
                },
            };
    
            // Connect to the database
            await sql.connect(config);
            const request = new sql.Request();
    
            // Step 1: Query the maximum ID from the table
            const maxIdResult = await request.query('SELECT MAX(ID) AS maxId FROM Xolas');
            const maxId = maxIdResult.recordset[0].maxId || 0; // If no records, maxId will be 0
    
            // Step 2: Increment the ID by 1
            const newId = maxId + 1;
    
            // Step 3: Insert the new data with the incremented ID
            const insertQuery = `
              INSERT INTO Xolas 
              (ID, XolaBookingID, EventName, PaymentMethod, CustomerName, Currency, CustomerEmail, Phone, Amount, CreatedAt, Experience) 
              VALUES 
              (@ID, @XolaBookingID, @EventName, @PaymentMethod, @CustomerName, @Currency, @CustomerEmail, @Phone, @Amount, @CreatedAt, @Experience)
            `;
    
            // Set the input parameters
            request.input('ID', sql.Int, newId);
            request.input('XolaBookingID', sql.NVarChar(510), latestWebhookData.id);
            request.input('EventName', sql.NVarChar(510), latestWebhookData.eventName);
            request.input('PaymentMethod', sql.NVarChar(510), latestWebhookData.paymentMethod);
            request.input('CustomerName', sql.NVarChar(510), latestWebhookData.customerName);
            request.input('Currency', sql.NVarChar(510), latestWebhookData.currency);
            request.input('CustomerEmail', sql.NVarChar(510), latestWebhookData.customerEmail);
            request.input('Phone', sql.NVarChar(510), latestWebhookData.phone);
            request.input('Amount', sql.Float, latestWebhookData.amount);
            request.input('CreatedAt', sql.DateTime2, latestWebhookData.createdAt);
            request.input('Experience', sql.NVarChar(510), latestWebhookData.Experience);
    
            // Execute the insert query
            const result = await request.query(insertQuery);
    
            console.log('Data inserted successfully:', result);
        } catch (err) {
            console.error('Error inserting data:', err);
        }
    }

async function insertData3(latestWebhookData) { // Accept booking as a parameter
        try {
            // Database configuration
            const config = {
                user: 'cpawssadb', // Replace with your SQL Server username
                password: 'cpaws@edu24', // Replace with your SQL Server password
                server: '264.90.150.233', // Replace with your server name
                database: 'cpawsdb',
                port: 5432, // Replace with your database name
                options: {
                    encrypt: false, // Use encryption if needed
                    trustServerCertificate: false, // Change this as per your setup
                },
            };
    
            // Connect to the database
            await sql.connect(config);
            const request = new sql.Request();
    
            // Step 1: Query the maximum ID from the table
            const maxIdResult = await request.query('SELECT MAX(ID) AS maxId FROM ProgramDelivered');
            const maxId = maxIdResult.recordset[0].maxId || 0; // If no records, maxId will be 0
    
            // Step 2: Increment the ID by 1
            const newId = maxId + 1;
    
            // Step 3: Insert the new data with the incremented ID
            const insertQuery = `
              INSERT INTO ProgramDelivered 
              (customerEmail, customerName, customerPhone, hikingAddOns, hikingLocation, ID, Notes, programAmount, programName, CreatedAt) 
              VALUES 
              (@Email, @name, @phone, @addon1, @addon2, @ID, @notes, @amount, @programName, @CreatedAt)
            `;
    
            // Set the input parameters
            request.input('ID', sql.Int, newId);
            request.input('Email', sql.VarChar(510), latestWebhookData.customerEmail);
            request.input('name', sql.VarChar(510), latestWebhookData.customerName);
            
            request.input('addon1', sql.VarChar(510), latestWebhookData.Addons1);
            request.input('addon2', sql.NVarChar(510), latestWebhookData.Addons2);
            request.input('notes', sql.NVarChar(510), latestWebhookData.Notes);
            request.input('phone', sql.NVarChar(510), latestWebhookData.phone);
            request.input('amount', sql.Float, latestWebhookData.amount);
            request.input('CreatedAt', sql.DateTime2, latestWebhookData.createdAt);
            request.input('programName', sql.VarChar(50), latestWebhookData.Experience);
           
    
            // Execute the insert query
            const result = await request.query(insertQuery);
    
            console.log('Data inserted successfully: in jennys database', result);
        } catch (err) {
            console.error('Error inserting data: in jennys database', err);
        }
    }
    
async function insertData2(latestWebhookData) { // Accept booking as a parameter
        try {
            // Database configuration
            const config = {
                user: 'Prabin', // Replace with your SQL Server username
                password: 'T00664996@mytru.ca', // Replace with your SQL Server password
                server: 'siralex.database.windows.net', // Replace with your server name
                database: 'cpaws-sql-test', // Replace with your database name
                options: {
                    encrypt: true, // Use encryption if needed
                    trustServerCertificate: true, // Change this as per your setup
                },
            };
    
            // Connect to the database
            await sql.connect(config);
            const request = new sql.Request();
    
            // for Teachers
            const maxIdResult = await request.query('SELECT MAX(ID) AS maxId FROM Teachers');
            const maxId = maxIdResult.recordset[0].maxId || 0; // If no records, maxId will be 0
            const newId = maxId + 1;
            const nameParts = latestWebhookData.customerName.split(" ");
            const fname = nameParts[0];
            const lname = nameParts[1];
            let date_created = new Date().toISOString().slice(0, 19).replace('T', ' ');
            //For Billing
            // Step 1: Query the maximum ID from the table
            const maxBillIDResult = await request.query('SELECT MAX(ID) AS maxBillId FROM Billing');
            const maxBillId = maxBillIDResult.recordset[0].maxBillId || 0; // If no records, maxId will be 0
            const newBillId = maxBillId + 1;


            
            const insertQuery = `
              INSERT INTO Teachers 
              (ID, LastName, FirstName, TitleID, Email, DateCreated, Dateupdated, IsDeleted) 
              VALUES 
              (@ID, @LastName, @FirstName, Null, @Email, @Datecreated, Null, Null)
            `;
            
            //const totalAmt = latestWebhookData.AddonsPrice + latestWebhookData.Addons2Price + latestWebhookData.amount;
            const BillingInsert = `
            INSERT INTO Billing
            (ID, DateInvoiceSent, Cost, InvoiceNumber, Paid, DateCreated, DateUpdated, IsDeleted)
            VALUES
            (@BillID, NULL, @cost, NULL, NULL, @Datecreated, NULL, NULL)`

           
            // Set the input parameters
            request.input('ID', sql.Int, newId);
            request.input('LastName', sql.NVarChar(50), lname);
            request.input('FirstName', sql.NVarChar(50), fname);
            request.input('Email', sql.NVarChar(50), latestWebhookData.customerEmail);
            request.input('Datecreated', sql.DateTime2(7), date_created);

            //Billing
            request.input('BillID', sql.Int, newBillId);
            request.input('cost', sql.Float, latestWebhookData.amount);
    
            // Execute the insert query
            const result = await request.query(insertQuery);
            const result1 = await request.query(BillingInsert);
    
            console.log('Data inserted successfully 2:', result);
            console.log('Billing Data inserted successfully 2:', result1);
        } catch (err) {
            console.error('Error inserting data:', err);
        }
    }
    

    // update sql query

    async function updateDataById(id, updatedData) {
        try {
            // Database configuration
            const config = {
                user: 'Prabin', 
                password: 'T00664996@mytru.ca', 
                server: 'siralex.database.windows.net',
                database: 'cpaws-sql-test', 
                options: {
                    encrypt: true, // Use encryption if needed
                    trustServerCertificate: true, // Change this as per your setup
                },
            };
    
            // Connect to the database
            await sql.connect(config);
    
            const request = new sql.Request();
    
            // Step 1: Check if the record with the given ID exists
            const selectQuery = `SELECT * FROM Xolas WHERE XolaBookingID = @XolaBookingID`;
            request.input('XolaBookingID', sql.NVarChar(510), updatedData.id);
            const selectResult = await request.query(selectQuery);
    
            if (selectResult.recordset.length === 0) {
                console.log(`No record found with ID: ${updatedData.id}`);
                return;
            }
    
            // Step 2: Update the record with the new data
            const updateQuery = `
                UPDATE Xolas
                SET EventName = @EventName,
                    PaymentMethod = @PaymentMethod,
                    CustomerName = @CustomerName,
                    Currency = @Currency,
                    CustomerEmail = @CustomerEmail,
                    Phone = @Phone,
                    Amount = @Amount,
                    CreatedAt = @CreatedAt,
                    Experience = @Experience
                WHERE XolaBookingID = @XolaBookingID
            `;
            request.input('EventName', sql.NVarChar(510), updatedData.eventName);
            request.input('PaymentMethod', sql.NVarChar(510), updatedData.paymentMethod);
            request.input('CustomerName', sql.NVarChar(510), updatedData.customerName);
            request.input('Currency', sql.NVarChar(510), updatedData.currency);
            request.input('CustomerEmail', sql.NVarChar(510), updatedData.customerEmail);
            request.input('Phone', sql.NVarChar(510), updatedData.phone);
            request.input('Amount', sql.Float, updatedData.amount);
            request.input('CreatedAt', sql.DateTime2, updatedData.createdAt);
            request.input('Experience', sql.NVarChar(510), updatedData.Experience);
    
            // Execute the update query
            const updateResult = await request.query(updateQuery);
    
            console.log(`Record with ID: ${updatedData.id} updated successfully`);
        } catch (err) {
            console.error('Error updating data:', err);
        }
    }
    
// Handle GET request to the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the webhook geda!');
});

// Route to display the latest webhook data
app.get('/latest', (req, res) => {
    res.send(`
        <h1>Latest Webhook Data</h1>
        <p><strong>Event Name:</strong> ${latestWebhookData.eventName || 'N/A'}</p>
        <p><strong>Customer Name:</strong> ${latestWebhookData.customerName || 'N/A'}</p>
        <p><strong>Customer Email:</strong> ${latestWebhookData.customerEmail || 'N/A'}</p>
        <p><strong>Phone:</strong> ${latestWebhookData.ph || 'N/A'}</p>
        <p><strong>Amount:</strong> $${latestWebhookData.amount || 0}</p>
        <p><strong>Created At:</strong> ${latestWebhookData.createdAt || 'N/A'}</p>
        <p><strong>Experience:</strong> ${latestWebhookData.Experience || 'N/A'}</p>
        <p><a href="/">Back to Home</a></p>
    `);
});

// Error handling for unhandled routes
app.use((req, res) => {
    console.log(`Unhandled request: ${req.method} ${req.originalUrl}`);
    res.status(404).send('404 Not Found');
});

// Start the server

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

});