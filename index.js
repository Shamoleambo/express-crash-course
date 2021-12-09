const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const members = require("./Members");

const app = express();
const hbs = exphbs.create({ defaultLayout: "main" });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.get("/", (rq, res) =>
  res.render("index", { title: "Member App", members })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));
