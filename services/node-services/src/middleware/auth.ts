import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


interface JwtPayload {
    user_id: number;
    email: string;
    role: string;
    is_staff: boolean;
}


export interface AuthRequest extends Request {
    user?: JwtPayload;
}


export const authenticate  = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }


    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}