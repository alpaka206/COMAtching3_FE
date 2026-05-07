import { expect, test } from "@playwright/test";

import { ROUTES } from "../src/routes";

const routes = Object.entries(ROUTES);

test.describe("App Router route smoke", () => {
  for (const [name, route] of routes) {
    test(`${name} 라우트 렌더링`, async ({ page }) => {
      const pageErrors: string[] = [];

      page.on("pageerror", (error) => {
        pageErrors.push(error.message);
      });

      const response = await page.goto(route, { waitUntil: "domcontentloaded" });

      expect(response?.status(), `${route} HTTP 상태`).toBeLessThan(500);
      await page.locator("body").waitFor({ state: "visible" });
      await expect(page.locator("body")).not.toContainText(
        "This page could not be found"
      );
      await expect(page.locator("body")).not.toContainText("Application error");
      expect(pageErrors, `${route} 런타임 오류`).toEqual([]);
    });
  }
});
