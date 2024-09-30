import express from "express";
import cors from "cors";
import login_router from "./routes/login.js";
//
//app config
const app = express();
const port = 3020;

const corsOptions = {
  origin: "http://localhost:3003",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));

// api end points

app.get("/", async (req, res) => {
  res.send("working");
});

app.use("/api", login_router);

app.listen(port, () => {
  console.log(`Server started on port${port} `);
});
