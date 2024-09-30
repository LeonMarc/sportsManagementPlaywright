// src/utils/userUtils.ts

import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Generates a unique email address using a UUID
export function generateUniqueEmail(): string {
  const uniqueIdentifier = uuidv4();
  return `user-${uniqueIdentifier}@example.com`;
}

// Generates a unique username using a UUID
export function generateUsername(): string {
  return `user-${uuidv4()}`;
}

// Generates a random password using a cryptographically secure method
export function generatePassword(): string {
  return crypto.randomBytes(8).toString('hex');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to save user data to a JSON file
export const saveUserData = async (data: object) => {
  const filePath = path.join(__dirname, '..', 'data', 'userData.json'); // Adjust as needed

  try {
    // Ensure that the directory exists
    await fs.ensureDir(path.dirname(filePath));
    // Write the data to the JSON file
    await fs.writeJson(filePath, data, { spaces: 2 });
    console.log('User data saved successfully.');
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

// Generates a unique category name using a UUID
export function generateRandomCategoryName(): string {
  return `category-${uuidv4()}`; // Generate a unique category name
}

// Generates a unique ID using a UUID
export function generateUniqueId(): string {
  return uuidv4(); // Generate a unique ID
}


