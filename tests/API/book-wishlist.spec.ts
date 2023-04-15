import { test, expect} from '@playwright/test';

test.describe('BookCart API', () => {
    test('should allow me to add a book to my wishlist', async ({ request }) => {
        const loginResponse = await request.post('/api/Login', {
            data: {
              username: 'marjoison',
              password: '31Julio$',
            }
        });
        expect(loginResponse.ok()).toBeTruthy();
        const token = JSON.parse(await loginResponse.text()).token;
        const userId = JSON.parse(await loginResponse.text()).userDetails.userId;

        const response = await request.delete(`/api/Wishlist/${userId}`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          }});
        expect(response.ok()).toBeTruthy();
        
        const booksResponse = await request.get('/api/Book', {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }});
        expect(booksResponse.ok()).toBeTruthy();
        const book = JSON.parse(await booksResponse.text())[0];

        const wishlistResponse = await request.post(`/api/Wishlist/ToggleWishlist/${userId}/${book.bookId}`, {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }});
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