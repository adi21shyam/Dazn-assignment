import { Request, Response, NextFunction } from 'express';

// Mock authentication middleware
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    // In a real scenario, replace this with token verification logic
    const isAdmin = req.headers['x-admin'] === 'true';

    if (!isAdmin) {
        return res.status(403).json({ message: "Access denied. Admin role required." });
    }

    next(); // Proceed to the next middleware/function if authenticated
};
