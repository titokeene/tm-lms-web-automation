# tm-lms-web-automation

### Where to Put Assertions

Assertions should primarily **live in your test scripts**, not inside reusable page objects.  

- **Page Objects** are responsible for describing *how* to interact with the application (fill forms, click buttons, navigate). They should remain reusable and free of business test logic.  
- **Test Scripts** define *what* to verify. Assertions here validate business outcomes (e.g., “user successfully logs in”).  
- **Exception:** Page objects may include lightweight *sanity checks* to confirm that the correct page or component is loaded and that its selectors are valid.  

#### What is a Sanity Check?
A *sanity check* is a simple validation that ensures your test is running in the expected place and that the page object’s selectors are pointing to the right elements.  
- Example: checking that the login page header says “Login” after navigation.  
- It does **not** test business functionality — it only guards against broken selectors or being on the wrong page.

---

#### Example

**Page Object (with a sanity check):**

```ts
// login-page.ts (Login Page)
import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(process.env.TESTING_ENV!);
  }

  async login(username: string, password: string) {
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('button[type="submit"]');
  }

  // Sanity check: verifies the page is loaded and selectors are correct
  async assertLoaded() {
    await expect(this.page.locator('h1')).toHaveText('Login');
  }
}

// login.spec.ts (Test Script)
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test('valid user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.assertLoaded(); // sanity check

  await loginPage.login('validUser', 'validPassword');

  // Business assertion: verifies actual feature behavior
  await expect(page.locator('text=Welcome')).toBeVisible();
});





