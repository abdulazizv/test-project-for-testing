const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config = require("config");
const morgan = require("morgan");
const ErrorHandler = require("./utils/middlewares/ErrorHandlingMiddleware");
const routes = require("./core/routes/index.routes");

const app = express();

const port = config.get("port") || 3030;


app.use(express.json());
app.use(express.urlencoded({extended: true, limit:"10mb"}))
app.use('/images', express.static('public/images'))
app.use(cookieParser());
app.use(cors());

app.use(routes)

app.use(morgan("combined"));

app.use(ErrorHandler);
async function start() {
  try {
    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  } catch (e) {
    console.error(`Error has been exist`, e);
  }
}

start();
