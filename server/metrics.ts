import client from 'prom-client';

// Create a registry and collect default metrics
export const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Example custom metrics (extend as needed)
export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5]
});
register.registerMetric(httpRequestDuration);
