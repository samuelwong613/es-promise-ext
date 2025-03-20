require('../../dist/prototype/reject');

describe('reject', () => {
  test('should reject with a string reason in a promise chain', async () => {
    const reason = 'test error';
    await expect(Promise.resolve().reject(reason)).rejects.toBe(reason);
  });

  test('should reject with an error object in a promise chain', async () => {
    const reason = new Error('test error object');
    await expect(Promise.resolve().reject(reason)).rejects.toThrow('test error object');
  });

  test('should reject with null in a promise chain', async () => {
    const reason = null;
    await expect(Promise.resolve().reject(reason)).rejects.toBe(null);
  });

  test('should reject with undefined in a promise chain', async () => {
    const reason = undefined;
    await expect(Promise.resolve().reject(reason)).rejects.toBeUndefined();
  });

  test('should reject with a complex object in a promise chain', async () => {
    const reason = { code: 404, message: 'Not Found' };
    await expect(Promise.resolve().reject(reason)).rejects.toEqual(reason);
  });
});