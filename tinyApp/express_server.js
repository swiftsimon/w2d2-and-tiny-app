var express = require("express");
var app = express();
var PORT = process.env.port || 8080; //default port is 8080
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

function generateRandomString() {
  return Math.random().toString(36).substring(2, 8);
};


var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.com",
  "9sm5xK": "http://www.google.com",
};

const users = {
  "s7ui9f" : {
    id: "s7ui9f",
    email: "user1@example.com",
    password: "tricky"
  },
  "ax334d" : {
    id: "ax334d",
    email: "user2@example.com",
    password: "cool555"
  }
};

//on Login POST call
app.post("/login", (req, res) => {
  //console.log("USER", req.body.username); // returns simon
  res.cookie("username", req.body.username);
  //set the cookie parameter called username to the value submitted in the form
  res.redirect('/urls');
});

// on logout POST call
app.post("/logout", (req, res) => {
  //clear the cookie set by submitting username form
  res.clearCookie(req.body.username);
  res.redirect('/urls');
});

app.get("/", (req, res) => {
  res.redirect("/urls");
});


app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase, username: req.cookies["username"] };
  //below, render this page with access to templateVars
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
    let templateVars = { urls: urlDatabase, username: req.cookies["username"] };
  res.render("urls_new", templateVars);
});

// REGISTER GET endpoint
app.get("/register", (req, res) => {
  let templateVars = { urls: urlDatabase, username: req.cookies["username"] };
  res.render("urls_register", templateVars);
});

// REGISTER POST
app.post("/register", (req, res) => {
  let templateVars = { urls: urlDatabase, username: req.cookies["username"] };
  // **input some functionality here
  res.redirect('/urls');
});


// show page
app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id, urls: urlDatabase, username: req.cookies["username"] };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  let data = urlDatabase;
  let longURL = data[req.params.shortURL];
  res.redirect(longURL);
});

// this is the delete route
app.post("/urls/:id/delete", (req, res)=> {
  console.log("delete body", req.body);
  //**insert delete functionality here
  delete urlDatabase[req.params.id];
  //console.log("see", urlDatabase[req.params.id]);
  res.redirect('/urls');
});

// this is the update page linked from edit button
app.post("/urls/:id", (req, res)=> {
  //console.log("from edit button", req.params.id);
  let short = req.params.id;
  res.redirect(`/urls/${short}`); //${short} is a place holder (use ` not " nor ')
});

// on update press call this
app.post("/urls/:id/update", (req, res)=> {
  console.log("update body", req.body);
  urlDatabase[req.params.id] = req.body.newURL;
  res.redirect('/urls');
});

//corresponds to method "POST" in urls_new
app.post("/urls", (req, res) => {
  let data = urlDatabase;
    let templateVars = { shortURL: req.params.id, urls: urlDatabase, username: req.cookies["username"] };

  // console.log("U", data);
  // let longURL = data[random];
  // console.log("V", req.body);
    // returns { longURL: 'fred.com' }
  let random = generateRandomString();
    // console.log("random", random);
    //console.log(random);
      let longURL = req.body.longURL;
      let shortURL = random;
   // console.log("long", longURL);
   //console.log("short", shortURL);

   urlDatabase[shortURL] = longURL;
   // console.log("new database", urlDatabase);
  // res.send("OK");
  res.redirect(`/u/${random}`);  // /urls/ to /u/
});

app.get("/u/:shortURL", (req, res) => {
  console.log("X",req.body);
  let longURL = urlDatabase["req.params.shortURL"];
  res.redirect(longURL);
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});






// app.get("/urls.json", (req, res) => {
//   res.json(urlDatabase);
// });

// app.get("/hello", (req, res) => {
//   res.end("<html><body>Hello <b>World</b></body></html>\n");
// });




