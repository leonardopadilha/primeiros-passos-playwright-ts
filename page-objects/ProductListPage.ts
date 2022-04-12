import {expect, Locator, Page} from "@playwright/test"

export class ProductListPage {
    readonly page: Page
    readonly productList: Locator
    readonly btnAddProduct: Locator
    readonly containerProducts: Locator
    readonly productsList: Locator
    readonly msgError: Locator

    constructor(page: Page) {
        this.page = page
        this.productList = page.locator('.container h3')
        this.btnAddProduct = page.locator('text=Adicionar produto')
        this.containerProducts = page.locator('.collection li:last-child')
        this.productsList = page.locator('.container h3')
        this.msgError = page.locator('[class*="toast"]')
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

    async validNotInsertProduct(nameProduct: string) {
        await expect(this.containerProducts).not.toContainText(nameProduct)
    }

    async assertMsgError(phrase: string) {
        await expect(this.msgError).toBeVisible()
        await expect(this.msgError).toContainText(phrase)
    }

    async viewListProduct() {
        await expect(this.productsList).toContainText('Lista de Produtos')
    }
}