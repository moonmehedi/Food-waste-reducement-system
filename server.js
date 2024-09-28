import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connection, run_query } from './connection.js';
import multer from "multer";
import session from 'express-session';

import oracledb from 'oracledb';




dotenv.config(); 

const app = express();
const port = process.env.PORT || 5000;








app.use(session({
  secret: 'your_secret_key',
  resave: false, // Change to true to ensure the session is saved back to the store
  saveUninitialized: false, // Change to false to avoid saving uninitialized sessions
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 hour
    sameSite: 'Lax'
  }
}));





// Middleware
app.use(cors({
 origin: ['http://127.0.0.1:5502'] ,// Adjust to your frontend URL
  credentials: true // Allow credentials (cookies) to be sent
}));
app.use(express.json());

//app.use(express.urlencoded({ extended: true }));


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



//login mechanism

app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
      let query;
      if (role === 'manager') {
          query = 'SELECT * FROM manager WHERE EMAIL = :email AND PASSWORD = :password';
      } else if (role === 'volunteer') {
          query = 'SELECT * FROM VOLUNTEER WHERE EMAIL = :email AND PASSWORD = :password';
      } else if (role === 'donor') {
          query = 'SELECT * FROM DONOR WHERE EMAIL = :email AND PASSWORD = :password';
      } else if (role === 'recipient') {
          query = 'SELECT * FROM RECIPIENT WHERE EMAIL = :email AND PASSWORD = :password';
      } else {
          return res.status(400).json({ message: 'Invalid role' });
      }

      const params = { email, password };
      const result = await run_query(query, params);

      if (result.length > 0) {
          req.session.user = {
              id: result[0][0],
              email: result[0][1],
              name: result[0][3],
              role: role
          };
          req.session.save((err) => {
              if (err) {
                  console.error('Error saving session:', err);
                  return res.status(500).json({ message: 'Internal server error' });
              }
             // console.log('current user ;',req.session.user,'end here\n')
              res.status(200).json({ message: 'Login successful' });
          });
      } else {
          res.status(401).json({ message: 'Invalid credentials' });
      }
  } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Internal server error' });
  }
});





//get user detail
app.get('/admin/current-user', (req, res) => {
  //console.log('user ingfo :',req.session.user,req.sessionStore,req.sessionID)
  if (req.session.user) {
      res.json(req.session.user);
  } else {
      res.status(401).json({ message: 'Unauthorized' });
  }
});




//get user detail
app.get('/donor/current-user', (req, res) => {
  //console.log('user ingfo :',req.session.user)
  if (req.session.user) {
      res.json(req.session.user);
  } else {
      res.status(401).json({ message: 'Unauthorized' });
  }
});










//logout mechanism

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});











// Add to your existing server.js
app.get("/admin/dashboard-info", async (req, res) => {
  try {
 //   console.log(req.session.user)
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
  const donorId = 1; // Adjust as needed
  const dateF = new Date().toISOString().split('T')[0];
  const sellOrDonate = 'SELL';
  const nid = 1; // Adjust as needed 
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






app.post('/admin/assign-volunteer', async (req, res) => {
  const { managerId, volunteerNumber, task } = req.body;

  if (!managerId || !volunteerNumber || !task) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  console.log('Received data:', { managerId, volunteerNumber, task });
  let volunteerId;
  let assignTask=task+' verification';
  try {
    const query = `SELECT getVolunteerId(:volunteerNumber) AS volunteerId FROM dual`;
    const result = await run_query(query, { volunteerNumber });
    console.log('Function result:', result);
    volunteerId = result[0][0];  // Adjust according to the result structure
  } catch (error) {
    console.error('Error fetching volunteer ID:', error);
    return res.status(500).send("Error fetching volunteer ID");
  }

  if (!volunteerId) {
    return res.status(404).json({ success: false, message: 'Volunteer not found' });
  }

  try {
    const query = `
      BEGIN
        assign_volunteer(:managerId, :volunteerId, :assignTask);
      END;
    `;
    console.log('Assigning volunteer with data:', { managerId, volunteerId, assignTask });
    await run_query(query, { managerId, volunteerId, assignTask });

    res.status(200).json({ success: true, message: 'Volunteer assigned successfully' });
  } catch (error) {
    console.error('Error assigning volunteer:', error);
    res.status(500).json({ success: false, message: 'Failed to assign volunteer' });
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





// Parts of Zishan

//1. Task Management
//2. Verification History


app.get('/volunteer/getTasks', async (req, res) => {
  console.log('Listening to volunteer getTasks request');

  // Retrieve volunteer_id and search term from the query parameters
  const volunteer_id = req.query.volunteer_id;
  const searchTerm = req.query.search || '';  // Default to empty string if no search term

  console.log('Volunteer ID:', volunteer_id);
  console.log('Search Term:', searchTerm);

  const query = 
      `BEGIN
          get_assigned_tasks(:volunteer_id, :searchTerm, :result);
      END;`;

  try {
      const binds = {
          volunteer_id: volunteer_id,  // Bind the dynamic volunteer_id from the frontend
          searchTerm: searchTerm,      // Pass the search term
          result: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }  // SYS_REFCURSOR bind
      };

      // Execute the query and fetch rows
      const rows = await run_query(query, binds, true);

      // Debugging the fetched rows
      console.log('Fetched rows:', rows);

      // Process the rows and format the tasks
      const tasks = rows.map((row, index) => ({
          requestId: row.ID,
          requestType: row.REQUEST_TYPE,
          emailAddress: row.EMAIL_ADDRESS,
          phone: row.PHONE,
          institutionType: row.INSTITUTION_TYPE,
          institutionName: row.INSTITUTION_NAME,
          requestDate: row.REQUEST_DATE
      }));

      res.json(tasks); // Send the tasks as JSON to the frontend
  } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).send('Error fetching tasks');
  }
});










// Handle accept task
app.post('/acceptTask/:id', async (req, res) => {
  const taskId = req.params.id;
  // Write logic to update the task status to accepted in the database
  console.log('accepted',taskId);
  res.send(`Task ${taskId} accepted`);
});

// Handle reject task
app.post('/rejectTask/:id', async (req, res) => {
  const taskId = req.params.id;
  // Write logic to update the task status to rejected in the database
  console.log(rejected);
  res.send(`Task ${taskId} rejected`);
});





app.get('/volunteer/getHistory', async (req, res) => {
  console.log('Listening to volunteer getHistory request');

  const volunteer_id = req.query.volunteer_id;
  const searchTerm = req.query.search || '';

  console.log('Volunteer ID:', volunteer_id);
  console.log('Search Term:', searchTerm);

  const query = `
      BEGIN
          get_verified_tasks(:volunteer_id, :searchTerm, :result);
      END;
  `;

  try {
      const binds = {
          volunteer_id: volunteer_id, 
          searchTerm: searchTerm,
          result: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      };

      // Execute the query and handle the ref cursor
      const rows = await run_query(query, binds, true);  // Assuming true for ref cursor
      console.log('Fetched rows:', rows);
      
      const tasks = rows.map((row) => ({
          requestId: row.ID,
          requestType: row.REQUEST_TYPE,
          emailAddress: row.EMAIL_ADDRESS,
          requestAddress: row.REQUEST_ADDRESS, // Include requestAddress
          phone: row.PHONE,
          institutionType: row.INSTITUTION_TYPE,
          institutionName: row.INSTITUTION_NAME,
          requestDate: row.REQUEST_DATE,
          authenticity: row.AUTHENTICITY
      }));

      res.json(tasks);  // Send the task data as JSON to the front-end
  } catch (error) {
      console.error('Error fetching verification history:', error);
      res.status(500).send('Error fetching verification history');
  }
});






app.post('/volunteer/updateTaskStatus/:id', async (req, res) => {
  const taskId = req.params.id;
  const authenticityStatus = req.body.authenticity;  // 'Y' for accept, 'N' for reject
  const requestType = req.body.reqType;  // 'Y' for accept, 'N' for reject

  console.log(`Updating task ${taskId} with status ${authenticityStatus} reqtype ${requestType}`);

  const query = `
    BEGIN
        update_task_status(:task_id, :authenticity,:reqType);
    END;
  `;

  const binds = {
      task_id: taskId,  // The task ID to update
      authenticity: authenticityStatus,
      reqType:requestType  // 'Y' for accepted, 'N' for rejected
  };

  try {
      await run_query(query, binds);
      res.status(200).send(`Task ${taskId} updated successfully`);
  } catch (error) {
      console.error(`Error updating task ${taskId}:`, error);
      res.status(500).send('Error updating task');
  }
});




app.post("/volunteer/contact_admin", async (req, res) => {
  const user = req.body;
  console.log("Received user message:", user);
  
  // Validate phone number
  if (user.phone.length !== 11) {
      res.status(400).json({ error: "Phone number must be 11 digits" });
      return;
  }

  try {
      const query = `
        INSERT INTO CONTACT (EMAIL,PHONE,MESSAGE)
        VALUES (:email, :phone, :message)
      `;

      const params = {
        email: user.email,
        phone: user.phone,
        message: user.comment
      };

      // Execute the query
      await run_query(query, params);
      res.status(201).json({ message: "Your Query has been sent to the Admin" });
  } catch (err) {
      console.error("Error while handling contact submission:", err);
      res.status(500).json({ error: "Internal Server Error. Please try again later." });
  }
});







//arif er part

	
app.post("/users/request_food", async (req, res) => {
  const { people, date, email } = req.body; 
  console.log("Received request data:", req.body);

  // Log the individual fields for debugging
  console.log("People:", people);
  console.log("Date:", date);
  console.log("Email:", email);

  if (!people || !date || !email) {
      return res.status(400).json({ error: "All fields are required" });
  }

  try {
      const updateQuery = `
          UPDATE RECIPIENT
          SET NUMBER_OF_PEOPLE = :people_param, DATE_R = TO_DATE(:date_param, 'yyyy-mm-dd')
          WHERE EMAIL = :email_param
      `;

      const params = {
          people_param: people,
          date_param: date, 
          email_param: email
      };

      await run_query(updateQuery, params);
      res.status(200).json({ message: "Request updated successfully" });
  } catch (err) {
      console.error("Error while updating recipient:", err);
      res.status(500).json({ error: "Internal server error" });
  }
});





app.get('/users/request_history', async (req, res) => {
  const email = req.query.email;
  console.log(email);
  if (!email) {
      return res.status(400).json({ error: 'Email is required' });
  }

  try {
      const query = `
          SELECT
              INSTITUTION_NAME AS "institutionName",
              INSTITUTION_TYPE AS "institutionType",
              NUMBER_OF_PEOPLE AS "numberOfPeople",
              TO_CHAR(DATE_R, 'YYYY-MM-DD') AS "date"
          FROM
              RECIPIENT
          WHERE
              email = :email
          ORDER BY
              DATE_R DESC
      `;
      const result = await run_query(query, {email});
      console.log(result);
    res.status(200).send(result[0]);
  } catch (err) {
      console.error('Error fetching request history:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
});
//contact information





app.post("/users/contact", async (req, res) => {
  const user = req.body;
  console.log("Received user message:", user);
  if (user.phone.length !== 11) {
      res.status(400).json({ error: "Phone number must be 11 digits" });
      return;
  }

  try {
      const query = `
        INSERT INTO CONTACT (EMAIL,PHONE,MESSAGE)
        VALUES (:email, :phone, :message)
      `;

      const params = {
        email: user.email,
        phone: user.phone,
        message: user.comment 
      };
      

      await run_query(query, params);
      res.status(201).json({ message: "Your Query has been sent to the Admin" });
  } catch (err) {
      console.error("Error while handling signup:", err);
  }
});










