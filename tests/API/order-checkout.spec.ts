import { test, expect} from '@playwright/test';

test.describe('BookCart API', () => {
    test('should allow me order a book', async ({ request }) => {
        const loginResponse = await request.post('/api/Login', {
            data: {
              username: 'marjoison',
              password: '31Julio$',
            }
        });
        expect(loginResponse.ok()).toBeTruthy();
        const token = JSON.parse(await loginResponse.text()).token;
        const userId = JSON.parse(await loginResponse.text()).userDetails.userId;
     
        const booksResponse = await request.get('/api/Book', {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }});
        expect(booksResponse.ok()).toBeTruthy();
        const book = JSON.parse(await booksResponse.text())[0];
        
        const checkoutResponse = await request.post(`/api/CheckOut/${userId}`, {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            data: {
                orderDetails: [{
                    book: book,
                    quantity: 1
                }],
                cartTotal: book.price
            }
        });
        expect(checkoutResponse.ok()).toBeTruthy();     
    });
});