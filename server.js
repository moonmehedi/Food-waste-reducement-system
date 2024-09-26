import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connection, run_query } from './connection.js';
import multer from "multer";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.status(200).json("Welcome to the server");
});

app.post("/user/signup", async (req, res) => {
  const user = req.body;
  console.log("backend User:", user);

  try {
    const query = `
      INSERT INTO DONOR (EMAIL, PASSWORD, INSTITUTION_NAME, INSTITUTION_TYPE, CITY, DISTRICT, DIVISION, STREETNO, PHONE, VERIFIED, POINTS, VOLUNTEER_ID, DATE_D)
      VALUES (:email, :password, :institution_name, :institution_type, :city, :district, :division, :streetno, :phone, :verified, :points, :volunteer_id, :date_d)
    `;

    const params = {
      email: user.email,
      password: user.password,
      institution_name: user.institution.name,
      institution_type: user.institution.type,
      city: user.address.city,
      district: user.address.district,
      division: user.address.division,
      streetno: user.address.streetNo,
      phone: user.address.phone,
      verified: user.verified,
      points: user.points,
      volunteer_id: user.volunteer_id,
      date_d: new Date(),
    };

    await run_query(query, params);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error while handling signup:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/user/signup_rec", async (req, res) => {
  const user = req.body;
  console.log("Receiver:", user);

  try {
    const query = `
      INSERT INTO recipient (EMAIL, PASSWORD, INSTITUTION_NAME, INSTITUTION_TYPE, CITY, DISTRICT, DIVISION, STREETNO, PHONE, NUMBER_OF_PEOPLE, VOLUNTEER_ID, DATE_R)
      VALUES (:email, :password, :institution_name, :institution_type, :city, :district, :division, :streetno, :phone, :number_of_people, :volunteer_id, :date_r)
    `;

    const params = {
      email: user.email,
      password: user.password,
      institution_name: user.institution.name,
      institution_type: user.institution.type,
      city: user.address.city,
      district: user.address.district,
      division: user.address.division,
      streetno: user.address.streetNo,
      phone: user.address.phone,
      number_of_people: user.number_of_people,
      volunteer_id: user.volunteer_id,
      date_r: new Date(),
    };

    await run_query(query, params);
    res.status(201).json({ message: "Receiver created successfully" });
  } catch (err) {
    console.error("Error while handling receiver signup:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/user/signup_vol", async (req, res) => {
  const user = req.body;
  console.log("User:", user);

  try {
    const query = `
      INSERT INTO VOLUNTEER (EMAIL, PASSWORD, NAME, CITY, DISTRICT, DIVISION, STREETNO, PHONE)
      VALUES (:email, :password, :name, :city, :district, :division, :streetno, :phone)
    `;

    const params = {
      email: user.email,
      password: user.password,
      name: user.name,
      city: user.address.city,
      district: user.address.district,
      division: user.address.division,
      streetno: user.address.streetNo,
      phone: user.address.phone,
    };

    await run_query(query, params);
    res.status(201).json({ message: "Volunteer created successfully" });
  } catch (err) {
    console.error("Error while handling volunteer signup:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/user/signup_cus", async (req, res) => {
  const user = req.body;
  console.log("User:", user);

  try {
    const query = `
      INSERT INTO CUSTOMER (NID, NAME, DOB, CITY, DISTRICT, DIVISION, STREETNO, PHONE, PASSWORD)
      VALUES (:nid, :name , TO_DATE(:dob, 'YYYY-MM-DD'), :city, :district, :division, :streetno, :phone, :password)
    `;

    const params = {
      password: user.password,
      name: user.name,
      nid: user.nid,
      dob: user.dob,
      city: user.address.city,
      district: user.address.district,
      division: user.address.division,
      streetno: user.address.streetNo,
      phone: user.address.phone,
    };

    await run_query(query, params);
    res.status(201).json({ message: "Customer created successfully" });
  } catch (err) {
    console.error("Error while handling customer signup:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//login


/*app.post('/user/login', (req, res) => {
  console.log('Login API hit!');
  res.status(200).json({ message: 'API hit successfully' });
});*/

app.post('/user/login', async (req, res) => {
  try {
      const user = req.body;
      console.log("User:", user);

      if (!user.userid || !user.password || !user.role) {
          return res.status(400).json({ message: 'All fields are required' });
      }

      let table;
      switch (user.role) {
          case 'donor':
              table = 'DONOR';
              break;
          case 'recipient':
              table = 'RECIPIENT';
              break;
          case 'volunteer':
              table = 'VOLUNTEER';
              break;
          case 'manager':
              table = 'MANAGER';
              break;
          case 'customer':
              table = 'CUSTOMER';
              break;
          default:
              return res.status(400).json({ message: 'Invalid role' });
      }
      console.log(table);

      // Fetch user data from the database
      const query = `SELECT * FROM ${table} WHERE NID = :userid `;
      const result = await run_query(query, [user.userid ]);
      console.log("Result: ", result);

      // Check if the user was found
      if (result.length === 0) {
          return res.status(401).json({ message: 'User not found' });
      }

      // Convert the first result to an object with named properties
      const dbUser = {
          PASSWORD: result[0][8],
          NID : result[0][0],
          NAME: result[0][1]

      };

      console.log("DB User:", dbUser);
      console.log(dbUser.PASSWORD);
      console.log(user.password);

      // Compare the provided password with the stored password
      if (user.password !== dbUser.PASSWORD) {
          return res.status(401).json({ message: 'Incorrect password' });
      }

      // Successful login response
      return res.json({
        message: 'Login successful',
        NID: dbUser.NID,
        Username: dbUser.NAME
    });

  } catch (error) {
      console.error('Unexpected server error:', error);
      return res.status(500).json({ message: 'Unexpected server error' });
  }
});


// Endpoint to get discounted food items
app.get('/customer/discounted-food', async (req, res) => {
  let conn;
  try {
    conn = await connection();

    const searchTerm = req.query.search; // Get the search term from query params

    let query = 'SELECT * FROM Discounted_Food';
    let binds = {}; // Initialize an object to hold bind parameters

    // If a search term is provided, modify the query to filter results
    if (searchTerm) {
      query += ` WHERE LOWER("Food Name") LIKE '%' || LOWER(:searchTerm) || '%'`;
      binds.searchTerm = searchTerm; // Only add to binds if searchTerm is present
    }

    const result = await conn.execute(query, binds); // Use binds for parameters

    // Process the result to handle BLOBs if necessary
    const foods = await Promise.all(result.rows.map(async row => {
      const foodImage = row[4]; // "Food Image"
      const base64Image = await blobToBase64(foodImage); // Convert BLOB to Base64 if necessary
      return {
        foodId: row[0],
        foodName: row[1],            // "Food Name"
        quantity: row[2],            // "Quantity"
        expDate: row[3],             // "Expiration Date"
        foodImage: base64Image,      // Converted BLOB to Base64 Image
        originalPrice: row[5],       // "Original Price"
        discountedPrice: row[6],     // "Discounted Price"
        sellerName: row[7]           // "Seller Name"
      };
    }));

    res.json(foods);
  } catch (error) {
    console.error('Error fetching discounted food:', error);
    res.status(500).send('Server error');
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error('Failed to close connection:', err);
      }
    }
  }
});


app.post('/customer/add-to-cart', async (req, res) => {
  const { foodId, customerId } = req.body; // Now customerId comes from the request body

  console.log('Received foodId:', foodId); // Debugging: Log foodId
  console.log('Received customerId:', customerId); // Debugging: Log customerId

  let conn;
  try {
      conn = await connection();

      // Insert into SELLS table, set NID to customerId
      const updateQuery = `UPDATE SELLS SET NID = :customerId WHERE FOOD_ID = :foodId AND NID IS NULL`;

      console.log('Executing query:', updateQuery); // Log the query being executed

      await conn.execute(updateQuery, { customerId, foodId });
      await conn.commit();

      res.json({ message: 'Item added to cart' });
  } catch (error) {
      console.error('Error adding to cart:', error); // Show the actual error
      res.status(500).send('Server error');
  } finally {
      if (conn) {
          try {
              await conn.close();
          } catch (err) {
              console.error('Failed to close connection:', err);
          }
      }
  }
});

app.post('/customer/cart', async (req, res) => {
  const { customerId } = req.body; // Extract customerId from the request body

  let conn;

  try {
      console.log('Received customerId:', customerId); // Log the customer ID received
      conn = await connection();

      const query = `
         SELECT * FROM Cart_View 
         WHERE "Customer ID" = :customerId
      `;

      console.log('Executing query:', query); // Log the query being executed

      const result = await conn.execute(query, [customerId]);

      console.log('Query result:', result.rows); // Log the result from the query

      if (result.rows.length === 0) {
          console.log('No items in the cart for this customer.');
          return res.status(404).json([]); // Return an empty array if no items
      }

      // Convert BLOBs to Base64
      const cartItems = await Promise.all(result.rows.map(async row => {
        const foodImage = row[4];
        const base64Image = await blobToBase64(foodImage); // Convert BLOB to Base64 if necessary
        return {
            foodId: row[1],
            sellerName: row[2],
            foodName: row[3],
            foodImage: base64Image, 
            originalPrice: row[5],
            discountedPrice: row[6],
            discountAmount: row[7]
        };
      }));

      res.json(cartItems); // Send the cart items as JSON
  } catch (error) {
      console.error('Error fetching cart data:', error); // Log any error that occurs
      res.status(500).json({ error: 'An error occurred while retrieving the cart data.' });
  } finally {
      if (conn) {
          await conn.close();
      }
  }
});

// for confirming orders of Customer
app.post('/customer/checkout', async (req, res) => {
  const { customerId, cartItems } = req.body;

  console.log('Checkout initiated');
  console.log('Customer ID:', customerId);
  console.log('Cart Items:', cartItems);

  let conn;
  try {
      conn = await connection();
      console.log('Database connection established');

      //await conn.execute('BEGIN'); // Ensure transaction begins

      for (const item of cartItems) {
          const { foodId, quantity, sellerName } = item;
          console.log('Processing item:', item);

          const updateSellsInitialQuery = `
              UPDATE SELLS
              SET ORDER_STATUS = 'YES'
              WHERE NID = :customerId
          `;
          const result1 = await conn.execute(updateSellsInitialQuery, [customerId]);
          console.log('Step 1 rows affected:', result1.rowsAffected);

          const insertOrderQuery = `
              INSERT INTO ORDERS (NID, FOOD_ID, DONOR_NAME, QUANTITY, ORDER_STATUS)
              VALUES (:customerId, :foodId, :sellerName, :quantity, 'PENDING')
          `;
          const result2 = await conn.execute(insertOrderQuery, [customerId, foodId, sellerName, quantity]);
          console.log('Step 2 rows affected:', result2.rowsAffected);

          const query = `SELECT QUANTITY FROM FOOD WHERE FOOD_ID = :foodId`;
          const result3 = await conn.execute(query, [foodId]);
          console.log('Step 3 result:', result3.rows);

          if (result3.rows.length === 0) {
              throw new Error(`Food item not found`);
          }

          const availableQuantity = result3.rows[0][0];
          if (quantity > availableQuantity) {
              throw new Error(`Not enough stock`);
          }

          const updateQuery = `
              UPDATE FOOD
              SET QUANTITY = QUANTITY - :quantity
              WHERE FOOD_ID = :foodId
          `;
          const result4 = await conn.execute(updateQuery, [quantity, foodId]);
          console.log('Step 4 rows affected:', result4.rowsAffected);

          if (availableQuantity - quantity === 0) {
              const deleteQuery = `DELETE FROM FOOD WHERE FOOD_ID = :foodId`;
              const result5 = await conn.execute(deleteQuery, [foodId]);
              console.log('Step 5 rows affected (FOOD deleted):', result5.rowsAffected);
          }

          const updateSellsFinalQuery = `
              UPDATE SELLS
              SET NID = NULL, ORDER_STATUS = NULL
              WHERE NID = :customerId
          `;
          const result6 = await conn.execute(updateSellsFinalQuery, [customerId]);
          console.log('Step 6 rows affected:', result6.rowsAffected);
      }

      await conn.commit(); // Ensure transaction commits
      console.log('Transaction committed successfully');
      res.status(200).json({ message: 'Checkout successful!' });

  } catch (error) {
      console.error('Error during checkout:', error.message);

      if (conn) {
          console.log('Rolling back transaction');
          //await conn.rollback();
      }

      res.status(500).json({ error: 'Checkout failed. Please try again later.' });
  } finally {
      if (conn) {
          await conn.close();
          console.log('Database connection closed');
      }
  }
});



app.post('/customer/cart/remove', async (req, res) => {
  const { customerId, foodId } = req.body;

  console.log('Remove from cart initiated');
  console.log('Customer ID:', customerId);
  console.log('Food ID:', foodId);

  let conn;
  try {
      conn = await connection(); // Assuming connection() returns a DB connection
      console.log('Database connection established');

      // Start transaction
      //await conn.execute('BEGIN');

      // Step 1: Set `NID` and `ORDER_STATUS` to `NULL` in the SELLS table
      const updateSellsQuery = `
          UPDATE SELLS
          SET NID = NULL
          WHERE NID = :customerId AND FOOD_ID = :foodId
      `;
      const result1 = await conn.execute(updateSellsQuery, [customerId, foodId]);
      console.log('Step 1 rows affected (SELLS updated):', result1.rowsAffected);

      if (result1.rowsAffected === 0) {
          throw new Error(`No matching item found in cart for customerId: ${customerId}, foodId: ${foodId}`);
      }

      // Step 2: Optional, if you want to log the removal or do additional tasks after the update.

      // Commit transaction
      await conn.commit();
      console.log('Transaction committed successfully');

      // Respond with success
      res.status(200).json({ success: true, message: 'Item removed from cart successfully' });

  } catch (error) {
      console.error('Error removing item from cart:', error.message);

      if (conn) {
          console.log('Rolling back transaction');
          //await conn.rollback(); // Rollback the transaction in case of error
      }

      res.status(500).json({ success: false, message: 'Failed to remove item from cart' });

  } finally {
      if (conn) {
          await conn.close();
          console.log('Database connection closed');
      }
  }
});

app.get('/customer/orders', async (req, res) => {
  let conn;
  try {
    conn = await connection();
    
    // Query the view instead of manually joining the tables
    const query = `
      SELECT * FROM Customer_Order_History
      WHERE NID = :nid`;

    // Assuming customer NID is sent via query parameter
    const customerNID = req.query.nid;

    // Execute the query
    const result = await conn.execute(query, [customerNID]);

    // Map the result to an array of order objects
    const orders = result.rows.map(row => ({
      orderId: row[0],
      customerId: row[1],
      orderQuantity: row[2],
      orderStatus: row[3],
      orderDate: row[4],
      donorName: row[5],
      foodName: row[6],
      foodQuantity: row[7]
    }));

    // Send the order data as JSON
    res.json(orders);

  } catch (error) {
    console.error('Error fetching customer orders:', error);
    res.status(500).send('Server error');
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error('Failed to close connection:', err);
      }
    }
  }
});








/*app.get('/customer/cart', async (req, res) => {
  const customerId = req.session.customerId;

  let conn;
  try {
      conn = await connection();

      // Select items in the cart for the current customer
      const query = `
          SELECT f.NAME, s.DISCOUNTED_PRICE, s.QUANTITY
          FROM SELLS s
          JOIN FOOD f ON s.FOOD_ID = f.FOOD_ID
          WHERE s.NID = :customerId`;
      const result = await conn.execute(query, { customerId });

      const cartItems = result.rows.map(row => ({
          foodName: row[0],
          discountedPrice: row[1],
          quantity: row[2]
      }));

      res.json(cartItems);
  } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).send('Server error');
  } finally {
      if (conn) {
          try {
              await conn.close();
          } catch (err) {
              console.error('Failed to close connection:', err);
          }
      }
  }
});*/


// Add to your existing server.js
app.get("/admin/dashboard-info", async (req, res) => {
  try {
    const query = "SELECT * FROM FETCH_INFO";
    const result = await run_query(query, {});
    console.log(result);
    res.status(200).json(result[0]); 
  } catch (err) {
    console.error("Error while fetching dashboard info:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


//get rows of donor whom are verifyed
app.get("/admin/verified-donors", async (req, res) => {
  try {
    const query = "SELECT * FROM VERIFIED_DONOR";
    const result = await run_query(query, {});
    res.status(200).json(result);
  } catch (err) {
    console.error("Error while fetching verified donors:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get('/admin/volunteers', async (req, res) => {
  try {
      const query = 'SELECT * FROM VOLUNTEER_INFO';
      const result = await run_query(query, {});
      res.json(result);
  } catch (error) {
      console.error('Error fetching volunteers:', error);
      res.status(500).send('Server error');
  }
});


app.get('/admin/recipients', async (req, res) => {
  try {
      const query = 'SELECT * from recipient_INFO';
      const result = await run_query(query, {});
      res.json(result);
  } catch (error) {
      console.error('Error fetching recipient:', error);
      res.status(500).send('Server error');
  }
});





// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//donor/donation
// Endpoint to handle file upload and data insertion
app.post('/donor/donation', upload.single('food-image'), async (req, res) => {

  console.log('listing');
  const { originalname, buffer } = req.file;
  const { 'food-name': foodName, quantity, 'exp-date': expDate } = req.body;

  try {
      const query = `
          INSERT INTO FOOD (NAME, QUANTITY, EXP_DATE, PHOTO, VERIFIED, VOLUNTEER_ID, DONOR_ID, DATE_F, SELL_OR_DONATE)
          VALUES (:name, :quantity, TO_DATE(:expDate, 'YYYY-MM-DD'), :photo, 'N', null, null, SYSDATE, 'DONATE')
      `;
      const params = {
          name: foodName,
          quantity: parseInt(quantity, 10),
          expDate: expDate,
          photo: buffer
      };

      await run_query(query, params);

      res.status(200).json({ message: 'Food donation recorded successfully!' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to donate food.' });
  }
});


//donation//sells

app.post('/sell/food', upload.single('food-photo'), async (req, res) => {
  const { 'food-name': foodName, quantity, 'exp-date': expDate, 'original-price': originalPrice, 'discounted-price': discountedPrice } = req.body;
  const photo = req.file.buffer;
  const verified = 'N';
  const volunteerId = null; // Adjust as needed
  const donorId = 6; // Adjust as needed
  const dateF = new Date().toISOString().split('T')[0];
  const sellOrDonate = 'SELL';
  const nid = null; // Adjust as needed 
  const dateS = new Date().toISOString().split('T')[0];

  const query = `
      BEGIN
          InsertFoodAndSell(
              :name, :quantity, TO_DATE(:expDate, 'YYYY-MM-DD'), :photo, :verified, :volunteerId, :donorId, TO_DATE(:dateF, 'YYYY-MM-DD'), :sellOrDonate,
              :nid, :originalPrice, :discountedPrice, TO_DATE(:dateS, 'YYYY-MM-DD')
          );
      END;
  `;

  const params = {
      name: foodName,
      quantity: parseInt(quantity, 10),
      expDate: expDate,
      photo: photo,
      verified: verified,
      volunteerId: volunteerId,
      donorId: donorId,
      dateF: dateF,
      sellOrDonate: sellOrDonate,
      nid: nid,
      originalPrice: parseFloat(originalPrice),
      discountedPrice: parseFloat(discountedPrice),
      dateS: dateS
  };
  console.log(params);

  try {
      await run_query(query, params);
      
      res.status(200).json({ message: 'Food sell recorded successfully!' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to sell food.' });
  }
});












app.get('/admin/donation-history', async (req, res) => {
  let conn;
  try {
    conn = await connection();
    const query = 'SELECT * FROM donation_history';
    const result = await conn.execute(query);

    // Process the result to handle BLOBs
    const donations = await Promise.all(result.rows.map(async row => {
      const foodImage = row[2]; // Assuming BLOB is at index 2
      const base64Image = await blobToBase64(foodImage);
      return [
        row[0], // Donor_Name
        row[1], // Food_Name
        base64Image, // Food_Image as Base64
        row[3], // Food_Quantity
        row[4], // Exp_Date
        row[5], // Recipient_Name
        row[6], // Institution_Type
        row[7], // Number_Of_People
        row[8]  // Food_Date
      ];
    }));
    console.log(donations)
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donation history:', error);
    res.status(500).send('Server error');
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error('Failed to close connection:', err);
      }
    }
  }
});



app.get('/admin/verified-food', async (req, res) => {
  let conn;
  try {
    conn = await connection();
    const query = 'SELECT * FROM donor_food_view';
    const result = await conn.execute(query);
   // console(result);
   // Process the result to handle BLOBs
    const donations = await Promise.all(result.rows.map(async row => {
      const foodImage = row[2]; // Assuming BLOB is at index 2
      const base64Image = await blobToBase64(foodImage);
      return [
        row[0], // Donor_Name
        row[1], // Food_Name
        base64Image, // Food_Image as Base64
        row[3], // Food_Quantity
        row[4], // Exp_Date
        row[8]  // Food_Date
      ];
    }));
    console.log(donations)
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donation history:', error);
    res.status(500).send('Server error');
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error('Failed to close connection:', err);
      }
    }
  }
});
      
      // Function to convert BLOB to Base64
      const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
          if (blob === null) {
            resolve(null);
            return;
          }
      
          const chunks = [];
          blob.on('data', (chunk) => {
            chunks.push(chunk);
          });
          blob.on('end', () => {
            const buffer = Buffer.concat(chunks);
            resolve(buffer.toString('base64'));
          });
          blob.on('error', (err) => {
            reject(err);
          });
        });
      };




      // request table

// Endpoint to get combined requests
app.get('/admin/combined-requests', async (req, res) => {
  const query = "SELECT * FROM COMBINEDREQUEST";
  try {
    const data = await run_query(query,{});
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching combined requests");
  }
});

// Endpoint to get available volunteers
app.get('/admin/available-volunteers', async (req, res) => {
  const query = "SELECT * FROM available_volunteer";
  try {
    const data = await run_query(query,{});
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching available volunteers");
  }
});










// Endpoint to get donor food donation requests
app.get('/admin/donor-food-donation-requests', async (req, res) => {
  let conn;
  try {
    conn = await connection();
    const query = "SELECT * FROM DONOR_FOOD_DONATION_REQUEST";
    const result = await conn.execute(query);
   // console(result);
   // Process the result to handle BLOBs
    const donations = await Promise.all(result.rows.map(async row => {
      const foodImage = row[2]; // Assuming BLOB is at index 2
      const base64Image = await blobToBase64(foodImage);
      return [
        row[0], // Donor_Name
        row[1], // Food_Name
        base64Image, // Food_Image as Base64
        row[3], // Food_Quantity
        row[4], // Exp_Date
        row[5]  // Food_Date
      ];
    }));
    console.log(donations)
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donation history:', error);
    res.status(500).send('Server error');
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error('Failed to close connection:', err);
      }
    }
  }
});




