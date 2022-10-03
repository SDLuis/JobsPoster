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
  await expect(page.locator(".titulo").first()).toHaveText("Diseñador Gráfico");
  await expect(page.locator(".VerMas").first()).toHaveText("Ver mas");
});

test("worktype change", async ({ page }) => {
  const BarWorkType = page.locator(".BarWorkType");
  await BarWorkType.selectOption("Remote");
  await expect(page.locator(".card-text").first()).toHaveText("Remote");
});

test("seachbar work", async ({ page }) => {
  const text = 'Diseñador Gráfico'
  const BarSearch = page.locator(".BarSearch");
  await BarSearch.fill(text);
  await page.locator(".btnSearch").click();
  await expect(page.locator(".titulo").first()).toHaveText(text);
});

test("see more", async ({ page }) => {
  const text = 'Diseñador Gráfico'
  await expect(page.locator(".titulo").first()).toHaveText(text);
  await page.locator("text=Ver mas").first().click();
  await expect(page.locator(".Header")).toHaveText(text);
});
