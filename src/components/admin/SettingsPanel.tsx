 import { Store, Phone, Clock } from "lucide-react";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { StoreSettings } from "@/types/menu";
 
 interface SettingsPanelProps {
   settings: StoreSettings;
   onUpdateSettings: (settings: Partial<StoreSettings>) => void;
 }
 
 export function SettingsPanel({ settings, onUpdateSettings }: SettingsPanelProps) {
   return (
     <div className="space-y-6">
       <h2 className="text-2xl font-bold font-display">Configurações da Loja</h2>
 
       <Card>
         <CardHeader>
           <CardTitle className="flex items-center gap-2 text-lg">
             <Store className="w-5 h-5" />
             Informações Gerais
           </CardTitle>
         </CardHeader>
         <CardContent className="space-y-4">
           <div>
             <Label htmlFor="storeName">Nome da Loja</Label>
             <Input
               id="storeName"
               value={settings.name}
               onChange={(e) => onUpdateSettings({ name: e.target.value })}
               placeholder="Nome da loja"
               className="mt-1"
             />
           </div>
 
           <div>
             <Label htmlFor="whatsapp">WhatsApp (com DDD)</Label>
             <div className="flex items-center gap-2 mt-1">
               <Phone className="w-4 h-4 text-muted-foreground" />
               <Input
                 id="whatsapp"
                 value={settings.whatsapp}
                 onChange={(e) => onUpdateSettings({ whatsapp: e.target.value })}
                 placeholder="5511999999999"
               />
             </div>
             <p className="text-xs text-muted-foreground mt-1">
               Formato: código do país + DDD + número (ex: 5511999999999)
             </p>
           </div>
         </CardContent>
       </Card>
 
       <Card>
         <CardHeader>
           <CardTitle className="flex items-center gap-2 text-lg">
             <Clock className="w-5 h-5" />
             Horário de Funcionamento
           </CardTitle>
         </CardHeader>
         <CardContent>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <Label htmlFor="openTime">Abertura</Label>
               <Input
                 id="openTime"
                 type="time"
                 value={settings.openTime}
                 onChange={(e) => onUpdateSettings({ openTime: e.target.value })}
                 className="mt-1"
               />
             </div>
             <div>
               <Label htmlFor="closeTime">Fechamento</Label>
               <Input
                 id="closeTime"
                 type="time"
                 value={settings.closeTime}
                 onChange={(e) => onUpdateSettings({ closeTime: e.target.value })}
                 className="mt-1"
               />
             </div>
           </div>
         </CardContent>
       </Card>
     </div>
   );
 }