import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { page, username, password } from './browser'

Given('user clicks on the {string} link', async function (string) {
    let actionLink = await page.getByRole('link', { name: string });
    await actionLink.click();
});

Given('user can see the {string} form', async function (string) {
    if (string == 'Sign Up') {
        let signUpForm = await page.locator("#signInModalLabel");
        await expect(signUpForm).toBeVisible();
    } else if (string == "Log in") {
        let loginForm = await page.locator("#logInModalLabel");
        await expect(loginForm).toBeVisible();
    }
});

Given('user fills in a {string} test username', async function (string) {
    let usernameInputField;
    if (string == "Sign Up") {
        usernameInputField = await page.getByLabel("Username:");
        await usernameInputField.fill(username);
        await expect(await page.getByLabel("Username:")).toHaveValue(username);
    } else if (string == "Log in") {
        usernameInputField = await page.locator("#loginusername")
        await usernameInputField.fill(username);
        await expect(await page.locator('#loginusername')).toHaveValue(username);
    }
});

Given('user fills in a {string} test password', async function (string) {
    let passwordInputField;
    if (string == "Sign Up") {
        passwordInputField = await page.getByLabel("Password:");
        await passwordInputField.fill(password);
        await expect(await page.getByLabel("Password:")).toHaveValue(password);
    } else if (string == "Log in") {
        passwordInputField = await page.locator("#loginpassword");
        await passwordInputField.fill(password);
        await expect(await page.locator("#loginpassword")).toHaveValue(password);
    }
});

When('user clicks on the {string} button', async function (string) {
    await page.getByRole("button", { name: string }).click();
    if (string == "Sign Up") {
        page.on('dialog', dialog => {
            expect(dialog.message()).not.toContain("This user already exist.");
            dialog.accept();
        })
    }
});

Then('user can see a welcome message', async function () {
    await expect(await page.getByText(`Welcome ${username}`)).toBeVisible();
});

Given('user logs in to the application', async function () {
    let string = "Log in";
    let usernameInputField;
    let passwordInputField;

    let signUpLink = await page.getByRole('link', { name: string });
    await signUpLink.click();

    let loginForm = await page.locator("#logInModalLabel");
    await expect(loginForm).toBeVisible();

    usernameInputField = await page.locator("#loginusername")
    await usernameInputField.fill(username);
    await expect(await page.locator('#loginusername')).toHaveValue(username);

    passwordInputField = await page.locator("#loginpassword");
    await passwordInputField.fill(password);
    await expect(await page.locator("#loginpassword")).toHaveValue(password);

    await page.getByRole("button", { name: string }).click();

    await expect(await page.getByText(`Welcome ${username}`)).toBeVisible();

});

Given('user can see the log out link', async function () {
    let logoutLink = await page.getByRole('link', { name: "Log out" });
    await expect(logoutLink).toBeVisible();
});

When('user clicks on the log out link', async function () {
    let logoutLink = await page.getByRole('link', { name: "Log out" })
    await logoutLink.click();
});

Then('user can see the Log in link', async function () {
    let loginLink = await page.getByRole('link', { name: "Log in" });
    await expect(loginLink).toBeVisible();
});

Given('user clicks on a laptop item', async function () {
    let laptopitem = await page.locator('div.card').filter({ hasText: "laptop" }).first();
    await laptopitem.click();
});

When("user adds the item to the cart", async function () {
    let addToCartButton = await page.getByText("Add to cart");
    await addToCartButton.click()
    page.on('dialog', dialog => {
        page.on('dialog', dialog => {
            expect(dialog.message()).toContain("Product added.");
            dialog.accept();
        })
    })
})

Then("item should appear in the cart", async function () {
    let productTitle: any = await page.locator('h2.name').textContent();
    let cartLink = await page.getByRole('link', { name: "Cart", exact: true });
    await cartLink.click()

    await expect(await page.getByText(productTitle).first()).toBeVisible();
})