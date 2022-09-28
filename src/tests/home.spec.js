const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test("homepage has JobsPoster in the Navbar", async ({ page }) => {
  const Title = page.locator("text=Jobs Poster");
  await expect(Title).toHaveAttribute("href", "/");
  await Title.click();
  await expect(Title).toHaveAttribute("href", "/");
});

test("homepage has content from api", async ({ page }) => {
  await expect(page.locator(".titulo").first()).toHaveText("Base de datos Jr");
  await expect(page.locator(".VerMas").first()).toHaveText("Ver mas");
});

test("worktype change", async ({ page }) => {
  const BarWorkType = page.locator(".BarWorkType");
  await BarWorkType.selectOption("Remote");
  await expect(page.locator(".card-text").first()).toHaveText("Remote");
});

test.only("seachbar work", async ({ page }) => {
  const BarSearch = page.locator(".BarSearch");
  await BarSearch.fill("Seguridad Industrial");
  await page.locator(".btnSearch").click();
  await expect(page.locator(".titulo").first()).toHaveText(
    "Seguridad Industrial"
  );
});
