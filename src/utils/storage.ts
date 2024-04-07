import CryptoJS from 'crypto-js';
import { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage';
import { storageKey } from './env';
import { trackError } from './error';

export const storage: SyncStorage<any> = {
  getItem: (key, initialValue) => {
    try {
      const encryptedValue = localStorage.getItem(key) as string;
      if (encryptedValue) {
        const bytes = CryptoJS.AES.decrypt(encryptedValue, storageKey);
        const originalValue = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(originalValue);
      }

      return initialValue;
    } catch (error) {
      trackError(error as Error);
      return initialValue;
    }
  },
  setItem: async (key, value) => {
    const encryptedValue = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      storageKey,
    ).toString();
    localStorage.setItem(key, encryptedValue);
  },
  removeItem(key) {
    return localStorage.removeItem(key);
  },
};
