import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItem: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItem = this.page.locator('.inventory_item');
        this.shoppingCartLink = this.page.locator('.shopping_cart_link');
    }

    async addItemByName(itemName: string) {
        await this.inventoryItem
            .filter({ has: this.page.getByText(itemName)})
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }

    async goToShoppingCart() {
        await this.shoppingCartLink.click();
    }

};