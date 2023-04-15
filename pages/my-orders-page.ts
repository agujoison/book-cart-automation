import { expect, Locator, Page } from '@playwright/test';

export class MyOrdersPage {
    readonly page: Page;
    readonly myOrdersTitle: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.myOrdersTitle = this.page.getByRole('heading', {name: 'My Orders'});
    }

    

};