import { expect, Locator, Page } from '@playwright/test';

export class WishlistPage {
    readonly page: Page;
    readonly wishBookDetails: Locator;

    constructor(page: Page) {
        this.page = page;
        this.wishBookDetails = this.page.locator('.table .mat-card-content');
    }

   async isWishlistedBookDisplayed(bookName:string) {
        await this.wishBookDetails.waitFor({state:'visible'});
        return await this.page.getByRole('link', {name : bookName}).isVisible();
   }
};