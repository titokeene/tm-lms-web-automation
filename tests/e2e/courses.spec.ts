//Library Imports
import { expect, test } from '@playwright/test';

//Pages
import { LoginPage } from '../../pages/login/login-page';
import { DashboardPage } from '../../pages/content-management/dashboard-page';
import { CoursesPage } from '../../pages/content-management/courses-page';

import { paths } from '../../variables/paths';

//Components
import { SideBar } from '../../components/auth-sidebar';

//Credentials
import { adminCredentials } from '../../variables/login';

test.beforeEach(async ({ page }) => {
    // Runs before each test and signs in each page.
    const initLogin = new LoginPage(page);
    await initLogin.goto();
    await initLogin.assertElements();
    await initLogin.login(
        adminCredentials.EMAIL,
        adminCredentials.PASSWORD
    );
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.assertElements();
    await expect(page).toHaveURL(process.env.TESTING_ENV! + paths.sa_dashboard);
    //Add assertion later here that when in the courses page, the courses navoption is active
});

// Login validation using correct credentials
test("Go to Courses page", async ({ page }) => {

    //Initialize pages
    const sideBar = new SideBar(page);
    const coursesPage = new CoursesPage(page);

    //Debugging Line
    console.log(await page.getByRole('link', { name: 'Courses' }).count()); //This is debugger to check if the locator is found. If 0, it means wrong locator, if >1 Playwright is confused which one to click

    await sideBar.goToCourses();
    await expect(page).toHaveURL(process.env.TESTING_ENV! + paths.sa_courses);
});

