 import { Plus, ImageIcon } from "lucide-react";
 import { Card, CardContent } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { Product } from "@/types/menu";
 import { formatPrice } from "@/utils/imageUtils";
 
 interface ProductCardProps {
   product: Product;
   onAddToCart: (product: Product) => void;
 }
 
 export function ProductCard({ product, onAddToCart }: ProductCardProps) {
   return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card border-border/50 ${product.featured ? 'animate-glow border-primary/20' : ''}`}>
      <div className="relative aspect-square overflow-hidden bg-muted flex items-center justify-center p-2">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-2/3 h-2/3 object-contain transition-transform duration-300 group-hover:scale-110 animate-float"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
            <ImageIcon className="w-8 h-8 text-muted-foreground/50 animate-float" />
          </div>
        )}
        {product.featured && (
          <Badge className="absolute top-1 right-1 bg-primary text-primary-foreground text-[10px] px-1 py-0">
            🔥 Promo
          </Badge>
        )}
      </div>

      <CardContent className="p-2">
         <h3 className="font-medium text-foreground mb-1 line-clamp-2 min-h-[2rem] text-xs">
           {product.name}
         </h3>
         <div className="flex flex-col gap-2 mt-1">
           <span className="text-sm font-bold text-primary">
             {formatPrice(product.price)}
           </span>
           <Button
             size="sm"
             onClick={() => onAddToCart(product)}
             className="h-7 text-[10px] px-2 transition-all duration-200 hover:scale-105 w-full"
           >
             <Plus className="w-3 h-3 mr-1" />
             Add
           </Button>
         </div>
       </CardContent>
     </Card>
   );
 }