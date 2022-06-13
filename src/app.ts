import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import path from "path";
import { ValidateError } from "tsoa";
import * as dotenv from "dotenv";

dotenv.config();

type TsoaRoutesModule = {
  RegisterRoutes: Function;
};

export const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const { RegisterRoutes } = require(path.resolve(
  process.cwd(),
  "./dist/routes"
)) as TsoaRoutesModule;

RegisterRoutes(app);

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});
