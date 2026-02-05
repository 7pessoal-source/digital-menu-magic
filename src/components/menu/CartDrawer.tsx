 import { ShoppingCart, Plus, Minus, Trash2, X, MessageCircle } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { Textarea } from "@/components/ui/textarea";
 import { CartItem } from "@/types/menu";
 import { formatPrice } from "@/utils/imageUtils";
 import { cn } from "@/lib/utils";
 
 interface CartDrawerProps {
   items: CartItem[];
   observation: string;
   isOpen: boolean;
   totalItems: number;
   totalPrice: number;
   storeName: string;
   whatsappNumber: string;
   onSetObservation: (obs: string) => void;
   onSetIsOpen: (open: boolean) => void;
   onUpdateQuantity: (productId: string, quantity: number) => void;
   onRemoveFromCart: (productId: string) => void;
   onClearCart: () => void;
   generateWhatsAppMessage: (storeName: string) => string;
 }
 
 export function CartDrawer({
   items,
   observation,
   isOpen,
   totalItems,
   totalPrice,
   storeName,
   whatsappNumber,
   onSetObservation,
   onSetIsOpen,
   onUpdateQuantity,
   onRemoveFromCart,
   onClearCart,
   generateWhatsAppMessage,
 }: CartDrawerProps) {
   const handleFinishOrder = () => {
     if (items.length === 0) return;
 
     const message = generateWhatsAppMessage(storeName);
     const cleanNumber = whatsappNumber.replace(/\D/g, "");
     window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
     onClearCart();
     onSetIsOpen(false);
   };
 
   return (
     <>
       {/* Floating Cart Button */}
       <Button
         className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
         onClick={() => onSetIsOpen(true)}
       >
         <ShoppingCart className="w-6 h-6" />
         {totalItems > 0 && (
           <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground h-6 w-6 p-0 flex items-center justify-center">
             {totalItems}
           </Badge>
         )}
       </Button>
 
       {/* Overlay */}
       {isOpen && (
         <div
           className="fixed inset-0 z-50 bg-black/50 animate-fade-in"
           onClick={() => onSetIsOpen(false)}
         />
       )}
 
       {/* Drawer */}
       <div
         className={cn(
           "fixed top-0 right-0 z-50 h-full w-full max-w-md bg-card border-l shadow-2xl transition-transform duration-300 ease-out flex flex-col",
           isOpen ? "translate-x-0" : "translate-x-full"
         )}
       >
         {/* Header */}
         <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
           <div className="flex items-center gap-2">
             <ShoppingCart className="w-5 h-5" />
             <h2 className="font-semibold text-lg">Seu Pedido</h2>
           </div>
           <Button
             variant="ghost"
             size="icon"
             onClick={() => onSetIsOpen(false)}
             className="text-primary-foreground hover:bg-primary-foreground/20"
           >
             <X className="w-5 h-5" />
           </Button>
         </div>
 
         {/* Cart Items */}
         <div className="flex-1 overflow-y-auto p-4">
           {items.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
               <ShoppingCart className="w-16 h-16 mb-4 opacity-50" />
               <p className="text-lg font-medium">Carrinho vazio</p>
               <p className="text-sm">Adicione produtos para começar!</p>
             </div>
           ) : (
             <div className="space-y-4">
               {items.map((item) => (
                 <div
                   key={item.product.id}
                   className="flex gap-3 p-3 bg-background rounded-lg border"
                 >
                   {/* Product Image */}
                   <div className="w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0">
                     {item.product.image ? (
                       <img
                         src={item.product.image}
                         alt={item.product.name}
                         className="w-full h-full object-cover"
                       />
                     ) : (
                       <div className="w-full h-full bg-secondary" />
                     )}
                   </div>
 
                   {/* Product Info */}
                   <div className="flex-1 min-w-0">
                     <h4 className="font-medium text-sm line-clamp-2">
                       {item.product.name}
                     </h4>
                     <p className="text-primary font-semibold text-sm mt-1">
                       {formatPrice(item.product.price)}
                     </p>
 
                     {/* Quantity Controls */}
                     <div className="flex items-center gap-2 mt-2">
                       <Button
                         variant="outline"
                         size="icon"
                         className="h-7 w-7"
                         onClick={() =>
                           onUpdateQuantity(item.product.id, item.quantity - 1)
                         }
                       >
                         <Minus className="w-3 h-3" />
                       </Button>
                       <span className="w-8 text-center font-medium">
                         {item.quantity}
                       </span>
                       <Button
                         variant="outline"
                         size="icon"
                         className="h-7 w-7"
                         onClick={() =>
                           onUpdateQuantity(item.product.id, item.quantity + 1)
                         }
                       >
                         <Plus className="w-3 h-3" />
                       </Button>
                       <Button
                         variant="ghost"
                         size="icon"
                         className="h-7 w-7 text-destructive hover:text-destructive ml-auto"
                         onClick={() => onRemoveFromCart(item.product.id)}
                       >
                         <Trash2 className="w-4 h-4" />
                       </Button>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           )}
         </div>
 
         {/* Footer */}
         {items.length > 0 && (
           <div className="border-t p-4 bg-background">
             {/* Observation */}
             <div className="mb-4">
               <label className="text-sm font-medium text-muted-foreground mb-2 block">
                 Observação do pedido (opcional)
               </label>
               <Textarea
                 placeholder="Ex: Sem cebola, ponto da carne..."
                 value={observation}
                 onChange={(e) => onSetObservation(e.target.value)}
                 rows={2}
                 className="resize-none"
               />
             </div>
 
             {/* Total */}
             <div className="flex items-center justify-between mb-4 py-3 border-t border-b">
               <span className="font-semibold text-lg">Total</span>
               <span className="font-bold text-xl text-primary">
                 {formatPrice(totalPrice)}
               </span>
             </div>
 
             {/* Submit Button */}
             <Button
               className="w-full h-12 text-lg gap-2"
               onClick={handleFinishOrder}
             >
               <MessageCircle className="w-5 h-5" />
               Finalizar pelo WhatsApp
             </Button>
           </div>
         )}
       </div>
     </>
   );
 }