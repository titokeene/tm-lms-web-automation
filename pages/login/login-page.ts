import { expect, type Locator, type Page } from "@playwright/test";
import { paths } from "../../variables/paths";

export class LoginPage {
    readonly page: Page;
    readonly tmLogo: Locator;
    readonly loginHeader: Locator;
    readonly emailLabel: Locator;
    readonly emailInput: Locator;
    readonly passwordLabel: Locator;
    readonly passwordInput: Locator;
    // readonly hidePW: Locator;
    readonly forgotPassword: Locator;
    readonly loginButton: Locator;
    readonly invalidCredentialsToastMessage: Locator;

    //Success Toast Message Variables
    // readonly validCredentialsToastMessage: Locator;
    // readonly successToastIcon: Locator;

    constructor(page: Page) {
        this.page = page;

        this.tmLogo = page.getByRole("img", {
            name: "Tax Maverick LMS",
        });
        this.loginHeader = page.getByRole("heading", {
            name: "Welcome back to TM LMS",
        });
        this.emailLabel = page.getByText('Email', { 
            exact: true 
        });
        this.emailInput = page.getByRole("textbox", {
            name: "Email"
        });
        this.passwordLabel = page.getByText('Password', { 
            exact: true 
        });
        // this.hidePW = page.getByRole('button').filter({ 
        //     hasText: /^$/ 
        // });
        this.passwordInput = page.getByRole("textbox", {
            name: "Enter your password",      
        });
        this.forgotPassword = page.getByRole("button", {
            name: "Forgot your password?"
        });
        this.loginButton = page.getByRole("button", {
            name: "Login"
        });
        this.invalidCredentialsToastMessage = page.locator('div').filter({ 
            hasText: 'Invalid email or password' 
        }).nth(3)
    }

    async goto() {
        await this.page.goto(process.env.TESTING_ENV!); //Only navigated to base URL, it should automatically redirect to sign in page
        await expect(this.page).toHaveURL(process.env.TESTING_ENV! + paths.login_page);
    }

    async assertElements() {
        //Repititive
        // await expect(this.loginHeader).toBeVisible();
        // await expect(this.emailInput).toBeVisible();
        // await expect(this.passwordInput).toBeVisible();
        // await expect(this.loginButton).toBeVisible();

        //Usage of For Loop
        for (const element of [
            this.tmLogo,
            this.loginHeader,
            this.emailLabel,
            this.emailInput,
            this.passwordLabel,
            this.passwordInput,
            this.forgotPassword,
            this.loginButton]) {
            await expect(element).toBeVisible();
        }

        //Only inputs, to include labels and other elements when login page is finalized

        //Can be written in the ff. approaches:
        //For Loop
        // async assertElements() {
        //     const elements = [
        //         this.loginHeader,
        //         this.emailInput,
        //         this.passwordInput,
        //         this.loginButton,
        //     ];

        //     for (const el of elements) {
        //         await expect(el).toBeVisible();
        //     }
        // }

        // Faster w/ Promise.all 
        //👉 Faster, but be careful: if one fails, Playwright will still evaluate the others before throwing the error. Sometimes that’s useful, sometimes noisy.
        // async assertElements() {
        //     await Promise.all([
        //         expect(this.loginHeader).toBeVisible(),
        //         expect(this.emailInput).toBeVisible(),
        //         expect(this.passwordInput).toBeVisible(),
        //         expect(this.loginButton).toBeVisible(),
        //     ]);
        // }
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    //Credentials Validation Methods
    async assertInvalidCredentials() {
        await expect(this.invalidCredentialsToastMessage).toBeVisible();
    }
    // async assertValidCredentials() {
    //     await expect(this.invalidCredentialsToastMessage).not.toBeVisible();
    // }
}