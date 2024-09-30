import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class DashboardPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async validateDashboardUrl() {
    await expect(this.page).toHaveURL('https://club-administration.qa.qubika.com/#/dashboard');
    }
    
    //Locators
    get totalContributorsDashboard() {
    return this.page.locator('.col-xl-8.mb-5.mb-xl-0');
    }

    get logoQubikaDashboard() {
    return this.page.locator('.navbar-brand.pt-0.active');
    }
    
    get leftMenuDashboard() {
    return this.page.locator('#sidenav-main');
    }

    get totalPartners() {
    return this.page.locator('.col-xl-4');
    }
    
    get siteViews() {
    return this.page.locator('.col-xl-12.mb-5.mb-xl-0');
    }

    get categoryTypes() {
    return this.page.locator('a[href="#/category-type"]');
    }

    //Validate
    async validateDashboardElements() {
        await expect(this.totalContributorsDashboard).toBeVisible();
        await expect(this.logoQubikaDashboard).toBeVisible();
        await expect(this.leftMenuDashboard).toBeVisible();
        await expect(this.totalPartners).toBeVisible();
        await expect(this.siteViews).toBeVisible();
        await expect(this.categoryTypes).toBeVisible()
        await this.categoryTypes.click();
    }
}