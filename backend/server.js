const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");


const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "signup.db");
let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Creating user table in signup Database

    await db.run(`CREATE TABLE IF NOT EXISTS
             user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                email TEXT,
                phone INT,
                username TEXT,
                password TEXT
     )`);
    app.listen(5000, () => {
      console.log("Server Running at http://localhost:5000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();


// validating username
app.post("/username", async(req,res)=>{
  const {username} = req.body ;
  const userNameList = [];
  const selectQuery = "SELECT username FROM user";
  const usersList = await db.all(selectQuery);
  usersList.map(eachItem => {
    userNameList.push(eachItem.username);
  })
  const checkUsername = userNameList.includes(username);
  
   // console.log(username);
  // console.log(userNameList);
   // console.log(checkUsername);
  try {
    if (checkUsername) {
      res.send({
        code: 400,
        message: "username already exists!"
      });
    }else {
      res.send({
        code: 200,
        message: "username avialable"
      }); 
    }
  }catch(err) {
    res.status(500).send(err.message);
  }
  

})

// Signup api
app.post("/signup", async (req, res) => {
  const { name, email, phone, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await db.run(
      "INSERT INTO user (name,email,phone,username,password) VALUES (?, ?,?, ?,?)",
      [name, email, phone, username, hashedPassword]
    );
    res.send("User registered successfully!");
    
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// Login api
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userNameList = [];
  const selectQuery = "SELECT username FROM user";
  const usersList = await db.all(selectQuery);
  usersList.map(eachItem => {
    userNameList.push(eachItem.username);
  })
  const checkUsername = userNameList.includes(username);
  // console.log(username)
  // console.log(userNameList)
  // console.log(checkUsername)
  try {
    if (checkUsername) {
    const selectQuery = "SELECT password FROM user WHERE username=?";
    const passwordObj = await db.get(selectQuery,username);
    // console.log(password);
    const isPasswordMatched = await bcrypt.compare(password, passwordObj.password);
    console.log(isPasswordMatched);
    if (isPasswordMatched) {
      // console.log("Login Successfull");
      res.send({
        code: 200,
        message: "Login Successfull"
      });
    }else {
      // console.log("Invalid Username or Invalid Password");
      res.send({
                code: 400,
                message: "Invalid Username or Invalid Password"
              });
    }
    }else {
      // console.log("Invalid Username or Invalid Password");
      res.send({
              code: 400,
              message: "Invalid Username or Invalid Password"
            });
    }

  }catch(err) {
    res.status(500).send(err.message);
  }

});

