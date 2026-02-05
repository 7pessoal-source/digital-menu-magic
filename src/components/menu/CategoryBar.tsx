 import { useRef } from "react";
 import { ChevronLeft, ChevronRight } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Category } from "@/types/menu";
 import { cn } from "@/lib/utils";
 
 interface CategoryBarProps {
   categories: Category[];
   activeCategory: string | null;
   onCategoryChange: (categoryId: string | null) => void;
 }
 
 export function CategoryBar({
   categories,
   activeCategory,
   onCategoryChange,
 }: CategoryBarProps) {
   const scrollRef = useRef<HTMLDivElement>(null);
 
   const scroll = (direction: "left" | "right") => {
     if (scrollRef.current) {
       const scrollAmount = 200;
       scrollRef.current.scrollBy({
         left: direction === "left" ? -scrollAmount : scrollAmount,
         behavior: "smooth",
       });
     }
   };
 
   return (
     <div className="relative bg-white border-b border-border sticky top-0 z-10">
       <div className="container mx-auto flex items-center gap-2 py-3">
         <Button
           variant="ghost"
           size="icon"
           className="shrink-0 hidden md:flex"
           onClick={() => scroll("left")}
         >
           <ChevronLeft className="w-5 h-5" />
         </Button>
 
         <div
           ref={scrollRef}
           className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth px-2 md:px-0"
           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
         >
           <Button
             variant={activeCategory === null ? "default" : "outline"}
             size="sm"
             onClick={() => onCategoryChange(null)}
             className={cn(
               "shrink-0 transition-all duration-200",
               activeCategory === null && "shadow-md"
             )}
           >
             Todos
           </Button>
 
           {categories.map((category) => (
             <Button
               key={category.id}
               variant={activeCategory === category.id ? "default" : "outline"}
               size="sm"
               onClick={() => onCategoryChange(category.id)}
               className={cn(
                 "shrink-0 transition-all duration-200",
                 activeCategory === category.id && "shadow-md"
               )}
             >
               {category.name}
             </Button>
           ))}
         </div>
 
         <Button
           variant="ghost"
           size="icon"
           className="shrink-0 hidden md:flex"
           onClick={() => scroll("right")}
         >
           <ChevronRight className="w-5 h-5" />
         </Button>
       </div>
     </div>
   );
 }