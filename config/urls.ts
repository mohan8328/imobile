/** Remote banking-style JSON (edit on GitHub → raw URL updates the app after refresh). */
export const BANKING_JSON_URL =
  typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_BANKING_JSON_URL
    ? process.env.EXPO_PUBLIC_BANKING_JSON_URL
    : 'https://raw.githubusercontent.com/mohan8328/imobile/main/mock-api/banking.json';
