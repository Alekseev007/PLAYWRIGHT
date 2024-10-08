// @ts-check
const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");

test("Autorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  const expected = "Моё обучение";
  await expect(page.locator("h2")).toContainText(expected);
  await expect(page).toHaveURL("https://netology.ru/profile/9138657");
});

test("NoAutorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("ivanov@yandex.ru");
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill("11223344");
  await page.getByTestId("login-submit-btn").click();
  const expected = "Вы ввели неправильно логин или пароль.";
  await expect(page.locator('[data-testId="login-error-hint"]')).toContainText(
    expected
  );
});
