import { test, expect} from '@playwright/test';

test.describe('BookCart API', () => {
    test('should allow me to login with my user', async ({ request }) => {
        const loginResponse = await request.post('/api/Login', {
            data: {
              username: 'agujoison',
              password: '31Julio$',
            }
        });
        expect(loginResponse.ok()).toBeTruthy();
        expect(await loginResponse).toMatchJSON({
            token: expect.any(String),
            userDetails: {
                userId: expect.any(Number)
            }
        });
    });
  });