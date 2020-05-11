import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as Express from "express";
import { Routes } from "./routes";

const res = dotenv.config();
if (res.error) {
  throw res.error;
}

const app = Express.default();
app.use(cors.default());
app.use(bodyParser.json());

// express swagger setup
const expressSwagger = require("express-swagger-generator")(app);
let options = {
  swaggerDefinition: {
    info: {
      description: "Abonne API Documentation",
      title: "Abonne",
      version: "1.0.0"
    },
    host: "https://api.abonne.net/api/v1",
    basePath: "/",
    produces: ["application/json", "application/xml"],
    schemes: ["http", "https"]
  },
  basedir: __dirname, //app absolute path
  files: ["./routes.*"] //Path to the API handle folder
};
expressSwagger(options);

const routes = new Routes().paths(app);

app.listen(process.env.PORT, () => {
  console.log(`=== started server http://localhost:${process.env.PORT}/api-docs`);
});
