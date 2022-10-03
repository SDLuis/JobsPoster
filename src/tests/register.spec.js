const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test("can register", async ({ page }) => {
  await page.locator("text=login").click();
  await expect(page.locator("text=Welcome to Jobs Poster")).toHaveText(
    "Welcome to Jobs Poster"
  );
  await page.locator(".text-reset").click();
  await expect(page.locator(".title")).toHaveText("Register");
  await page.locator(`input[name="User_Fname"]`).fill("user5 first name");
  await page.locator(`input[name="User_Lname"]`).fill("user2 last name");
  await page.locator(`input[name="User_Email"]`).fill("user222");
  await page.locator(`input[name="User_Password"]`).fill("123");
  await page.locator(".Button").click();
  await expect(page.locator(".swal2-title")).toHaveText(
    "Registro exitoso, redirigiendo..."
  );
});

test("this user already exist", async ({ page }) => {
  await page.locator("text=login").click();
  await expect(page.locator("text=Welcome to Jobs Poster")).toHaveText(
    "Welcome to Jobs Poster"
  );
  await page.locator(".text-reset").click();
  await expect(page.locator(".title")).toHaveText("Register");
  await page.locator(`input[name="User_Fname"]`).fill("user2 first name");
  await page.locator(`input[name="User_Lname"]`).fill("user2 last name");
  await page.locator(`input[name="User_Email"]`).fill("user2");
  await page.locator(`input[name="User_Password"]`).fill("123");
  await page.locator(".Button").click();
  await expect(page.locator(".swal2-title")).toHaveText(
    "Este email no esta disponible. Por favor intente con otro"
  );
});

test("fill the fields", async ({ page }) => {
  await page.locator("text=login").click();
  await expect(page.locator("text=Welcome to Jobs Poster")).toHaveText(
    "Welcome to Jobs Poster"
  );
  await page.locator(".text-reset").click();
  await expect(page.locator(".title")).toHaveText("Register");
  await page.locator(`input[name="User_Fname"]`).fill("");
  await page.locator(`input[name="User_Lname"]`).fill("");
  await page.locator(`input[name="User_Email"]`).fill("");
  await page.locator(`input[name="User_Password"]`).fill("123");
  await page.locator(".Button").click();
  await expect(page.locator(".swal2-html-container")).toHaveText(
    "Rellene todos los campos"
  );
});
