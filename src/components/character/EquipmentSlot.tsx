import { Equipment } from "@/types/equipment";
import { Card } from "@/components/ui/card";
import { Shield, Sword, CircleIcon, ShieldQuestion } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface EquipmentSlotProps {
  item: Equipment | null;
  type: 'weapon' | 'shield' | 'armor' | 'ring';
  slotIndex?: number;
  onUnequip?: (item: Equipment, slotIndex?: number) => void;
}

const EquipmentSlot = ({ item, type, slotIndex, onUnequip }: EquipmentSlotProps) => {
  const getEmptySlotIcon = () => {
    switch (type) {
      case 'weapon':
        return <Sword className="w-8 h-8 text-amber-200/50" />;
      case 'shield':
        return <Shield className="w-8 h-8 text-amber-200/50" />;
      case 'ring':
        return <CircleIcon className="w-8 h-8 text-amber-200/50" />;
      default:
        return <ShieldQuestion className="w-8 h-8 text-amber-200/50" />;
    }
  };

  const handleUnequip = () => {
    if (item && onUnequip) {
      onUnequip(item, slotIndex);
    }
  };

  return (
    <div className="relative">
      {item ? (
        <HoverCard>
          <HoverCardTrigger>
            <Card 
              className="w-16 h-16 flex items-center justify-center cursor-pointer hover:bg-amber-50/80 transition-colors"
              onClick={handleUnequip}
            >
              {item.icon}
            </Card>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="text-lg font-medieval text-amber-900">{item.name}</h4>
              <p className="text-sm text-amber-800">{item.description}</p>
              {item.damage && <p className="text-sm text-amber-800">Dano: {item.damage}</p>}
              {item.defense && <p className="text-sm text-amber-800">Defesa: {item.defense}</p>}
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
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : (
        <Card className="w-16 h-16 flex items-center justify-center bg-amber-50/20">
          {getEmptySlotIcon()}
        </Card>
      )}
    </div>
  );
};

export default EquipmentSlot;