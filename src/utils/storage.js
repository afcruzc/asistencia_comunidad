import React, { useState, useEffect } from 'react';

export const useStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error("[useStorage] Error reading from localStorage", error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // console.log(`[useStorage] Guardando en localStorage para key '${key}':`, value); // Descomentar para depuración
    } catch (error) {
      console.error("[useStorage] Error writing to localStorage", error);
    }
  }, [key, value]);

  return [value, setValue];
};

export const getStorageItem = (key) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error("[useStorage] Error getting item from localStorage", error);
    return null;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // console.log(`[useStorage] Estableciendo directamente en localStorage para key '${key}':`, value); // Descomentar para depuración
  }
  catch (error) {
    console.error("[useStorage] Error setting item in localStorage", error);
  }
};