const app = require("./app");
const cors = require("cors");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 3000;

const allowedOrigins = process.env.ORIGIN
  ? [process.env.ORIGIN]
  : ["http://localhost:5173", "https://mainbase.pt"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
