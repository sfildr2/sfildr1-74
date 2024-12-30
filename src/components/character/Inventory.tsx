import { useState } from "react";
import { Backpack } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Equipment } from "@/types/equipment";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface InventoryProps {
  items: Equipment[];
  onEquip: (item: Equipment) => void;
}

const Inventory = ({ items, onEquip }: InventoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'border-amber-400 shadow-lg shadow-amber-200/50';
      case 'epic':
        return 'border-purple-400';
      case 'rare':
        return 'border-blue-400';
      default:
        return 'border-gray-400';
    }
  };

  return (
    <Card className="bg-white/80 border-amber-200/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medieval text-xl text-amber-900">Mochila</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsOpen(!isOpen)}
          className="text-amber-900"
        >
          <Backpack className="h-4 w-4 mr-2" />
          {isOpen ? "Fechar" : "Abrir"}
        </Button>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {items.map((item, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger>
                  <div 
                    className={`w-16 h-16 border-2 ${getRarityBorder(item.rarity)} rounded-lg bg-white/80 p-2 cursor-pointer hover:scale-105 transition-transform`}
                    onClick={() => onEquip(item)}
                  >
                    {item.icon}
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-lg font-medieval text-amber-900">{item.name}</h4>
                    <p className="text-sm text-amber-800">{item.description}</p>
                    {item.damage && <p className="text-sm text-amber-800">Dano: {item.damage}</p>}
                    {item.defense && <p className="text-sm text-amber-800">Defesa: {item.defense}</p>}
                    {item.element && <p className="text-sm text-amber-800">Elemento: {item.element}</p>}
                    <div className="pt-2 border-t border-amber-200">
                      <h5 className="text-sm font-medieval text-amber-900 mb-1">Atributos:</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(item.attributes).map(([key, value]) => (
                          <div key={key} className="text-sm text-amber-800">
                            {key.toUpperCase()}: +{value}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-2"
                      onClick={() => onEquip(item)}
                    >
                      Equipar
                    </Button>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default Inventory;