 import { Product, Category } from "@/types/menu";
 import { ProductCard } from "./ProductCard";
 
 interface ProductGridProps {
   products: Product[];
   categories: Category[];
   activeCategory: string | null;
   onAddToCart: (product: Product) => void;
 }
 
 export function ProductGrid({
   products,
   categories,
   activeCategory,
   onAddToCart,
 }: ProductGridProps) {
   const filteredProducts = activeCategory
     ? products.filter((p) => p.categoryId === activeCategory)
     : products;
 
   const getCategoryName = (categoryId: string) => {
     return categories.find((c) => c.id === categoryId)?.name || "Outros";
   };
 
   // Group products by category when showing all
   const groupedProducts = activeCategory
     ? null
     : categories.reduce(
         (acc, category) => {
           const categoryProducts = products.filter(
             (p) => p.categoryId === category.id
           );
           if (categoryProducts.length > 0) {
             acc[category.id] = {
               name: category.name,
               products: categoryProducts,
             };
           }
           return acc;
         },
         {} as Record<string, { name: string; products: Product[] }>
       );
 
  if (activeCategory) {
    return (
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            {getCategoryName(activeCategory)}
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
           {filteredProducts.length === 0 && (
             <div className="text-center py-12 text-muted-foreground">
               Nenhum produto nesta categoria.
             </div>
           )}
         </div>
       </section>
     );
   }
 
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        {groupedProducts &&
          Object.entries(groupedProducts).map(([categoryId, { name, products }]) => (
            <div key={categoryId} className="mb-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                {name}
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
 }