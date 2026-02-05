 import { useState } from "react";
 import { Plus, Pencil, Trash2, Check, X, FolderOpen } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
 import { Category } from "@/types/menu";
 
 interface CategoriesPanelProps {
   categories: Category[];
   onAddCategory: (name: string) => void;
   onUpdateCategory: (id: string, name: string) => void;
   onDeleteCategory: (id: string) => void;
 }
 
 export function CategoriesPanel({
   categories,
   onAddCategory,
   onUpdateCategory,
   onDeleteCategory,
 }: CategoriesPanelProps) {
   const [newCategoryName, setNewCategoryName] = useState("");
   const [editingId, setEditingId] = useState<string | null>(null);
   const [editingName, setEditingName] = useState("");
   const [deleteId, setDeleteId] = useState<string | null>(null);
 
   const handleAddCategory = () => {
     if (newCategoryName.trim()) {
       onAddCategory(newCategoryName.trim());
       setNewCategoryName("");
     }
   };
 
   const handleStartEdit = (category: Category) => {
     setEditingId(category.id);
     setEditingName(category.name);
   };
 
   const handleSaveEdit = () => {
     if (editingId && editingName.trim()) {
       onUpdateCategory(editingId, editingName.trim());
       setEditingId(null);
       setEditingName("");
     }
   };
 
   const handleCancelEdit = () => {
     setEditingId(null);
     setEditingName("");
   };
 
   const handleConfirmDelete = () => {
     if (deleteId) {
       onDeleteCategory(deleteId);
       setDeleteId(null);
     }
   };
 
   return (
     <div className="space-y-6">
       <h2 className="text-2xl font-bold font-display">Categorias</h2>
 
       {/* Add Category */}
       <Card>
         <CardHeader>
           <CardTitle className="text-lg">Nova Categoria</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="flex gap-2">
             <Input
               placeholder="Nome da categoria"
               value={newCategoryName}
               onChange={(e) => setNewCategoryName(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
             />
             <Button onClick={handleAddCategory}>
               <Plus className="w-4 h-4 mr-1" />
               Adicionar
             </Button>
           </div>
         </CardContent>
       </Card>
 
       {/* Categories List */}
       <Card>
         <CardHeader>
           <CardTitle className="flex items-center gap-2 text-lg">
             <FolderOpen className="w-5 h-5" />
             Categorias ({categories.length})
           </CardTitle>
         </CardHeader>
         <CardContent>
           {categories.length === 0 ? (
             <p className="text-muted-foreground text-center py-8">
               Nenhuma categoria cadastrada.
             </p>
           ) : (
             <div className="space-y-2">
               {categories.map((category) => (
                 <div
                   key={category.id}
                   className="flex items-center gap-2 p-3 bg-background rounded-lg border"
                 >
                   {editingId === category.id ? (
                     <>
                       <Input
                         value={editingName}
                         onChange={(e) => setEditingName(e.target.value)}
                         onKeyDown={(e) => {
                           if (e.key === "Enter") handleSaveEdit();
                           if (e.key === "Escape") handleCancelEdit();
                         }}
                         autoFocus
                         className="flex-1"
                       />
                       <Button size="icon" variant="ghost" onClick={handleSaveEdit}>
                         <Check className="w-4 h-4 text-success" />
                       </Button>
                       <Button size="icon" variant="ghost" onClick={handleCancelEdit}>
                         <X className="w-4 h-4 text-destructive" />
                       </Button>
                     </>
                   ) : (
                     <>
                       <span className="flex-1 font-medium">{category.name}</span>
                       <Button
                         size="icon"
                         variant="ghost"
                         onClick={() => handleStartEdit(category)}
                       >
                         <Pencil className="w-4 h-4" />
                       </Button>
                       <Button
                         size="icon"
                         variant="ghost"
                         onClick={() => setDeleteId(category.id)}
                         className="text-destructive hover:text-destructive"
                       >
                         <Trash2 className="w-4 h-4" />
                       </Button>
                     </>
                   )}
                 </div>
               ))}
             </div>
           )}
         </CardContent>
       </Card>
 
       {/* Delete Confirmation Dialog */}
       <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
         <AlertDialogContent>
           <AlertDialogHeader>
             <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
             <AlertDialogDescription>
               Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.
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