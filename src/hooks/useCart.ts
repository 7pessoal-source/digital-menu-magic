 import { useState, useCallback, useMemo } from "react";
 import { CartItem, Product } from "@/types/menu";
 
 export function useCart() {
   const [items, setItems] = useState<CartItem[]>([]);
   const [observation, setObservation] = useState("");
   const [isOpen, setIsOpen] = useState(false);
 
   const addToCart = useCallback((product: Product) => {
     setItems((prev) => {
       const existing = prev.find((item) => item.product.id === product.id);
       if (existing) {
         return prev.map((item) =>
           item.product.id === product.id
             ? { ...item, quantity: item.quantity + 1 }
             : item
         );
       }
       return [...prev, { product, quantity: 1 }];
     });
   }, []);
 
   const removeFromCart = useCallback((productId: string) => {
     setItems((prev) => prev.filter((item) => item.product.id !== productId));
   }, []);
 
   const updateQuantity = useCallback((productId: string, quantity: number) => {
     if (quantity <= 0) {
       setItems((prev) => prev.filter((item) => item.product.id !== productId));
     } else {
       setItems((prev) =>
         prev.map((item) =>
           item.product.id === productId ? { ...item, quantity } : item
         )
       );
     }
   }, []);
 
   const clearCart = useCallback(() => {
     setItems([]);
     setObservation("");
   }, []);
 
   const totalItems = useMemo(
     () => items.reduce((sum, item) => sum + item.quantity, 0),
     [items]
   );
 
   const totalPrice = useMemo(
     () =>
       items.reduce(
         (sum, item) => sum + item.product.price * item.quantity,
         0
       ),
     [items]
   );
 
   const generateWhatsAppMessage = useCallback(
     (storeName: string) => {
       let message = `🍽️ *Pedido - ${storeName}*\n\n`;
       message += "📋 *Itens do Pedido:*\n";
 
       items.forEach((item) => {
         const itemTotal = item.product.price * item.quantity;
         message += `• ${item.quantity}x ${item.product.name} - R$ ${itemTotal.toFixed(2).replace(".", ",")}\n`;
       });
 
       message += `\n💰 *Total: R$ ${totalPrice.toFixed(2).replace(".", ",")}*`;
 
       if (observation.trim()) {
         message += `\n\n📝 *Observação:* ${observation}`;
       }
 
       return encodeURIComponent(message);
     },
     [items, observation, totalPrice]
   );
 
   return {
     items,
     observation,
     setObservation,
     isOpen,
     setIsOpen,
     addToCart,
     removeFromCart,
     updateQuantity,
     clearCart,
     totalItems,
     totalPrice,
     generateWhatsAppMessage,
   };
 }