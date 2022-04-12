import {expect, Locator, Page} from "@playwright/test"

export class AddProductPage {
    readonly page: Page
    readonly productName: Locator
    readonly productValue: Locator
    readonly productColor: Locator
    readonly btnSave: Locator
    //readonly btnProductList: Locator
    readonly msgSucess: Locator
    readonly msgError: Locator

    constructor(page: Page) {
        this.page = page
        this.productName = page.locator('#produtonome')
        this.productValue = page.locator('#produtovalor')
        this.productColor = page.locator('#produtocores')
        this.btnSave = page.locator('[type="submit"]')
        this.msgSucess = page.locator('[class*="toast"]')
    }

    async createProduct(name: string, value: string, color: string = null) {
        await this.productName.type(name)
        await this.productValue.type(value) 
        await this.productColor.type(color)
        this.btnSave.click()
    }

    async assertSucess(phrase: string) {
        await expect(this.msgSucess).toBeVisible()
        await expect(this.msgSucess).toContainText(phrase)
    }

    async viewPageProductList() {
        await this.page.goto('http://165.227.93.41/lojinha-web/v2/produto')
    }
}