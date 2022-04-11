import {expect, Locator, Page} from "@playwright/test"

export class ProductListPage {
    readonly page: Page
    readonly productList: Locator
    readonly btnAddProduct: Locator
    readonly containerProducts: Locator

    constructor(page: Page) {
        this.page = page
        this.productList = page.locator('.container h3')
        this.btnAddProduct = page.locator('text=Adicionar produto')
        this.containerProducts = page.locator('.collection li:last-child')
    }

    async assertProductList(phrase: string) {
        await expect(this.productList).toBeVisible()
        await expect(this.productList).toContainText(phrase)
    }

    async clickAddProduct() {
        await this.btnAddProduct.click()
    }

    async validInsertProduct(nameProduct: string) {
        await expect(this.containerProducts).toContainText(nameProduct)
    }
}