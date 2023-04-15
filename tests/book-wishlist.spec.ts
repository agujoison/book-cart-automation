import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
import { WishlistPage } from '../pages/wishlist-page';

let apiContext;

test.beforeEach(async ({ request }) => {
    const loginResponse = await request.post('https://bookcart.azurewebsites.net/api/Login', {
        data: {
          username: 'agujoison',
          password: '31Julio$',
        }
    });
    expect(loginResponse.ok()).toBeTruthy();
    let token = JSON.parse(await loginResponse.text()).token;
 
    const response = await request.delete('https://bookcart.azurewebsites.net/api/Wishlist/14911', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }});
    expect(response.ok()).toBeTruthy();
});

test.describe('BookCart', () => {
  test('should allow me to save a book into my wishlist', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.goToLogin();
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('agujoison', '31Julio$');
    await homePage.addBookToWishlistByName('HP5');
    await homePage.goToWishlist();
    const wishlistPage = new WishlistPage(page);
    await expect(await wishlistPage.isWishlistedBookDisplayed('HP5')).toBeTruthy();
  });
});