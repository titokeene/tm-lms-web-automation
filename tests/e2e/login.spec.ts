//Library Imports
import { expect, test } from '@playwright/test';

//Pages
import { LoginPage } from '../../pages/login/login-page';
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
});

// Login validation using correct credentials
test("Login with valid credentials + Logout", async ({ page }) => {

    //Initialize pages
    const validLogin = new LoginPage(page);
    const sideBar = new SideBar(page);
    const coursesPage = new CoursesPage(page);

    await validLogin.login(
        adminCredentials.EMAIL,
        adminCredentials.PASSWORD
    );

    await coursesPage.assertCoursesPage();
    await expect(page).toHaveURL(process.env.TESTING_ENV! + paths.sa_courses);
    await sideBar.logout();
});

// Login validation using incorrect email
test("Login with incorrect email", async ({ page }) => {

    //Initialize pages
    const invalidEmailLogin = new LoginPage(page);

    await invalidEmailLogin.login(
        adminCredentials.EMAIL_INVALID,
        adminCredentials.PASSWORD
    );
    await invalidEmailLogin.assertInvalidCredentials();
});

// Login validation using incorrect password
test("Login with incorrect password", async ({ page }) => {

    //Initialize pages
    const invalidPWLogin = new LoginPage(page);

    await invalidPWLogin.login(
        adminCredentials.EMAIL,
        adminCredentials.PASSWORD_INVALID
    );
    await invalidPWLogin.assertInvalidCredentials();
});
