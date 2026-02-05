 import { Clock } from "lucide-react";
 import { Badge } from "@/components/ui/badge";
 import { StoreSettings } from "@/types/menu";
 import { isStoreOpen } from "@/utils/imageUtils";
 
 interface HeaderProps {
   settings: StoreSettings;
 }
 
 export function Header({ settings }: HeaderProps) {
   const open = isStoreOpen(settings.openTime, settings.closeTime);
 
   return (
    <header className="bg-white border-b border-border py-8 px-4">
      <div className="container mx-auto text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
          {settings.name}
        </h1>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
           <Clock className="w-4 h-4" />
           <span className="text-sm">
             {settings.openTime} - {settings.closeTime}
           </span>
           <Badge
             variant={open ? "default" : "secondary"}
             className={
               open
                 ? "bg-success text-success-foreground ml-2"
                 : "bg-destructive text-destructive-foreground ml-2"
             }
           >
             {open ? "Aberto" : "Fechado"}
           </Badge>
         </div>
       </div>
     </header>
   );
 }