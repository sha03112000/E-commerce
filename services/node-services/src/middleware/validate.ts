import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";
import { formatZodIssues } from "../utils/errors/errorFormatter";


interface RequestSchema {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
}

export const validate =
  (schemas: RequestSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
      const entries: Array<["body" | "query" | "params", ZodType]> = [];

      if (schemas.body) entries.push(["body", schemas.body]);
      if (schemas.query) entries.push(["query", schemas.query]);
      if (schemas.params) entries.push(["params", schemas.params]);

      for (const [key, schema] of entries) {
        const result = schema.safeParse(req[key]);

        if (!result.success) {
          return res.status(400).json({
            status: "error",
            message: "Invalid request data",
            errors: formatZodIssues(result.error.issues),
          });
        }

        // Optional but powerful: overwrite with validated data
        req[key] = result.data;
      }

      next();
    };
