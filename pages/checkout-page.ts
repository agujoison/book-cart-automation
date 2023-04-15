import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly addressLine1Input: Locator;
    readonly addressLine2Input: Locator;
    readonly pincodeInput: Locator;
    readonly stateInput: Locator;
    readonly placeOrderButton: Locator;
    readonly orderSummaryLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = this.page.getByLabel('Name');
        this.addressLine1Input = this.page.getByLabel('Address Line 1');
        this.addressLine2Input = this.page.getByLabel('Address Line 2');
        this.pincodeInput = this.page.getByLabel('Pincode');
        this.stateInput = this.page.getByLabel('State');
        this.placeOrderButton = this.page.getByRole('button', {name: 'Place Order'});
        this.orderSummaryLabel = this.page.getByText('Order Summary');
    }

    async enterShippingAddress(name: string, addressLine1: string, addressLine2: string, pincode: string, state: string) {
        await this.orderSummaryLabel.waitFor({state:'visible'});
        await this.nameInput.fill(name);
        await this.addressLine1Input.fill(addressLine1);
        await this.addressLine2Input.fill(addressLine2);
        await this.pincodeInput.fill(pincode);
        await this.stateInput.fill(state);
        await this.placeOrderButton.click();
    }

};