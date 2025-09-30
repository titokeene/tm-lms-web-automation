import { expect, type Locator, type Page } from "@playwright/test";
import { paths } from "../../variables/paths";

export class CreateCourseDetailsPage {
    readonly page: Page;
    readonly createCourseHeader: Locator;
    readonly detailsTab: Locator;
    readonly courseTitleLabel: Locator;
    readonly courseTitle: Locator;
    readonly courseDescLabel: Locator;
    readonly courseDesc: Locator;

    constructor(page: Page) {
        this.page = page;

        this.createCourseHeader = page.getByRole("heading", {
            name: "Create Course",
        });
        this.detailsTab = page.getByRole('tab', { 
            name: 'Details' 
        });
        this.courseTitleLabel = page.getByText('Course Title');
        this.courseTitle = page.getByPlaceholder('Enter course title');
        this.courseDescLabel = page.getByLabel('Course Description *');
        this.courseDesc = page.getByPlaceholder('Enter course description');

        //To Add:
        // Add locators for the following:
        // - Empty States
    }

    // async goto() {
    //     await this.page.goto(process.env.TESTING_ENV! + paths.sa_dashboard); //Only navigated to base URL, it should automatically redirect to sign in page
    //     await expect(this.page).toHaveURL(process.env.TESTING_ENV! + paths.sa_dashboard);
    // }

    async assertCoursesPage() {
        await expect(this.page).toHaveURL(process.env.TESTING_ENV! + paths.sa_courses);
        await expect(this.createCourseHeader).toBeVisible();
    }
}