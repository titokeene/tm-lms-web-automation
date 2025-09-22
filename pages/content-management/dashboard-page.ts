import { expect, type Locator, type Page } from "@playwright/test";
import { paths } from "../../variables/paths";

export class DashboardPage {
    readonly page: Page;
    readonly loginHeader: Locator;

    constructor(page: Page) {
        this.page = page;

        this.loginHeader = page.getByRole("heading", {
            name: "Dashboard",
        });
    }

    // async goto() {
    //     await this.page.goto(process.env.TESTING_ENV! + paths.sa_dashboard); //Only navigated to base URL, it should automatically redirect to sign in page
    //     await expect(this.page).toHaveURL(process.env.TESTING_ENV! + paths.sa_dashboard);
    // }

    async assertElements() {
        await expect(this.loginHeader).toBeVisible();
    }
}