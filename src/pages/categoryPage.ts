import { Page } from '@playwright/test';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { generateRandomCategoryName, generateUniqueId } from '../utils/userUtils';

export class CategoryPage {
    private page: Page;
    private authToken: string;

    constructor(page: Page, authToken: string) {
        this.page = page;
        this.authToken = authToken;
    }

    // Method to create a new category
    async createRandomCategory(): Promise<{ id: string; name: string; parentId: string; root: boolean }> {
        const categoryName = generateRandomCategoryName();
        const categoryDto = {
            id: generateUniqueId(),
            name: categoryName,
            parentId: null, // Parent ID is null for root categories
            root: true,
        };

        const response = await this.page.request.post(API_ENDPOINTS.createCategory, {
            headers: {
                'Authorization': `Bearer ${this.authToken}`,
            },
            data: categoryDto,
        });

        const responseData = await response.json();
        console.log('Category created successfully:', responseData);

        // Ensure that id, name, parentId and root are present in the response
        if (!responseData.id) {
            throw new Error(`The category creation response does not contain a valid ID.`);
        }

        return responseData; // Return the data of the created category
    }

    // Method to create a subcategory
    async createSubCategory(parentId: string): Promise<{ id: string; name: string; parentId: string; root: boolean }> {
        const categoryName = generateRandomCategoryName();
        const categoryDto = {
            id: generateUniqueId(),
            name: categoryName,
            parentId: parentId, // Set the parent ID for the subcategory
            root: false, // Indicates this is a subcategory
        };

        const response = await this.page.request.post(API_ENDPOINTS.createCategory, {
            headers: {
                'Authorization': `Bearer ${this.authToken}`,
            },
            data: categoryDto,
        });

        if (!response.ok()) {
            throw new Error(`Error creating the subcategory: ${response.status()}`);
        }

        const responseData = await response.json();
        console.log(`Subcategory created successfully: ${responseData.name}`);

        return responseData;
    }

    // Method to verify if a subcategory exists by its ID
    async verifySubCategoryExists(parentId: string, subCategoryName: string): Promise<boolean> {
        // Construct the endpoint URL using the parent ID
        const subCategoryListEndpoint = API_ENDPOINTS.subCategoryList.replace('{parentId}', parentId);
        const response = await this.page.request.get(subCategoryListEndpoint, {
            headers: {
                'Authorization': `Bearer ${this.authToken}`,
            }
        });

        if (!response.ok()) {
            throw new Error(`Error getting the list of subcategories: ${response.status()}`);
        }

        const subCategories = await response.json();
        return subCategories.some(category => category.name === subCategoryName);
    }
    
}
