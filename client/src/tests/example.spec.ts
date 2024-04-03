import { test, expect } from "@playwright/test";

// auth -- https://playwright.dev/docs/auth#basic-shared-account-in-all-tests
test("iniciar sesión", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page.getByRole("heading", { name: "DynaViz" })).toBeVisible();
  await expect(page.getByText("Correo")).toBeVisible();
  await expect(page.getByLabel("Correo")).toBeVisible();
  await expect(page.getByText("Contraseña")).toBeVisible();
  await expect(page.getByLabel("Contraseña")).toBeVisible();

  await page.getByLabel("Correo").click();
  await page.getByLabel("Correo").fill("doctor@gmail.com");
  await page.getByLabel("Contraseña").click();
  await page.getByLabel("Contraseña").fill("doctor");
  await page.getByRole("button", { name: "Iniciar Sesión" }).click();

  await expect(
    page.getByRole("button", { name: "Consultar Pacientes" })
  ).toBeVisible();
});

test("consultar pacientes", async ({ page }) => {
  await page.getByRole("button", { name: "Consultar Pacientes" }).click();

  await expect(page.getByRole("heading", { name: "Pacientes" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Añadir Usuario" })
  ).toBeVisible();

  await page.getByRole("button", { name: "Añadir Usuario" }).click();

  await page.getByRole("button", { name: "✕" }).click();

  await expect(page.getByRole("heading", { name: "Pacientes" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Añadir Usuario" })
  ).toBeVisible();
});
