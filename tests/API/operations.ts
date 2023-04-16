import {expect} from '@playwright/test';

export class Opertions {
    async createContext(playwright, token: any) {
        return await playwright.request.newContext({
            // All requests we send go to this API endpoint.
            baseURL: 'https://bookcart.azurewebsites.net',
            extraHTTPHeaders: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
        });
    }
      
    async apiLogin(request, username, password) {
        const response = await request.post('/api/Login', {
            data: {
            username: username,
            password: password,
            }
        });
        expect(response.ok()).toBeTruthy();
        return response;
    }

    async getABook(apiContext) {
        const booksResponse = await apiContext.get('/api/Book');
        expect(booksResponse.ok()).toBeTruthy();
        return JSON.parse(await booksResponse.text())[0];
    }

    async deleteWishlist(apiContext, userId) {
        const response = await apiContext.delete(`/api/Wishlist/${userId}`);
        expect(response.ok()).toBeTruthy();
    }
}

