 import { useState, useRef } from "react";
 import { Plus, Pencil, Trash2, ImageIcon, Package, Star } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Checkbox } from "@/components/ui/checkbox";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
 } from "@/components/ui/alert-dialog";
 import { Product, Category } from "@/types/menu";
 import { resizeImage, formatPrice } from "@/utils/imageUtils";
 
 interface ProductsPanelProps {
   products: Product[];
   categories: Category[];
   onAddProduct: (product: Omit<Product, "id">) => void;
   onUpdateProduct: (id: string, data: Partial<Omit<Product, "id">>) => void;
   onDeleteProduct: (id: string) => void;
 }
 
 interface ProductFormData {
   name: string;
   price: string;
   categoryId: string;
   image: string;
   featured: boolean;
 }
 
 const INITIAL_FORM: ProductFormData = {
   name: "",
   price: "",
   categoryId: "",
   image: "",
   featured: false,
 };
 
 export function ProductsPanel({
   products,
   categories,
   onAddProduct,
   onUpdateProduct,
   onDeleteProduct,
 }: ProductsPanelProps) {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
   const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM);
   const [deleteId, setDeleteId] = useState<string | null>(null);
   const [filterCategory, setFilterCategory] = useState<string>("all");
   const fileInputRef = useRef<HTMLInputElement>(null);
 
   const filteredProducts =
     filterCategory === "all"
       ? products
       : products.filter((p) => p.categoryId === filterCategory);
 
   const getCategoryName = (categoryId: string) => {
     return categories.find((c) => c.id === categoryId)?.name || "Sem categoria";
   };
 
   const openAddModal = () => {
     setEditingProduct(null);
     setFormData(INITIAL_FORM);
     setIsModalOpen(true);
   };
 
   const openEditModal = (product: Product) => {
     setEditingProduct(product);
     setFormData({
       name: product.name,
       price: product.price.toString(),
       categoryId: product.categoryId,
       image: product.image,
       featured: product.featured,
     });
     setIsModalOpen(true);
   };
 
   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (file) {
       try {
         const base64 = await resizeImage(file);
         setFormData((prev) => ({ ...prev, image: base64 }));
       } catch (error) {
         console.error("Error resizing image:", error);
       }
     }
   };
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
 
     const price = parseFloat(formData.price.replace(",", "."));
     if (isNaN(price) || !formData.name.trim() || !formData.categoryId) {
       return;
     }
 
     if (editingProduct) {
       onUpdateProduct(editingProduct.id, {
         name: formData.name.trim(),
         price,
         categoryId: formData.categoryId,
         image: formData.image,
         featured: formData.featured,
       });
     } else {
       onAddProduct({
         name: formData.name.trim(),
         price,
         categoryId: formData.categoryId,
         image: formData.image,
         featured: formData.featured,
       });
     }
 
     setIsModalOpen(false);
     setFormData(INITIAL_FORM);
   };
 
   const handleConfirmDelete = () => {
     if (deleteId) {
       onDeleteProduct(deleteId);
       setDeleteId(null);
     }
   };
 
   return (
     <div className="space-y-6">
       <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold font-display">Produtos</h2>
         <Button onClick={openAddModal}>
           <Plus className="w-4 h-4 mr-1" />
           Novo Produto
         </Button>
       </div>
 
       {/* Filter */}
       <Card>
         <CardContent className="py-4">
           <div className="flex items-center gap-4">
             <Label>Filtrar por categoria:</Label>
             <Select value={filterCategory} onValueChange={setFilterCategory}>
               <SelectTrigger className="w-[200px]">
                 <SelectValue />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="all">Todas</SelectItem>
                 {categories.map((cat) => (
                   <SelectItem key={cat.id} value={cat.id}>
                     {cat.name}
                   </SelectItem>
                 ))}
               </SelectContent>
             </Select>
           </div>
         </CardContent>
       </Card>
 
       {/* Products List */}
       <Card>
         <CardHeader>
           <CardTitle className="flex items-center gap-2 text-lg">
             <Package className="w-5 h-5" />
             Produtos ({filteredProducts.length})
           </CardTitle>
         </CardHeader>
         <CardContent>
           {filteredProducts.length === 0 ? (
             <p className="text-muted-foreground text-center py-8">
               Nenhum produto cadastrado.
             </p>
           ) : (
             <div className="space-y-3">
               {filteredProducts.map((product) => (
                 <div
                   key={product.id}
                   className="flex items-center gap-4 p-4 bg-background rounded-lg border"
                 >
                   {/* Image */}
                   <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                     {product.image ? (
                       <img
                         src={product.image}
                         alt={product.name}
                         className="w-full h-full object-cover"
                       />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center">
                         <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
                       </div>
                     )}
                   </div>
 
                   {/* Info */}
                   <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-2">
                       <h4 className="font-semibold truncate">{product.name}</h4>
                       {product.featured && (
                         <Star className="w-4 h-4 text-accent fill-accent shrink-0" />
                       )}
                     </div>
                     <p className="text-sm text-muted-foreground">
                       {getCategoryName(product.categoryId)}
                     </p>
                     <p className="text-primary font-semibold">
                       {formatPrice(product.price)}
                     </p>
                   </div>
 
                   {/* Actions */}
                   <div className="flex gap-2">
                     <Button
                       size="icon"
                       variant="ghost"
                       onClick={() => openEditModal(product)}
                     >
                       <Pencil className="w-4 h-4" />
                     </Button>
                     <Button
                       size="icon"
                       variant="ghost"
                       onClick={() => setDeleteId(product.id)}
                       className="text-destructive hover:text-destructive"
                     >
                       <Trash2 className="w-4 h-4" />
                     </Button>
                   </div>
                 </div>
               ))}
             </div>
           )}
         </CardContent>
       </Card>
 
       {/* Add/Edit Modal */}
       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
         <DialogContent className="sm:max-w-[500px]">
           <DialogHeader>
             <DialogTitle>
               {editingProduct ? "Editar Produto" : "Novo Produto"}
             </DialogTitle>
           </DialogHeader>
 
           <form onSubmit={handleSubmit} className="space-y-4 mt-4">
             {/* Image Preview */}
             <div className="flex flex-col items-center gap-3">
               <div
                 className="w-32 h-32 rounded-lg overflow-hidden bg-muted border-2 border-dashed border-border cursor-pointer hover:border-primary transition-colors"
                 onClick={() => fileInputRef.current?.click()}
               >
                 {formData.image ? (
                   <img
                     src={formData.image}
                     alt="Preview"
                     className="w-full h-full object-cover"
                   />
                 ) : (
                   <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                     <ImageIcon className="w-8 h-8 mb-1" />
                     <span className="text-xs">Clique para adicionar</span>
                   </div>
                 )}
               </div>
               <input
                 ref={fileInputRef}
                 type="file"
                 accept="image/*"
                 onChange={handleImageUpload}
                 className="hidden"
               />
               {formData.image && (
                 <Button
                   type="button"
                   variant="outline"
                   size="sm"
                   onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                 >
                   Remover imagem
                 </Button>
               )}
             </div>
 
             {/* Name */}
             <div>
               <Label htmlFor="productName">Nome do Produto</Label>
               <Input
                 id="productName"
                 value={formData.name}
                 onChange={(e) =>
                   setFormData((prev) => ({ ...prev, name: e.target.value }))
                 }
                 placeholder="Ex: X-Burguer Especial"
                 className="mt-1"
                 required
               />
             </div>
 
             {/* Price */}
             <div>
               <Label htmlFor="productPrice">Preço (R$)</Label>
               <Input
                 id="productPrice"
                 value={formData.price}
                 onChange={(e) =>
                   setFormData((prev) => ({ ...prev, price: e.target.value }))
                 }
                 placeholder="Ex: 29,90"
                 className="mt-1"
                 required
               />
             </div>
 
             {/* Category */}
             <div>
               <Label htmlFor="productCategory">Categoria</Label>
               <Select
                 value={formData.categoryId}
                 onValueChange={(value) =>
                   setFormData((prev) => ({ ...prev, categoryId: value }))
                 }
               >
                 <SelectTrigger className="mt-1">
                   <SelectValue placeholder="Selecione uma categoria" />
                 </SelectTrigger>
                 <SelectContent>
                   {categories.map((cat) => (
                     <SelectItem key={cat.id} value={cat.id}>
                       {cat.name}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
 
             {/* Featured */}
             <div className="flex items-center gap-2">
               <Checkbox
                 id="productFeatured"
                 checked={formData.featured}
                 onCheckedChange={(checked) =>
                   setFormData((prev) => ({
                     ...prev,
                     featured: checked === true,
                   }))
                 }
               />
               <Label htmlFor="productFeatured" className="cursor-pointer">
                 Marcar como destaque
               </Label>
             </div>
 
             {/* Submit */}
             <div className="flex gap-2 pt-4">
               <Button
                 type="button"
                 variant="outline"
                 onClick={() => setIsModalOpen(false)}
                 className="flex-1"
               >
                 Cancelar
               </Button>
               <Button type="submit" className="flex-1">
                 {editingProduct ? "Salvar" : "Adicionar"}
               </Button>
             </div>
           </form>
         </DialogContent>
       </Dialog>
 
       {/* Delete Confirmation Dialog */}
       <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
         <AlertDialogContent>
           <AlertDialogHeader>
             <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
             <AlertDialogDescription>
               Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
             </AlertDialogDescription>
           </AlertDialogHeader>
           <AlertDialogFooter>
             <AlertDialogCancel>Cancelar</AlertDialogCancel>
             <AlertDialogAction
               onClick={handleConfirmDelete}
               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
             >
               Excluir
             </AlertDialogAction>
           </AlertDialogFooter>
         </AlertDialogContent>
       </AlertDialog>
     </div>
   );
 }