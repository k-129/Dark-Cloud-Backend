const app = require("./app");
const cors = require("cors");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = 3000;

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173" || ORIGIN,
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
