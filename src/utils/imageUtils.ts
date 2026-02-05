 const MAX_WIDTH = 300;
 const MAX_HEIGHT = 300;
 const QUALITY = 0.7;
 
 export async function resizeImage(file: File): Promise<string> {
   return new Promise((resolve, reject) => {
     const reader = new FileReader();
     
     reader.onload = (e) => {
       const img = new Image();
       
       img.onload = () => {
         const canvas = document.createElement("canvas");
         let width = img.width;
         let height = img.height;
         
         // Calculate new dimensions
         if (width > height) {
           if (width > MAX_WIDTH) {
             height = Math.round((height * MAX_WIDTH) / width);
             width = MAX_WIDTH;
           }
         } else {
           if (height > MAX_HEIGHT) {
             width = Math.round((width * MAX_HEIGHT) / height);
             height = MAX_HEIGHT;
           }
         }
         
         canvas.width = width;
         canvas.height = height;
         
         const ctx = canvas.getContext("2d");
         if (!ctx) {
           reject(new Error("Failed to get canvas context"));
           return;
         }
         
         ctx.drawImage(img, 0, 0, width, height);
         
         const base64 = canvas.toDataURL("image/jpeg", QUALITY);
         resolve(base64);
       };
       
       img.onerror = () => reject(new Error("Failed to load image"));
       img.src = e.target?.result as string;
     };
     
     reader.onerror = () => reject(new Error("Failed to read file"));
     reader.readAsDataURL(file);
   });
 }
 
 export function formatPrice(price: number): string {
   return `R$ ${price.toFixed(2).replace(".", ",")}`;
 }
 
 export function isStoreOpen(openTime: string, closeTime: string): boolean {
   const now = new Date();
   const currentMinutes = now.getHours() * 60 + now.getMinutes();
   
   const [openHour, openMin] = openTime.split(":").map(Number);
   const [closeHour, closeMin] = closeTime.split(":").map(Number);
   
   const openMinutes = openHour * 60 + openMin;
   const closeMinutes = closeHour * 60 + closeMin;
   
   // Handle overnight hours (e.g., 18:00 - 02:00)
   if (closeMinutes < openMinutes) {
     return currentMinutes >= openMinutes || currentMinutes <= closeMinutes;
   }
   
   return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
 }