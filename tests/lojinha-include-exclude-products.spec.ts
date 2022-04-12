import {test} from "@playwright/test"
import {LoginPage} from "../page-objects/LoginPage"
import {ProductListPage} from "../page-objects/ProductListPage"
import {AddProductPage} from "../page-objects/AddProductPage"

test.describe('Include and exclude products', () => {
        let loginPage: LoginPage
        let productListPage: ProductListPage
        let addProductPage: AddProductPage

        let product = "Notebook White"

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)
        addProductPage = new AddProductPage(page)

        await loginPage.visit()
        await loginPage.login('admin', 'admin')

        await productListPage.clickAddProduct()

        await addProductPage.createProduct(product, '100,00', 'Azul')
        await addProductPage.assertSucess('Produto adicionado com sucesso')

        await addProductPage.viewPageProductList()
        await productListPage.validInsertProduct(product)
    })

    test('Exclude products with success', async({page}) => {
        await productListPage.clickTrash(product)
        await productListPage.assertRemovedProduct('Produto removido com sucesso')
        await productListPage.validNonexistentProduct(product)
    })
})