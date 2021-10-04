//clear Console
console.clear();
//import
import express from "express";
import path from "path";
import IsAuth from "./middleware/Auth.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
//instance

const app = express();
app.use(IsAuth);
//read JSON
app.use(express.json());
//TIMER-----------------

//----------------------------------------------------------
//template
app.set("view engine", "pug");
app.get("/service", function (req, res) {
  res.render("Service", { posts });
});

// ----------------------------------------------

const posts = [
  { name: "post1", id: 1 },
  { name: "post2", id: Math.random() },
  { name: "post3", id: Math.random() },
  { name: "post4", id: Math.random() },
];
app.get("/posts", (req, res) => {
  res.send({ data: posts, msg: "success" });
});
app.get("/posts/:id", (req, res) => {
  posts.map((ele) => ele.id == req.params.id)
    ? res.send({ msg: "post finded", ele })
    : res.send("not found");
});
app.post("/addPosts", (req, res) => {
  let data = req.body;
  posts.push({ ...data, id: Math.random() });
  res.send({ msg: "posr added", posts });
});
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  let data = req.body;
  posts.map((ele) => (ele.id == id ? { ...ele, ...data } : ele))
    ? res.send({ msg: "post update", posts })
    : res.send("error");
});
app.delete("/delete/:id", (req, res) => {
  // parametre
  let id = req.params.id;
  posts = posts.filter((el) => el.id != id);
  res.send({ msg: "post deleted", posts });
});
//-----------------------------
app.get("/", (req, res) => {
  res.sendFile(__dirname.slice(3) + "/Public/Home/Home.html");
});
// app.get("/service", (req, res) => {
//   res.sendFile(__dirname.slice(3) + "/Public/OurService/Service.html");
// });
app.get("/contact", (req, res) =>
  res.sendFile(__dirname.slice(3) + "/Public/ContactUs/Contact.html")
);
//port
const PORT = 5000;
//Server
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`Server is running on ${PORT}`)
);
