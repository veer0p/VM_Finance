import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Access Denied: No Token Provided" });
    return; // Ensure the function stops executing
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
    return; // Ensure the function stops executing
  }
};

export default authMiddleware;
