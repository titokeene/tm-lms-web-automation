import { expect, type Locator, type Page } from "@playwright/test";
import { paths } from "../variables/paths";

export class SideBar {
    readonly page: Page;
    readonly lmsLogo: Locator;
    readonly contentMngmt: Locator;
    // readonly dashboard: Locator;
    readonly coursesBtn: Locator;
    readonly quizzes: Locator;
    readonly userMngmt: Locator;
    readonly admins: Locator;
    readonly learners: Locator;
    readonly profile: Locator;
    readonly backToTM: Locator;
    readonly logoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.lmsLogo = page.getByRole('img', { name: 'TM' });
        this.contentMngmt = page.getByText('Content Management');
        // this.dashboard = page.getByRole('link', { name: 'Dashboard' });
        this.coursesBtn = page.getByRole('link', { name: 'Courses' });
        this.quizzes = page.getByRole('link', { name: 'Quizzes' });
        this.userMngmt = page.getByText('User Management');
        this.admins = page.getByRole('link', { name: 'Admins' });
        this.learners = page.getByRole('link', { name: 'Learners' });
        this.profile = page.getByRole('link', { name: 'Profile' });
        this.backToTM = page.locator('div').filter({ hasText: /^Back to TM$/ });
        this.logoutBtn = page.getByRole('button', { name: 'Log out' });
    }

    async goToCourses() {
        await expect(this.coursesBtn).toBeVisible();
        await this.coursesBtn.click({ 
            // Using { force: true } because Playwright detects the element as not fully interactable
            // (e.g., due to animation, overlay, or hidden state). This bypasses checks and fires the click directly.
            force: true 
        });
        await expect(this.page).toHaveURL(process.env.TESTING_ENV! + paths.sa_courses);
    }

    async logout() {
        await this.logoutBtn.click({ 
            // Using { force: true } because Playwright detects the element as not fully interactable
            // (e.g., due to animation, overlay, or hidden state). This bypasses checks and fires the click directly.
            force: true 
        });
        await expect(this.page).toHaveURL(process.env.TESTING_ENV! + paths.login_page);
    }
}
