import { expect, type Locator, type Page } from "@playwright/test";
import { paths } from "../../../variables/paths";

export class CreateCourseDetailsPage {
    readonly page: Page;
    readonly createCourseHeader: Locator;
    readonly detailsTab: Locator;
    readonly courseTitleLabel: Locator;
    readonly courseTitle: Locator;
    readonly courseDescLabel: Locator;
    readonly courseDesc: Locator;
    readonly createCourseBtn: Locator;
    readonly cancelBtn: Locator;
    readonly courseBanner: Locator;
    readonly courseFee: Locator;
    readonly createCourseSuccessToast: Locator;

    constructor(page: Page) {
        this.page = page;

        //Header
        this.createCourseHeader = page.getByRole("heading", {
            name: "Create Course",
        });

        //Tabs 
        this.detailsTab = page.getByRole('tab', {
            name: 'Details'
        });

        //Labels
        this.courseTitleLabel = page.getByText('Course Title');
        this.courseDescLabel = page.getByLabel('Course Description *');

        //Fields
        this.courseTitle = page.getByPlaceholder('Enter course title');
        this.courseDesc = page.getByPlaceholder('Enter course description');
        this.courseBanner = page.getByRole('button', { name: 'Browse files' });
        this.courseFee = page.getByRole('spinbutton', { name: 'Course Fee' });

        //Buttons
        this.createCourseBtn = page.getByRole('button', { name: 'Create Course' });
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });

        //Toasts
        this.createCourseSuccessToast = page.getByText('Course successfully created.');

        //To Add:
        // Add locators for the following:
        // - Empty States
    }
    async assertCreateCourseDetailsPage() {
        await expect(this.page).toHaveURL(process.env.TESTING_ENV! + paths.sa_create_course);
        await expect(this.createCourseHeader).toBeVisible();
    }

    async courseDetails(crsTitle: string, crsDesc: string, crsFee: number, banner: string) {
        await this.courseTitle.fill(crsTitle);
        await this.courseDesc.fill(crsDesc);
        await this.courseFee.fill(crsFee.toString());
        await this.page.setInputFiles('input[type="file"]', {
            name: 'banner.png',
            mimeType: 'image/png',
            buffer: Buffer.from(banner.split(',')[1], 'base64')
        });
        await this.createCourseBtn.click();
        await expect(this.createCourseSuccessToast).toBeVisible();
        await this.page.waitForTimeout(5000);
    }

    async assertCreatedCourseDetails(crsTitle: string, crsDesc: string, crsFee: number) {
        // Extract the UID from the test data
        const titleUID = crsTitle.split(' - ID ')[1];
        const descUID = crsDesc.split(' - ID ')[1];

        console.log('🔍 DEBUG ASSERTIONS:');
        console.log('Expected Title:', JSON.stringify(crsTitle));
        console.log('Expected Desc:', JSON.stringify(crsDesc));
        console.log('Expected Fee:', '$' + crsFee.toString());
        console.log('Title UID:', titleUID);
        console.log('Desc UID:', descUID);

        // Assert Course Title EXACT match
        const actualTitle = await this.page
            .getByLabel('Details')
            .getByRole('heading')
            .textContent();
        console.log('Actual Title:', JSON.stringify(actualTitle));
        expect(actualTitle).toBe(crsTitle);

        // Assert Course Description EXACT match  
        const actualDesc = await this.page
            .getByText(crsDesc)
            .textContent();
        console.log('Actual Desc:', JSON.stringify(actualDesc));
        expect(actualDesc).toBe(crsDesc);

        // Assert Course Fee EXACT match
        const actualFee = await this.page
            .getByText('$' + crsFee.toString())
            .textContent();
        console.log('Actual Fee:', JSON.stringify(actualFee));
        expect(actualFee).toBe('$' + crsFee.toString());

        // UID verification
        console.log('✅ All exact matches passed!');

        await expect(this.page.locator('body')).toContainText(titleUID);
        await expect(this.page.locator('body')).toContainText(descUID);
        console.log('✅ UID verification passed!');
        await this.page.waitForTimeout(10000);
    }
}