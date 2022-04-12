import {test} from "@playwright/test"
import {LoginPage} from "../page-objects/LoginPage"
import {ProductListPage} from "../page-objects/ProductListPage"

test.describe('Realize Login', () => {
    let loginPage: LoginPage
    let productListPage: ProductListPage

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page)
        productListPage = new ProductListPage(page)

        await loginPage.visit()
    })

    test('Positive Scenario', async({page}) => {
        await loginPage.login('admin', 'admin')
        await productListPage.assertProductList('Lista de Produtos')
    })

    test('Negative Scenario', async({page}) => {
        await loginPage.login('userInvalid', 'admin')
        await loginPage.errorMessageLogin('Falha ao fazer o login')
    })
})