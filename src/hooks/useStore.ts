 import { useState, useEffect, useCallback } from "react";
 import {
   StoreSettings,
   Category,
   Product,
   DEFAULT_STORE_SETTINGS,
   DEFAULT_CATEGORIES,
   DEFAULT_PRODUCTS,
 } from "@/types/menu";
 
 const STORAGE_KEYS = {
   SETTINGS: "menu_store_settings",
   CATEGORIES: "menu_categories",
   PRODUCTS: "menu_products",
 };
 
 function loadFromStorage<T>(key: string, defaultValue: T): T {
   try {
     const stored = localStorage.getItem(key);
     return stored ? JSON.parse(stored) : defaultValue;
   } catch {
     return defaultValue;
   }
 }
 
 function saveToStorage<T>(key: string, value: T): void {
   try {
     localStorage.setItem(key, JSON.stringify(value));
   } catch (error) {
     console.error("Error saving to localStorage:", error);
   }
 }
 
 export function useStoreSettings() {
   const [settings, setSettings] = useState<StoreSettings>(() =>
     loadFromStorage(STORAGE_KEYS.SETTINGS, DEFAULT_STORE_SETTINGS)
   );
 
   const updateSettings = useCallback((newSettings: Partial<StoreSettings>) => {
     setSettings((prev) => {
       const updated = { ...prev, ...newSettings };
       saveToStorage(STORAGE_KEYS.SETTINGS, updated);
       return updated;
     });
   }, []);
 
   return { settings, updateSettings };
 }
 
 export function useCategories() {
   const [categories, setCategories] = useState<Category[]>(() =>
     loadFromStorage(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES)
   );
 
   const addCategory = useCallback((name: string) => {
     setCategories((prev) => {
       const newCategory: Category = {
         id: Date.now().toString(),
         name,
         order: prev.length,
       };
       const updated = [...prev, newCategory];
       saveToStorage(STORAGE_KEYS.CATEGORIES, updated);
       return updated;
     });
   }, []);
 
   const updateCategory = useCallback((id: string, name: string) => {
     setCategories((prev) => {
       const updated = prev.map((cat) =>
         cat.id === id ? { ...cat, name } : cat
       );
       saveToStorage(STORAGE_KEYS.CATEGORIES, updated);
       return updated;
     });
   }, []);
 
   const deleteCategory = useCallback((id: string) => {
     setCategories((prev) => {
       const updated = prev.filter((cat) => cat.id !== id);
       saveToStorage(STORAGE_KEYS.CATEGORIES, updated);
       return updated;
     });
   }, []);
 
   return { categories, addCategory, updateCategory, deleteCategory };
 }
 
 export function useProducts() {
   const [products, setProducts] = useState<Product[]>(() =>
     loadFromStorage(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS)
   );
 
   const addProduct = useCallback((product: Omit<Product, "id">) => {
     setProducts((prev) => {
       const newProduct: Product = {
         ...product,
         id: Date.now().toString(),
       };
       const updated = [...prev, newProduct];
       saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
       return updated;
     });
   }, []);
 
   const updateProduct = useCallback(
     (id: string, data: Partial<Omit<Product, "id">>) => {
       setProducts((prev) => {
         const updated = prev.map((prod) =>
           prod.id === id ? { ...prod, ...data } : prod
         );
         saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
         return updated;
       });
     },
     []
   );
 
   const deleteProduct = useCallback((id: string) => {
     setProducts((prev) => {
       const updated = prev.filter((prod) => prod.id !== id);
       saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
       return updated;
     });
   }, []);
 
   return { products, addProduct, updateProduct, deleteProduct };
 }