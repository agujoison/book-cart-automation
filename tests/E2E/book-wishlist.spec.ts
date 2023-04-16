import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { HomePage } from '../../pages/home-page';
import { WishlistPage } from '../../pages/wishlist-page';
import { Opertions } from '../API/operations';

const operations = new Opertions();

test.beforeEach(async ({ playwright, request }) => {
  const loginResponse = await operations.apiLogin(request, 'agujoison', '31Julio$');
  let token = JSON.parse(await loginResponse.text()).token;
  const userId = JSON.parse(await loginResponse.text()).userDetails.userId;
  const apiContext = await operations.createContext(playwright, token);
  operations.deleteWishlist(apiContext, userId);
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