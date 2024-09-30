import { Page, expect } from '@playwright/test';
import { API_ENDPOINTS } from '../config/apiEndpoints'; // Correct path to your endpoints
import { generateUniqueEmail, generatePassword, generateUsername, saveUserData } from '../utils/userUtils'; // Correct path to your utility functions

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async registerAndLogin(): Promise<{ token: string; userId: string }> {
        // Generate random data for the user
        const email = generateUniqueEmail();
        const password = generatePassword();
        const username = generateUsername();

        // User registration
        const registrationResponse = await this.page.request.post(API_ENDPOINTS.registerUser, {
            data: {
                email: email,
                password: password,
                roles: ["ROLE_ADMIN"],
                firstName: username, // Change according to the context, just as an example
                lastName: "Doe",      // Change according to the context
                userName: username,   // Can use the generated username as an example
                fullName: `${username} Doe` // Customize according to your requirement
            }
        });

        // Validate the registration response
        expect(registrationResponse.ok()).toBe(true); // Verify that the response is successful
        const registrationData = await registrationResponse.json();
        console.log('Registration Data:', registrationData); // Used to verify the actual structure

        // Make sure the expected properties are present
        expect(registrationData).toHaveProperty('email');
        expect(registrationData).toHaveProperty('firstName');
        expect(registrationData).toHaveProperty('fullName');
        expect(registrationData).toHaveProperty('id');
        expect(registrationData).toHaveProperty('lastName');
        expect(registrationData).toHaveProperty('roles');
        expect(registrationData.roles).toContain("ROLE_ADMIN");
        expect(registrationData).toHaveProperty('userName');

        console.log(`Registration successful: ${registrationData.fullName}`);

        // Save user data (optionally the token if it is required for multi-purpose use)
        await saveUserData({
            email: email,
            password: password,
            username: username,
            userId: registrationData.id // Save the ID of the registered user
        });

        // Login
        const loginResponse = await this.page.request.post(API_ENDPOINTS.loginUser, {
            data: {
                email: email,
                password: password
            }
        });

        // Validate the login response
        expect(loginResponse.ok()).toBe(true); // Verify that the response is successful
        const loginData = await loginResponse.json();
        console.log('Login Data:', loginData); // Used to verify the actual structure

        // Make sure the 'token' property is present
        expect(loginData).toHaveProperty('token'); 
        console.log(`Login successful: ${loginData.token}`);

        // Return the token and user ID
        return {
            token: loginData.token,
            userId: registrationData.id
        };
    }


    // Locators
    get headerQubika() {
        return this.page.locator('.text-center.text-muted.mb-4 h3');
    }

    get smallQubika() {
        return this.page.locator('.text-center.text-muted.mb-4 small');
    }

    get userEmailNameField() {
        return this.page.locator('.form-group.mb-3');
    }

    get emailInput() {
        return this.page.locator('input[formcontrolname="email"]');
    }

    get emailIcon() {
        return this.page.locator('.ni.ni-email-83');
    }

    get passwordField() {
        return this.page.locator('.form-group:not(.mb-3)');
    }

    get passInput() {
        return this.page.locator('input[formcontrolname="password"]');
    }

    get passIcon() {
        return this.page.locator('.ni.ni-lock-circle-open');
    }

    get rememberCheckBox() {
        return this.page.locator('.custom-control-label');
    }

    get logInButton() {
        return this.page.locator('.btn.btn-primary.my-4');
    }

    //Validate
    async validateLoginPageElements() {
        await this.page.goto('https://club-administration.qa.qubika.com/#/auth/login')
        await expect(this.headerQubika).toBeVisible();
        await expect(this.headerQubika).toHaveText('Qubika Club');
        await expect(this.smallQubika).toBeVisible();
        await expect(this.smallQubika).toHaveText('Por favor ingrese correo y contraseña');
        await expect(this.userEmailNameField).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.emailIcon).toBeVisible();
        await expect(this.passwordField).toBeVisible();
        await expect(this.passInput).toBeVisible();
        await expect(this.passIcon).toBeVisible();
        await expect(this.rememberCheckBox).toBeVisible();
        await expect(this.rememberCheckBox).toHaveText('Recordarme');
        await expect(this.logInButton).toBeVisible();
        await expect(this.logInButton).toHaveText('Autenticar');
    }

}
