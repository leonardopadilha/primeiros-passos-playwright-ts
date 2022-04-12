import {test} from "@playwright/test"
import {LoginPage} from "../page-objects/LoginPage"
import {ProductListPage} from "../page-objects/ProductListPage"
import {AddProductPage} from "../page-objects/AddProductPage"

test.describe.parallel('Add Product', () => {
    let loginPage: LoginPage
    let productListPage: ProductListPage
    let addProductPage: AddProductPage

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)
        addProductPage = new AddProductPage(page)

        await loginPage.visit()

        await loginPage.login('admin', 'admin')
    })

    test('Add new product with success', async({page}) => {
        let product = 'Notebook Black'
        await productListPage.clickAddProduct()

        await addProductPage.createProduct(product, '100,00', 'Azul')
        await addProductPage.assertSucess('Produto adicionado com sucesso')

        await addProductPage.viewPageProductList()
        await productListPage.validInsertProduct(product)
    })

    test('Add new product with error', async({page}) => {
        let product = 'Bola de futebol'
        await productListPage.clickAddProduct()

        await addProductPage.createProduct(product, '100.000,00', 'Verde')

        await productListPage.assertProductList('Lista de Produtos')
        await productListPage.assertMsgError('O valor do produto deve estar entre R$ 0,01 e R$ 7.000,00')
        await productListPage.validNotInsertProduct(product)
    })
})