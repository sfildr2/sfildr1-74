import { Shield, User, Sword, Gem } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { characterService } from "@/services/characterService";
import { equipmentService } from "@/services/equipmentService";
import { skillService } from "@/services/skillService";
import CharacterImage from "@/components/character/CharacterImage";
import DiceRoller from "@/components/character/DiceRoller";
import SkillList from "@/components/character/SkillList";
import Inventory from "@/components/character/Inventory";
import { useToast } from "@/components/ui/use-toast";
import { Equipment } from "@/types/equipment";

const Character = () => {
    const { id } = useParams();
    const { toast } = useToast();

    const { data: character, isLoading: isLoadingCharacter } = useQuery({
        queryKey: ['character', id],
        queryFn: () => characterService.getCharacter(id!),
        enabled: !!id
    });

    const { data: equipments } = useQuery({
        queryKey: ['equipments'],
        queryFn: equipmentService.getEquipments
    });

    const { data: skills } = useQuery({
        queryKey: ['skills'],
        queryFn: skillService.getSkills
    });

    const updateStatusMutation = useMutation({
        mutationFn: (status: any) => characterService.updateCharacterStatus(id!, status),
        onSuccess: () => {
            toast({
                title: "Status atualizado",
                description: "Os status do personagem foram atualizados com sucesso!"
            });
        }
    });

    const updateInventoryMutation = useMutation({
        mutationFn: ({ inventoryId, item }: { inventoryId: string, item: any }) => 
            characterService.updateInventory(id!, inventoryId, item),
        onSuccess: () => {
            toast({
                title: "Inventário atualizado",
                description: "O inventário foi atualizado com sucesso!"
            });
        }
    });

    const handleUseMp = (cost: number) => {
        if (!character) return;
        
        const newStatus = {
            ...character.status,
            mp: {
                ...character.status.mp,
                current: Math.max(0, character.status.mp.current - cost)
            }
        };
        
        updateStatusMutation.mutate(newStatus);
    };

    const handleEquip = (item: Equipment) => {
        if (!character) return;
        const newCharacter = { ...character };
        const equipment = { ...newCharacter.equipment };

        // If it's a ring, handle multiple ring slots
        if (item.type === 'ring') {
            const emptyRingSlot = equipment.rings.findIndex(ring => ring === null);
            if (emptyRingSlot !== -1) {
                const newRings = [...equipment.rings];
                newRings[emptyRingSlot] = item;
                equipment.rings = newRings;
                toast({
                    title: "Item equipado",
                    description: `${item.name} foi equipado com sucesso!`
                });
            } else {
                toast({
                    title: "Erro ao equipar",
                    description: "Todos os slots de anéis estão ocupados!",
                    variant: "destructive"
                });
                return;
            }
        } else {
            // Handle other equipment types
            const slot = item.type === 'weapon' ? 'primaryWeapon' :
                        item.type === 'shield' ? 'secondaryWeapon' :
                        'armor';
            
            const currentItem = equipment[slot];
            if (currentItem) {
                // Add current item back to inventory
                updateInventoryMutation.mutate({ inventoryId: currentItem.$id, item: currentItem });
            }
            
            equipment[slot] = item;
            toast({
                title: "Item equipado",
                description: `${item.name} foi equipado com sucesso!`
            });
        }

        newCharacter.equipment = equipment;
        // Update character state with new equipment
    };

    const handleUnequip = (item: Equipment, slotIndex?: number) => {
        if (!character) return;
        const newCharacter = { ...character };
        const equipment = { ...newCharacter.equipment };

        if (item.type === 'ring' && typeof slotIndex === 'number') {
            const newRings = [...equipment.rings];
            newRings[slotIndex] = null;
            equipment.rings = newRings;
        } else {
            const slot = item.type === 'weapon' ? 'primaryWeapon' :
                        item.type === 'shield' ? 'secondaryWeapon' :
                        'armor';
            equipment[slot] = null;
        }

        newCharacter.equipment = equipment;
        // Update character state with unequipped item
        toast({
            title: "Item desequipado",
            description: `${item.name} foi desequipado com sucesso!`
        });
    };

    if (isLoadingCharacter) {
        return <div>Loading...</div>;
    }

    if (!character) {
        return <div>Character not found</div>;
    }

    return (
        <div className="min-h-screen p-6 space-y-8 bg-medieval-pattern">
            <header className="text-center">
                <h1 className="text-4xl font-medieval text-amber-900 mb-2">{character.name}</h1>
                <p className="text-amber-800/60">Nível {character.level}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <CharacterImage name={character.name} imageUrl={character.imageUrl} />
                    
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
                                <EquipmentSlot item={character.equipment.rings[0]} type="ring" slotIndex={0} />
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <EquipmentSlot item={character.equipment.rings[1]} type="ring" slotIndex={1} />
                                <EquipmentSlot item={character.equipment.rings[2]} type="ring" slotIndex={2} />
                                <EquipmentSlot item={character.equipment.rings[3]} type="ring" slotIndex={3} />
                            </div>
                            <div className="text-right text-amber-900 font-medieval">
                                <span className="text-sm">Gold:</span>
                                <span className="ml-2 text-lg">{character.gold}</span>
                            </div>
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

                    <Card className="bg-white/80 border-amber-200/30">
                        <CardHeader>
                            <CardTitle className="font-medieval text-xl text-amber-900">Ações</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DiceRoller />
                        </CardContent>
                    </Card>

                    <Card className="bg-white/80 border-amber-200/30">
                        <CardHeader>
                            <CardTitle className="font-medieval text-xl text-amber-900">Skills</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SkillList currentMp={character.mp.current} onUseMp={handleUseMp} />
                        </CardContent>
                    </Card>

                    <Inventory items={character.inventory} onEquip={handleEquip} />
                </div>
            </div>
        </div>
    );
};

export default Character;
