 import { useState } from "react";
 import { Link } from "react-router-dom";
 
 interface FooterProps {
   onAdminClick: () => void;
 }
 
 export function Footer({ onAdminClick }: FooterProps) {
   return (
     <footer className="py-8 mt-8 border-t bg-card/50">
       <div className="container mx-auto px-4 text-center text-muted-foreground">
         <p className="text-sm mb-2">
           Cardápio Digital © {new Date().getFullYear()}
         </p>
         <button
           onClick={onAdminClick}
           className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
         >
           Painel
         </button>
       </div>
     </footer>
   );
 }