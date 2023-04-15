import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { ShoppingCartPage } from '../../pages/shopping-cart-page';
import { CheckoutPage } from '../../pages/checkout-page';
import { HomePage } from '../../pages/home-page';
import { MyOrdersPage } from '../../pages/my-orders-page';

//Parametrize test
test.describe('BookCart', () => {
  test('should allow me to order a book as logged in user', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.goToLogin();
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('agujoison', '31Julio$');
    await homePage.addBookToCartByName('HP5');
    await homePage.goToShoppingCart();
    const shoppingCartPage = new ShoppingCartPage(page);
    await shoppingCartPage.goToCheckout();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.enterShippingAddress('Agustin Joison', '2883 Sweetspire', 'NA', '123456', 'FL');
    const myOrdersPage = new MyOrdersPage(page);
    await expect(myOrdersPage.myOrdersTitle).toBeVisible();
  });
}); 