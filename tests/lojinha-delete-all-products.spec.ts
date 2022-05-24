import {test} from "@playwright/test"
import {LoginPage} from "../page-objects/LoginPage"

test.describe('Delete all products', () => {
    let loginPage: LoginPage

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page)

        await loginPage.visit()
        await loginPage.login('admin', 'admin')
    })

    test.only('Delete all products with success', async({page}) => {
        for (let i = 1; i <= 50; i++) {
            await page.click('ul a i')
        }
    })
})