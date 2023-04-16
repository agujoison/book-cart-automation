import { test, expect} from '@playwright/test';
import { Opertions } from './operations';

let apiContext;
let userId;
const operations = new Opertions();

test.beforeAll(async ({ playwright, request }) => {
  const loginResponse = await operations.apiLogin(request, 'marjoison', '31Julio$');
  const token = JSON.parse(await loginResponse.text()).token;
  userId = JSON.parse(await loginResponse.text()).userDetails.userId;
  apiContext = await operations.createContext(playwright, token);
});

test.beforeEach(async () => {
  operations.deleteWishlist(apiContext, userId);
});

test.describe('BookCart API', () => {
    test('should allow me to add a book to my wishlist', async () => {
      const book = await operations.getABook(apiContext);
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