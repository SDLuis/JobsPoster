const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.locator("text=login").click();
  await page.locator("input").first().fill("luis@gmail.com");
  await page.locator("input").last().fill("123");
  await page.locator("text=Log In").click();
  await expect(page.locator("text=Logout")).toHaveText("Logout");
});

test("Can add job", async ({ page }) => {
  const text = "Job add with Playwright";
  await page.locator(".add-jobs").click();
  await page.locator("text=Agregar trabajo").click();
  await expect(page.locator(".form-label").first()).toHaveText(/Work Title/);
  await page.locator(`input[name="workTitle"]`).fill(text);
  await page.locator(`input[name="workPosition"]`).fill(text);
  await page.locator(`select[name="workType"]`).selectOption("Remote");
  await page.locator(`input[name="workApplyMethod"]`).fill(text);
  await page.locator(`textarea[name="workDescription"]`).fill(text);
  await page.locator("text=Publicar").click();
  await expect(page.locator(".swal2-title")).toHaveText(
    "Se añadio el trabajo correctamente"
  );
  await page.goto("http://localhost:3000");
  await expect(page.locator(".titulo").first()).toHaveText(text);
});

test("Can edit job", async ({ page }) => {
  const text = "Job edit with Playwright";
  const btnEdit = page.locator(".edit").first();
  await btnEdit.click();
  await expect(page.locator(`input[name="workTitle"]`)).toHaveValue(/Job/);
  await page.locator(`input[name="workTitle"]`).fill(text);
  await page.locator(`input[name="workPosition"]`).fill(text);
  await page.locator(`select[name="workType"]`).selectOption("Full Time");
  await page.locator(`input[name="workApplyMethod"]`).fill(text);
  await page.locator(`textarea[name="workDescription"]`).fill(text);
  await page.locator("text=Editar").click();
  await expect(page.locator(".swal2-title")).toHaveText(
    "Se editado el trabajo correctamente"
  );
  await page.goto("http://localhost:3000");
  await expect(page.locator(".titulo").first()).toHaveText(text);
});

test("Can delete job", async ({ page }) => {
  const btnDelete = page.locator(".delete").first();
  await btnDelete.click();
  await expect(page.locator(".swal2-title")).toHaveText(
    "Trabajo eliminado con exito"
  );
});
