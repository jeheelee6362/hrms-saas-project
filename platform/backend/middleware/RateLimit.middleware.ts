import ratelimit from 'express-rate-limit'

const rateLimiter = ratelimit({
    windowMs: 60 * 1000, // = 1 minute
    max: 5000, // Limit each IP to 5 requests per `window` (here, per 1 minute).
    legacyHeaders: false,
    standardHeaders: 'draft-7', // draft-7: combined `RateLimit` header
    handler: (req, res, next, options) =>
		res.status(options.statusCode).send(options.message),
  });

export default rateLimiter