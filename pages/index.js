import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 5000;

var userIsAuthorised = false;  //robimyTo aby user bez hasla niew maial dostepu
//by defoult jest nie autoryzowny

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next) {
  const password = req.body["password"]; //dodajemy password bo jest w HTML
  if (password === "ILoveProgramming") {
    userIsAuthorised = true;
  }
  next(); //nigdy nie zapominaj
}
app.use(passwordCheck); //to jest uzyte jako pierwsze

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html"); //login prawdziwy
  } else {
    res.sendFile(__dirname + "/public/index.html");// login falszywy
    //Alternatively res.redirect("/");  mozesz to uzyc zanmiennnie
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
