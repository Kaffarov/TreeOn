/**
 * Global error handler – catches all errors and sends a formatted response
 * Should be placed after all routes in server.js
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);

  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  // If in development, send stack trace for debugging
  if (process.env.NODE_ENV === 'development') {
    return res.status(status).json({ error: message, stack: err.stack });
  }

  res.status(status).json({ error: message });
};

module.exports = errorHandler;