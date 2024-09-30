import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage'; 
import { CategoryPage } from '../pages/categoryPage'; 

// Helper function to create a subcategory and verify its existence
async function createAndVerifySubCategory(page: Page, token: string, parentId: string) {
    const categoryPage = new CategoryPage(page, token);
    // Create the subcategory
    const newSubCategory = await categoryPage.createSubCategory(parentId);
    // Verify that the subcategory has the expected properties
    expect(newSubCategory).toHaveProperty('id');
    expect(newSubCategory).toHaveProperty('name');
    expect(newSubCategory.parentId).toBe(parentId); 
    expect(newSubCategory).toHaveProperty('root', false); 

    // Verify that the subcategory actually exists
    const subCategoryExists = await categoryPage.verifySubCategoryExists(parentId, newSubCategory.name);
    expect(subCategoryExists).toBe(true);
}

test('Register, log in, and create a subcategory', async ({ page }) => {
    // Create a new instance of the LoginPage
    const loginPage = new LoginPage(page); 
    // Register and log in to get the token and userId
    const { token, userId } = await loginPage.registerAndLogin();

    // Ensure that the token and userId are defined
    expect(token).toBeDefined(); 
    expect(userId).toBeDefined(); 

    // Create a parent category
    const categoryPage = new CategoryPage(page, token);
    const createdCategory = await categoryPage.createRandomCategory();
    const parentId = createdCategory.id;

    // Call the helper function to create and verify the subcategory
    await createAndVerifySubCategory(page, token, parentId); 

    // UI tests
    await loginPage.validateLoginPageElements()
});
