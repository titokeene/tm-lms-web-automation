export const courseDetails = {
    COURSE_TITLE: `LMS Test Course 0.0.10 - ID ${crypto.randomUUID()}`,
    COURSE_DESC: `LMS Test Course Description 0.0.10 - ID ${crypto.randomUUID()}`,
    COURSE_FEE: Math.floor(Math.random() * 500) + 50,
    // get COURSE_BANNER(): string {
    //     const color = (Math.random() * 0xFFFFFF | 0).toString(16).padStart(6, '0');
    //     return `data:image/svg+xml;base64,${btoa(`<svg width="800" height="200"><rect width="100%" height="100%" fill="#${color}"/></svg>`)}`;
    // }
    COURSE_BANNER: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='

    //TO DO
    // Make the UID for the test data based on the latest build version of the app
    // Locate the locator in the /version page for the app version
    // Once located it should be automatically parsed here
}