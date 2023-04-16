import { test, expect} from '@playwright/test';
import { Opertions } from './operations';

let apiContext;
let userId;
const operations = new Opertions();

test.beforeAll(async ({ playwright, request }) => {
  const loginResponse = await operations.apiLogin(request, 'marjoison', '31Julio$');
  expect(loginResponse.ok()).toBeTruthy();
  const token = JSON.parse(await loginResponse.text()).token;
  userId = JSON.parse(await loginResponse.text()).userDetails.userId;
  apiContext = await operations.createContext(playwright, token);
});

test.describe('BookCart API', () => {
    test('should allow me order a book', async () => {
        const book = operations.getABook(apiContext);     
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