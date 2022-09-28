const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  test.setTimeout(2000)
});

test("can login", async ({ page }) => {
    await page.locator("text=login").click();
    await expect(page.locator("text=Welcome to Jobs Poster")).toHaveText(
      "Welcome to Jobs Poster"
    );
  
    await page.locator("input").first().fill("luis@gmail.com");
    await page.locator("input").last().fill("123");
    await page.locator("text=Log In").click();
    await expect(page.locator("text=Logout")).toHaveText("Logout");
  });
  
  test("can not login, wrong password", async ({ page }) => {
    await page.locator("text=login").click();
    await expect(page.locator("text=Welcome to Jobs Poster")).toHaveText(
      "Welcome to Jobs Poster"
    );
  
    await page.locator("input").first().fill("luis@gmail.com");
    await page.locator("input").last().fill("1");
    await page.locator("text=Log In").click();
    await expect(page.locator(".swal2-html-container")).toHaveText(
      "Invalid or wrong password"
    );
  });
  
  test("can not login, wrong user", async ({ page }) => {
    await page.locator("text=login").click();
    await expect(page.locator("text=Welcome to Jobs Poster")).toHaveText(
      "Welcome to Jobs Poster"
    );
  
    await page.locator("input").first().fill("ls@gmail.com");
    await page.locator("input").last().fill("1");
    await page.locator("text=Log In").click();
    await expect(page.locator(".swal2-html-container")).toHaveText(
      "Invalid or wrong user"
    );
  });
  
  test("can not login, empty fill", async ({ page }) => {
    await page.locator("text=login").click();
    await expect(page.locator("text=Welcome to Jobs Poster")).toHaveText(
      "Welcome to Jobs Poster"
    );
  
    await page.locator("input").first().fill("");
    await page.locator("input").last().fill("");
    await page.locator("text=Log In").click();
    await expect(page.locator(".swal2-html-container")).toHaveText(
      "Rellene todos los campos"
    );
  });
  