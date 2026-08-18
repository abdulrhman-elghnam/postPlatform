export default function sendSuccess(res, message = 'ok', statusCode = 200, data = undefined) {
  return res.status(statusCode).json({
    success: true,
    message,
    results: Array.isArray(data) ? data.length : undefined,
    data,
  });
}
