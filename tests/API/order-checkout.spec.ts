import { test, expect} from '@playwright/test';

let apiContext;
let userId;

test.beforeAll(async ({ playwright, request }) => {
  const loginResponse = await request.post('/api/Login', {
    data: {
      username: 'marjoison',
      password: '31Julio$',
    }
  });
  expect(loginResponse.ok()).toBeTruthy();
  const token = JSON.parse(await loginResponse.text()).token;
  userId = JSON.parse(await loginResponse.text()).userDetails.userId;
  
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: 'https://bookcart.azurewebsites.net',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
});

test.describe('BookCart API', () => {
    test('should allow me order a book', async () => {
        const booksResponse = await apiContext.get('/api/Book');
        expect(booksResponse.ok()).toBeTruthy();
        const book = JSON.parse(await booksResponse.text())[0];
        
        const checkoutResponse = await apiContext.post(`/api/CheckOut/${userId}`, {
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