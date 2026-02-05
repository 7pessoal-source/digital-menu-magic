 import { useState } from "react";
 import { ArrowLeft, Settings, FolderOpen, Package } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { cn } from "@/lib/utils";
 import { SettingsPanel } from "./SettingsPanel";
 import { CategoriesPanel } from "./CategoriesPanel";
 import { ProductsPanel } from "./ProductsPanel";
 import { StoreSettings, Category, Product } from "@/types/menu";
 
 interface AdminPanelProps {
   settings: StoreSettings;
   categories: Category[];
   products: Product[];
   onUpdateSettings: (settings: Partial<StoreSettings>) => void;
   onAddCategory: (name: string) => void;
   onUpdateCategory: (id: string, name: string) => void;
   onDeleteCategory: (id: string) => void;
   onAddProduct: (product: Omit<Product, "id">) => void;
   onUpdateProduct: (id: string, data: Partial<Omit<Product, "id">>) => void;
   onDeleteProduct: (id: string) => void;
   onExit: () => void;
 }
 
 type AdminSection = "settings" | "categories" | "products";
 
 const menuItems = [
   { id: "settings" as AdminSection, label: "Configurações", icon: Settings },
   { id: "categories" as AdminSection, label: "Categorias", icon: FolderOpen },
   { id: "products" as AdminSection, label: "Produtos", icon: Package },
 ];
 
 export function AdminPanel({
   settings,
   categories,
   products,
   onUpdateSettings,
   onAddCategory,
   onUpdateCategory,
   onDeleteCategory,
   onAddProduct,
   onUpdateProduct,
   onDeleteProduct,
   onExit,
 }: AdminPanelProps) {
   const [activeSection, setActiveSection] = useState<AdminSection>("settings");
 
   return (
     <div className="min-h-screen bg-background flex">
       {/* Sidebar */}
       <aside className="w-64 bg-card border-r shrink-0 hidden md:block">
         <div className="p-4 border-b">
           <h1 className="font-display font-bold text-xl text-primary">
             Painel Admin
           </h1>
           <p className="text-sm text-muted-foreground mt-1">{settings.name}</p>
         </div>
 
         <nav className="p-4 space-y-2">
           {menuItems.map((item) => (
             <button
               key={item.id}
               onClick={() => setActiveSection(item.id)}
               className={cn(
                 "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                 activeSection === item.id
                   ? "bg-primary text-primary-foreground"
                   : "hover:bg-secondary text-foreground"
               )}
             >
               <item.icon className="w-5 h-5" />
               {item.label}
             </button>
           ))}
         </nav>
 
         <div className="p-4 mt-auto border-t">
           <Button variant="outline" className="w-full" onClick={onExit}>
             <ArrowLeft className="w-4 h-4 mr-2" />
             Voltar ao Cardápio
           </Button>
         </div>
       </aside>
 
       {/* Mobile Header */}
       <div className="md:hidden fixed top-0 left-0 right-0 bg-card border-b z-10 p-4">
         <div className="flex items-center justify-between">
           <h1 className="font-display font-bold text-lg text-primary">
             Painel Admin
           </h1>
           <Button variant="outline" size="sm" onClick={onExit}>
             <ArrowLeft className="w-4 h-4" />
           </Button>
         </div>
         <div className="flex gap-2 mt-3 overflow-x-auto">
           {menuItems.map((item) => (
             <Button
               key={item.id}
               variant={activeSection === item.id ? "default" : "outline"}
               size="sm"
               onClick={() => setActiveSection(item.id)}
               className="shrink-0"
             >
               <item.icon className="w-4 h-4 mr-1" />
               {item.label}
             </Button>
           ))}
         </div>
       </div>
 
       {/* Main Content */}
       <main className="flex-1 p-6 md:p-8 mt-28 md:mt-0 overflow-y-auto">
         <div className="max-w-4xl mx-auto">
           {activeSection === "settings" && (
             <SettingsPanel
               settings={settings}
               onUpdateSettings={onUpdateSettings}
             />
           )}
 
           {activeSection === "categories" && (
             <CategoriesPanel
               categories={categories}
               onAddCategory={onAddCategory}
               onUpdateCategory={onUpdateCategory}
               onDeleteCategory={onDeleteCategory}
             />
           )}
 
           {activeSection === "products" && (
             <ProductsPanel
               products={products}
               categories={categories}
               onAddProduct={onAddProduct}
               onUpdateProduct={onUpdateProduct}
               onDeleteProduct={onDeleteProduct}
             />
           )}
         </div>
       </main>
     </div>
   );
 }