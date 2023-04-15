import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly bookCard: Locator;
  readonly shoppingCartButton: Locator;
  readonly wishlistButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = this.page.getByRole('button',{name:'Login'});
    this.bookCard = this.page.locator('.book-card');
    this.shoppingCartButton = this.page.locator('.mat-badge-medium #mat-badge-content-0');
    this.wishlistButton = this.page.locator('.mat-badge-medium #mat-badge-content-1')
  }

  async goto() {
    await this.page.goto('/');
  }

  async goToLogin() {
    await this.loginButton.click();
  }

  async addBookToCartByName(bookName: string) {
    await this.bookCard
        .filter({ has: this.page.getByText(bookName)})
        .getByRole('button', { name: 'Add to cart' })
        .click();
  }

  async addBookToWishlistByName(bookName: string) {
    await this.bookCard
        .filter({ has: this.page.getByText(bookName)})
        .locator('.favourite-unselected')
        .click();
  }
  
  async goToShoppingCart() {
    await this.shoppingCartButton.click();
  }

  async goToWishlist() {
    await this.wishlistButton.click();
  }
}