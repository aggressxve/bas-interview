import { Given } from '@cucumber/cucumber'
import { chromium, Page, Browser, expect } from '@playwright/test'

let page: Page
let browser: Browser
let randomNumber = Math.round(Math.random() * 2349812734982 + 192842103947);
let username = `test_username${randomNumber}`;
const password = "prueba123"

Given('user navigates to the application', async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto("https://www.demoblaze.com/index.html");
    await expect(await page.title()).toBe("STORE");
});

Given("browser should close", async function () {
    browser.close();
})

export { page, username, password }