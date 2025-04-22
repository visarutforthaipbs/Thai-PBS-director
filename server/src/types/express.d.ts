declare namespace Express {
  export interface Request {}
  export interface Response {}
  export interface NextFunction {}
}

declare module "express" {
  import * as express from "express";
  export = express;
}

declare module "cors" {
  import * as cors from "cors";
  export = cors;
}
