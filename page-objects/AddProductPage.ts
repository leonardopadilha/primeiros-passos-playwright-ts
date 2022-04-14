import {expect, Locator, Page} from "@playwright/test"

export class AddProductPage {
    readonly page: Page
    readonly productName: Locator
    readonly productValue: Locator
    readonly productColor: Locator
    readonly btnSave: Locator
    readonly msgSucess: Locator
    readonly msgError: Locator
    readonly pageChangeProduct: Locator

    constructor(page: Page) {
        this.page = page
        this.productName = page.locator('#produtonome')
        this.productValue = page.locator('#produtovalor')
        this.productColor = page.locator('#produtocores')
        this.btnSave = page.locator('[type="submit"]')
        this.msgSucess = page.locator('[class*="toast"]')
        this.pageChangeProduct = page.locator('.row h4')
    }

    async createProduct(name: string, value: string, color: string = null) {
        await this.productName.type(name)
        await this.productValue.type(value) 
        await this.productColor.type(color)
        await this.btnSave.click()
    }

    async assertSucess(phrase: string) {
        await expect(this.msgSucess).toBeVisible()
        await expect(this.msgSucess).toContainText(phrase)
    }

    async assertViewPageChaneProduct(pageName: string) {
        await expect(this.pageChangeProduct).toContainText(pageName)
    }

    async changeProductName(product: string, newProduct: string) {
        await this.productName.click()
        await this.page.keyboard.down('Shift')
        for (let i = 0; i < product.length; i++) {
            await this.page.keyboard.press('ArrowLeft') 
        }

        await this.page.keyboard.up('Shift')
        await this.page.keyboard.press('Backspace')
        await this.page.keyboard.type(newProduct)
        await this.btnSave.click()
    }

    async viewPageProductList() {
        await this.page.goto('http://165.227.93.41/lojinha-web/v2/produto')
    }
}