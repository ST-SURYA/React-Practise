import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await console.log("title", await page);
  await expect(page).toHaveTitle("title");
  await page.goto("http://localhost:3000/");
  await page.goto("http://localhost:3000/login");
  await page.getByPlaceholder("Username").click();
  await page.getByPlaceholder("Username").fill("user");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("user");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: "Reducer Hook" }).click();
  await page.locator("li").filter({ hasText: "Context Hook" }).click();
  await page.getByRole("link", { name: "Memo Hook" }).click();
  await page.getByRole("button", { name: "Table" }).click();
  await page
    .locator("li")
    .filter({ hasText: /^TanStack Table$/ })
    .click();
  await page.getByRole("button", { name: "Next page" }).click();
  await page.getByRole("button", { name: "Previous page" }).click();
  await page.getByRole("link", { name: "TanStack Query" }).click();
  await page.getByRole("button", { name: "Next page" }).click();
  await page.getByRole("button", { name: "Previous page" }).click();
});
