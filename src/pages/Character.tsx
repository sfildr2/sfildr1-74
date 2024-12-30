import { Shield, User, Sword, Gem } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Equipment } from "@/types/equipment";

const Character = () => {
  const character = {
    name: "Aventureiro",
    level: 1,
    attributes: {
      str: 10,
      hab: 4,
      int: 4,
      esp: 2,
      arm: 5,
      res: 7,
      ten: 2
    },
    hp: { current: 20, max: 20 },
    mp: { current: 10, max: 10 },
    gold: 1500,
    equipment: {
      primaryWeapon: {
        name: "Espada Lendária do Dragão",
        type: "weapon",
        rarity: "legendary",
        damage: "+15",
        attributes: { str: 5 },
        element: "Fogo",
        description: "Uma espada forjada com escamas de dragão"
      } as Equipment,
      secondaryWeapon: {
        name: "Escudo de Carvalho",
        type: "shield",
        rarity: "common",
        defense: "+5",
        attributes: { res: 2 },
        description: "Um escudo resistente feito de carvalho ancestral"
      } as Equipment,
      armor: {
        name: "Armadura de Placas",
        type: "armor",
        rarity: "rare",
        defense: "+10",
        attributes: { arm: 3 },
        description: "Uma armadura resistente feita de placas de aço"
      } as Equipment,
      rings: [
        {
          name: "Anel da Sabedoria",
          type: "ring",
          rarity: "epic",
          attributes: { int: 3 },
          description: "Um anel que aumenta a sabedoria do usuário"
        } as Equipment
      ]
    }
  };

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

  const EquipmentSlot = ({ item, type }: { item: Equipment | undefined, type: string }) => {
    if (!item) return (
      <div className="w-16 h-16 border-2 border-dashed border-amber-200/50 rounded-lg flex items-center justify-center bg-amber-50/30">
        <Tooltip>
          <TooltipTrigger>
            {type === 'weapon' ? <Sword className="w-8 h-8 text-amber-200/50" /> : 
             type === 'shield' ? <Shield className="w-8 h-8 text-amber-200/50" /> :
             type === 'armor' ? <User className="w-8 h-8 text-amber-200/50" /> :
             <Gem className="w-8 h-8 text-amber-200/50" />}
          </TooltipTrigger>
          <TooltipContent>
            <p>Slot vazio para {type}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );

    return (
      <HoverCard>
        <HoverCardTrigger>
          <div className={`w-16 h-16 border-2 ${getRarityBorder(item.rarity)} rounded-lg bg-white/80 p-2 cursor-pointer hover:scale-105 transition-transform`}>
            {type === 'weapon' ? <Sword className="w-full h-full text-amber-800" /> :
             type === 'shield' ? <Shield className="w-full h-full text-amber-800" /> :
             type === 'armor' ? <User className="w-full h-full text-amber-800" /> :
             <Gem className="w-full h-full text-amber-800" />}
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
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  return (
    <div className="min-h-screen p-6 space-y-8 bg-medieval-pattern">
      <header className="text-center">
        <h1 className="text-4xl font-medieval text-amber-900 mb-2">{character.name}</h1>
        <p className="text-amber-800/60">Nível {character.level}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="bg-white/80 border-amber-200/30">
            <CardHeader>
              <CardTitle className="font-medieval text-xl text-amber-900 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Atributos
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-3">
              {Object.entries(character.attributes).map(([key, value]) => (
                <div key={key} className="bg-amber-50/50 p-2 rounded-lg border border-amber-200/30">
                  <span className="font-medieval text-amber-900 uppercase text-sm">{key}</span>
                  <div className="text-xl font-bold text-amber-800">{value}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-amber-200/30">
            <CardHeader>
              <CardTitle className="font-medieval text-xl text-amber-900">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-amber-900 mb-1">
                  <span>HP</span>
                  <span>{character.hp.current}/{character.hp.max}</span>
                </div>
                <div className="w-full bg-amber-100 rounded-full h-2.5">
                  <div 
                    className="bg-red-500 h-2.5 rounded-full"
                    style={{ width: `${(character.hp.current / character.hp.max) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-amber-900 mb-1">
                  <span>MP</span>
                  <span>{character.mp.current}/{character.mp.max}</span>
                </div>
                <div className="w-full bg-amber-100 rounded-full h-2.5">
                  <div 
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${(character.mp.current / character.mp.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-white/80 border-amber-200/30">
            <CardHeader>
              <CardTitle className="font-medieval text-xl text-amber-900">Equipamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <EquipmentSlot item={character.equipment.primaryWeapon} type="weapon" />
                <EquipmentSlot item={character.equipment.secondaryWeapon} type="shield" />
                <EquipmentSlot item={character.equipment.armor} type="armor" />
                <EquipmentSlot item={character.equipment.rings[0]} type="ring" />
              </div>
              <div className="text-right text-amber-900 font-medieval">
                <span className="text-sm">Gold:</span>
                <span className="ml-2 text-lg">{character.gold}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-amber-200/30">
            <CardHeader>
              <CardTitle className="font-medieval text-xl text-amber-900">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-amber-800/60 text-center py-4">
                Nenhuma skill desbloqueada ainda
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Character;