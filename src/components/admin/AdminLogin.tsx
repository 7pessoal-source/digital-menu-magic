 import { useState } from "react";
 import { Lock, X } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";
 
 interface AdminLoginProps {
   isOpen: boolean;
   onClose: () => void;
   onSuccess: () => void;
 }
 
 const ADMIN_PASSWORD = "1245";
 
 export function AdminLogin({ isOpen, onClose, onSuccess }: AdminLoginProps) {
   const [password, setPassword] = useState("");
   const [error, setError] = useState(false);
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     if (password === ADMIN_PASSWORD) {
       setPassword("");
       setError(false);
       onSuccess();
     } else {
       setError(true);
     }
   };
 
   const handleClose = () => {
     setPassword("");
     setError(false);
     onClose();
   };
 
   return (
     <Dialog open={isOpen} onOpenChange={handleClose}>
       <DialogContent className="sm:max-w-[400px]">
         <DialogHeader>
           <DialogTitle className="flex items-center gap-2">
             <Lock className="w-5 h-5" />
             Acesso Administrativo
           </DialogTitle>
         </DialogHeader>
 
         <form onSubmit={handleSubmit} className="space-y-4 mt-4">
           <div>
             <Input
               type="password"
               placeholder="Digite a senha"
               value={password}
               onChange={(e) => {
                 setPassword(e.target.value);
                 setError(false);
               }}
               className={error ? "border-destructive" : ""}
               autoFocus
             />
             {error && (
               <p className="text-destructive text-sm mt-2">Senha incorreta!</p>
             )}
           </div>
 
           <div className="flex gap-2">
             <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
               Cancelar
             </Button>
             <Button type="submit" className="flex-1">
               Entrar
             </Button>
           </div>
         </form>
       </DialogContent>
     </Dialog>
   );
 }