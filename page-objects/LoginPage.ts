import {expect, Locator, Page} from "@playwright/test"

export class LoginPage {
    readonly page: Page
    readonly userName: Locator
    readonly userPassword: Locator
    readonly btnSubmit: Locator
    readonly errorMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.userName = page.locator('#usuario')
        this.userPassword = page.locator('#senha')
        this.btnSubmit = page.locator('[type="submit"]')
        this.errorMessage = page.locator('[class*="toast"]')
    }

    async visit() {
        await this.page.goto('http://165.227.93.41/lojinha-web/v2/')
    }

    async login(user: string, password: string) {
        await this.userName.type(user)
        await this.userPassword.type(password)
        await this.btnSubmit.click()
    }

    async errorMessageLogin(phrase: string) {
        await expect(this.errorMessage).toBeVisible()
        await expect(this.errorMessage).toContainText(phrase)
    }
}