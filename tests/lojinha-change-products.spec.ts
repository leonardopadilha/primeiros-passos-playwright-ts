import {test} from "@playwright/test"
import {LoginPage} from "../page-objects/LoginPage"
import {ProductListPage} from "../page-objects/ProductListPage"
import {AddProductPage} from "../page-objects/AddProductPage"

test.describe('Change products', () => {
    let loginPage: LoginPage
    let productListPage: ProductListPage
    let addProductPage: AddProductPage

    let product = "Teclado Preto"

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)
        addProductPage = new AddProductPage(page)

        await loginPage.visit()

        await loginPage.login('admin', 'admin')

        await productListPage.clickAddProduct()

        await addProductPage.createProduct(product, "50,00", "Preto")
        await addProductPage.assertSucess('Produto adicionado com sucesso')

        await addProductPage.viewPageProductList()
        await productListPage.validInsertProduct(product)
    })

    test('Change products with success', async({page}) => {
        let newProduct = 'Mouse novinho'

        await productListPage.clickChangeProduct(product)
        await addProductPage.assertViewPageChaneProduct('Editar produto')

        await addProductPage.changeProductName(product, newProduct)
        await addProductPage.assertSucess('Produto alterado com sucesso')

        await addProductPage.viewPageProductList()
        await productListPage.validInsertProduct(newProduct)

    })
})