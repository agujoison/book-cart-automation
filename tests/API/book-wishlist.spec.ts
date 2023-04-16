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

test.beforeEach(async () => {
  const response = await apiContext.delete(`/api/Wishlist/${userId}`);
  expect(response.ok()).toBeTruthy();
});

test.describe('BookCart API', () => {
    test('should allow me to add a book to my wishlist', async ({ request }) => {
        const booksResponse = await apiContext.get('/api/Book');
        expect(booksResponse.ok()).toBeTruthy();
        const book = JSON.parse(await booksResponse.text())[0];

        const wishlistResponse = await apiContext.post(`/api/Wishlist/ToggleWishlist/${userId}/${book.bookId}`);
        expect(wishlistResponse.ok()).toBeTruthy();
        expect(await wishlistResponse).toContainJSON({
            bookId: book.bookId,
            title: book.title,
            author: book.author,
            category: book.category,
            price: book.price,
            coverFileName: book.coverFileName
          }
      );
    });
});