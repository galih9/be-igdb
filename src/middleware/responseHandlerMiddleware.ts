import { Request, Response, NextFunction } from 'express';

export function responseHandlerMiddleware(req: Request, res: Response, next: NextFunction) {
  // Store original methods
  const oldJson = res.json.bind(res);
  const oldSend = res.send.bind(res);

  res.json = (data: any) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return oldJson({
        status: 'success',
        code: res.statusCode,
        data,
      });
    }
    // For error codes, pass through (handled by error middleware)
    return oldJson(data);
  };

  res.send = (data: any) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return oldSend({
        status: 'success',
        code: res.statusCode,
        data,
      });
    }
    return oldSend(data);
  };

  next();
}

// Error handler for 500 and others
export function errorHandlerMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  res.status(status).json({
    status: 'error',
    code: status,
    message: err.message || 'Internal Server Error',
    description: err.description || undefined,
  });
}

// 404 handler
export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  const err = new Error(`Cannot ${req.method} ${req.originalUrl}`);
  (err as any).status = 404;
  (err as any).description = `Route not found`;
  next(err);
}