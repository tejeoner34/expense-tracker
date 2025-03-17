export const createMockResponse = <T>(data: T, options = {}) => ({
  ok: true,
  status: 200,
  json: () => Promise.resolve(data),
  ...options,
});
