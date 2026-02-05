 import { Flame } from "lucide-react";
 import { Product } from "@/types/menu";
 import { ProductCard } from "./ProductCard";
 
 interface FeaturedSectionProps {
   products: Product[];
   onAddToCart: (product: Product) => void;
 }
 
 export function FeaturedSection({ products, onAddToCart }: FeaturedSectionProps) {
   const featuredProducts = products.filter((p) => p.featured);
 
   if (featuredProducts.length === 0) return null;
 
   return (
     <section className="py-8 bg-white">
       <div className="container mx-auto px-4">
         <div className="flex items-center gap-2 mb-6">
           <Flame className="w-6 h-6 text-primary fill-primary" />
           <h2 className="font-display text-2xl font-bold text-foreground">
             Promoções do Dia
           </h2>
         </div>
 
         <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
           {featuredProducts.map((product) => (
             <div key={product.id} className="min-w-[140px] max-w-[140px]">
               <ProductCard product={product} onAddToCart={onAddToCart} />
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 }