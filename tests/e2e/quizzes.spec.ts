//Library Imports
import { expect, test } from '@playwright/test';

//Pages
import { LoginPage } from '../../pages/login/login-page';
import { CoursesPage } from '../../pages/content-management/Courses/courses-page';
import { CreateCourseDetailsPage } from '../../pages/content-management/Courses/create-course-details';

import { paths } from '../../variables/paths';

//Components
import { SideBar } from '../../components/auth-sidebar';

//Credentials/Mock Data
import { adminCredentials } from '../../variables/login';
import { courseDetails } from '../../variables/test-data';


test.beforeEach(async ({ page }) => {
    // Runs before each test and signs in each page.
    const initLogin = new LoginPage(page);

    await initLogin.goto();
    await initLogin.assertElements();
    await initLogin.login(
        adminCredentials.EMAIL,
        adminCredentials.PASSWORD
    );
    await expect(page).toHaveURL(process.env.TESTING_ENV! + paths.sa_courses);
    //Add assertion later here that when in the courses page, the courses navoption is active
});

test("Go to Courses page", async ({ page }) => {

    //Initialize pages
    const sideBar = new SideBar(page);
    const coursesPage = new CoursesPage(page);

    //Debugging Line
    console.log(await page.getByRole('link', { name: 'Courses' }).count()); //This is debugger to check if the locator is found. If 0, it means wrong locator, if >1 Playwright is confused which one to click

    await sideBar.goToCourses();
    await coursesPage.assertCoursesPage();
});

test("Create Courses", async ({ page }) => {

    //Initialize pages
    const sideBar = new SideBar(page);
    const coursesPage = new CoursesPage(page);
    const createCoursePage = new CreateCourseDetailsPage(page);

    await sideBar.goToCourses();
    await coursesPage.assertCoursesPage();
    await coursesPage.createCourseBtn.click();
    await expect(page).toHaveURL(process.env.TESTING_ENV! + paths.sa_create_course);
    //Add more steps here for creating course

    await createCoursePage.assertCreateCourseDetailsPage();
    await createCoursePage.courseDetails(
        courseDetails.COURSE_TITLE,
        courseDetails.COURSE_DESC,
        courseDetails.COURSE_FEE,
        courseDetails.COURSE_BANNER
    );
    await createCoursePage.assertCreatedCourseDetails(
        courseDetails.COURSE_TITLE,
        courseDetails.COURSE_DESC,
        courseDetails.COURSE_FEE
    );
});

