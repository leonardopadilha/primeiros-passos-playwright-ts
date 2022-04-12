import {expect, Locator, Page} from "@playwright/test"

export class ProductListPage {
    readonly page: Page
    readonly productList: Locator
    readonly btnAddProduct: Locator
    readonly containerProducts: Locator
    readonly msgError: Locator
    readonly trash: Locator

    constructor(page: Page) {
        this.page = page
        this.productList = page.locator('.container h3')
        this.btnAddProduct = page.locator('text=Adicionar produto')
        this.containerProducts = page.locator('.collection li:last-child')
        this.msgError = page.locator('[class*="toast"]')
        this.trash = page.locator('.collection li:last-child i:last-child')
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

    async validNonexistentProduct(nameProduct: string) {
        await expect(this.containerProducts).not.toContainText(nameProduct)
    }

    async assertMsgError(phrase: string) {
        await expect(this.msgError).toBeVisible()
        await expect(this.msgError).toContainText(phrase)
    }

    async clickTrash(nameProduct: string) {
        this.validInsertProduct(nameProduct)
        await this.trash.click()
    }

    async assertRemovedProduct(phrase: string) {
        await expect(this.msgError).toContainText(phrase)
    }


}