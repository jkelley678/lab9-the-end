/**
 * StorageService - Handles localStorage operations for the TODO app
 */
export class StorageService {
  /**
   * Creates an instance of StorageService
   * @param {string} [storageKey='todos'] - The base key prefix for localStorage
   */
  constructor(storageKey = 'todos') {
    this.storageKey = storageKey;
  }

  /**
   * Save data to localStorage
   * 
   * @param {string} k - The key suffix to use for storage
   * @param {*} d - The data to save (will be JSON stringified)
   */
  save(k, d) {
    try {
      const fk = `${this.storageKey}_${k}`;
      localStorage.setItem(fk, JSON.stringify(d));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  /**
   * Load data from localStorage
   * Retrieves and parses JSON data from localStorage
   * 
   * @param {string} key - The key suffix to load from storage
   * @param {*} [defaultValue=null] - The default value to return if key doesn't exist
   * @returns {*} The parsed data from localStorage or the defaultValue
   */
  load(key, defaultValue = null) {
    try {
      const fullKey = `${this.storageKey}_${key}`;
      const item = localStorage.getItem(fullKey);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return defaultValue;
    }
  }

  /**
   * Remove data from localStorage
   * 
   * @param {string} k - The key suffix to remove from storage
   */
  remove(k) {
    try {
      const fullK = `${this.storageKey}_${k}`;
      localStorage.removeItem(fullK);
    } catch (e) {
      console.error('Failed to remove from localStorage:', e);
    }
  }

  /**
   * Clear all data for this app
   */
  clear() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.storageKey)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
}
