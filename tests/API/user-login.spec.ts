import { test, expect} from '@playwright/test';
import { Opertions } from './operations';

test.describe('BookCart API', () => {
    test('should allow me to login with my user', async ({ request }) => {
        const operations = new Opertions();
        const loginResponse = await operations.apiLogin(request, 'marjoison', '31Julio$');
        expect(await loginResponse).toMatchJSON({
            token: expect.any(String),
            userDetails: {
                userId: expect.any(Number),
                firstName: null,
		        lastName: null,
		        username: expect.any(String),
		        password: null,
		        gender: null,
		        userTypeId: expect.any(Number)
            }
        });
    });
});