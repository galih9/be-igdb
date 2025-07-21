// src/types/express/index.d.ts
// This file extends the Express Request interface to add custom properties.

declare namespace Express {
  export interface Request {
    // Add any custom properties you want to attach to the Request object here.
    // For our logging middleware, we're adding 'startTime'.
    startTime?: number; 
    // You might add other properties like 'user' after authentication:
    // user?: { id: string; email: string; };
  }
}
