import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-change-in-production-32chars!!';

/**
 * Encrypts data using AES encryption
 */
export function encryptData(data: string, key?: string): string {
  const encryptionKey = key || ENCRYPTION_KEY;
  return CryptoJS.AES.encrypt(data, encryptionKey).toString();
}

/**
 * Decrypts data using AES encryption
 */
export function decryptData(encryptedData: string, key?: string): string {
  const encryptionKey = key || ENCRYPTION_KEY;
  const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

/**
 * Generates a random encryption key for per-report encryption
 */
export function generateEncryptionKey(): string {
  return CryptoJS.lib.WordArray.random(256/8).toString();
}

/**
 * Generates an anonymous report ID
 */
export function generateAnonymousId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  return `RPT-${timestamp}-${random}`.toUpperCase();
}

/**
 * Generates an anonymous story ID
 */
export function generateStoryId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  return `STY-${timestamp}-${random}`.toUpperCase();
}

/**
 * Anonymizes text content by removing identifying information
 */
export function anonymizeText(text: string): string {
  // Remove email patterns
  let anonymized = text.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]');
  
  // Remove phone patterns
  anonymized = anonymized.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[PHONE]');
  
  // Remove common names (basic pattern)
  // In production, use a more sophisticated NLP approach
  
  return anonymized;
}


