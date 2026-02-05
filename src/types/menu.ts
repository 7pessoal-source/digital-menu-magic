 export interface StoreSettings {
   name: string;
   whatsapp: string;
   openTime: string;
   closeTime: string;
 }
 
 export interface Category {
   id: string;
   name: string;
   order: number;
 }
 
 export interface Product {
   id: string;
   name: string;
   price: number;
   categoryId: string;
   image: string;
   featured: boolean;
 }
 
 export interface CartItem {
   product: Product;
   quantity: number;
 }
 
 export interface Cart {
   items: CartItem[];
   observation: string;
 }
 
 export const DEFAULT_STORE_SETTINGS: StoreSettings = {
   name: "Sabor & Arte",
   whatsapp: "5511999999999",
   openTime: "08:00",
   closeTime: "22:00",
 };
 
 export const DEFAULT_CATEGORIES: Category[] = [
   { id: "1", name: "Lanches", order: 0 },
   { id: "2", name: "Bebidas", order: 1 },
   { id: "3", name: "Sobremesas", order: 2 },
 ];
 
 export const DEFAULT_PRODUCTS: Product[] = [
   {
     id: "1",
     name: "X-Burguer Artesanal",
     price: 28.9,
     categoryId: "1",
     image: "",
     featured: true,
   },
   {
     id: "2",
     name: "X-Bacon Especial",
     price: 32.9,
     categoryId: "1",
     image: "",
     featured: true,
   },
   {
     id: "3",
     name: "Wrap de Frango",
     price: 24.9,
     categoryId: "1",
     image: "",
     featured: false,
   },
   {
     id: "4",
     name: "Suco Natural",
     price: 12.9,
     categoryId: "2",
     image: "",
     featured: false,
   },
   {
     id: "5",
     name: "Refrigerante",
     price: 7.9,
     categoryId: "2",
     image: "",
     featured: false,
   },
   {
     id: "6",
     name: "Brownie com Sorvete",
     price: 18.9,
     categoryId: "3",
     image: "",
     featured: true,
   },
 ];