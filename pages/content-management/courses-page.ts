import { expect, type Locator, type Page } from "@playwright/test";
import { paths } from "../../variables/paths";

export class CoursesPage {
    readonly page: Page;
    readonly coursesHeader: Locator;
    readonly createCourseBtn: Locator;
    readonly searchCourse: Locator;
    readonly allStatusFilter: Locator;
    readonly publishedStatusFilter: Locator;
    readonly draftStatusFilter: Locator;
    readonly exportBtn: Locator;
    readonly nameColumn: Locator;
    readonly publishStatusColumn: Locator;
    readonly actionColumn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.coursesHeader = page.getByRole("heading", {
            name: "All Courses",
        });
        this.createCourseBtn = page.getByRole('button', { 
            name: 'Create Course' 
        });
        this.searchCourse = page.getByRole('textbox', { 
            name: 'Search for courses' 
        });
        this.allStatusFilter = page.getByRole('button', { 
            name: 'All' //Not Final, need to use right locator, such as class type
        });
        this.publishedStatusFilter = page.getByRole('button', { 
            name: 'Published' //Not Final, need to use right locator, such as class type
        });
        this.draftStatusFilter = page.getByRole('button', { 
            name: 'Draft' //Not Final, need to use right locator, such as class type
        });
        this.exportBtn = page.getByRole('button', { 
            name: 'Export' 
        });
        this.nameColumn = page.getByRole('cell', { 
            name: 'Name' 
        });
        this.publishStatusColumn = page.getByRole('cell', { 
            name: 'Publish Status' 
        });
        this.actionColumn = page.getByRole('cell', { 
            name: 'Action' 
        });

        //To Add:
        // Add locators for the following:
        // - Empty States
    }

    // async goto() {
    //     await this.page.goto(process.env.TESTING_ENV! + paths.sa_dashboard); //Only navigated to base URL, it should automatically redirect to sign in page
    //     await expect(this.page).toHaveURL(process.env.TESTING_ENV! + paths.sa_dashboard);
    // }

    async assertCoursesPage() {
        await expect(this.coursesHeader).toBeVisible();
        await expect(this.page).toHaveURL(process.env.TESTING_ENV! + paths.sa_courses);
    }
}