import { useState } from "react";
import { Flame, Droplet, Wind, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Skill {
  id: number;
  name: string;
  element: string;
  icon: JSX.Element;
  manaCost: number;
  cooldown: number;
  description: string;
}

const skills: Skill[] = [
  {
    id: 1,
    name: "Bola de Fogo",
    element: "Fogo",
    icon: <Flame className="w-8 h-8 text-red-500" />,
    manaCost: 5,
    cooldown: 3,
    description: "Lança uma poderosa bola de fogo"
  },
  {
    id: 2,
    name: "Cura Divina",
    element: "Água",
    icon: <Droplet className="w-8 h-8 text-blue-500" />,
    manaCost: 8,
    cooldown: 4,
    description: "Restaura HP do alvo"
  },
  {
    id: 3,
    name: "Lâmina de Vento",
    element: "Vento",
    icon: <Wind className="w-8 h-8 text-green-500" />,
    manaCost: 4,
    cooldown: 2,
    description: "Corta o inimigo com vento afiado"
  },
  {
    id: 4,
    name: "Raio Celestial",
    element: "Raio",
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    manaCost: 7,
    cooldown: 3,
    description: "Invoca um raio dos céus"
  }
];

interface SkillListProps {
  currentMp: number;
  onUseMp: (cost: number) => void;
}

const SkillList = ({ currentMp, onUseMp }: SkillListProps) => {
  const { toast } = useToast();
  const [cooldowns, setCooldowns] = useState<Record<number, number>>({});

  const useSkill = (skill: Skill) => {
    if (cooldowns[skill.id] > 0) {
      toast({
        title: "Habilidade em recarga",
        description: `Aguarde ${cooldowns[skill.id]} turnos para usar novamente.`,
        variant: "destructive"
      });
      return;
    }

    if (currentMp < skill.manaCost) {
      toast({
        title: "Mana insuficiente",
        description: "Você não tem mana suficiente para usar esta habilidade.",
        variant: "destructive"
      });
      return;
    }

    const result = Math.floor(Math.random() * 6) + 1;
    onUseMp(skill.manaCost);
    
    setCooldowns(prev => ({
      ...prev,
      [skill.id]: skill.cooldown
    }));

    toast({
      title: `${skill.name} - Resultado do dado:`,
      description: `Você tirou ${result}! (Custo: ${skill.manaCost} MP)`,
    });
  };

  // Reduce cooldowns at the end of each turn (you'll need to implement turn system)
  const reduceCooldowns = () => {
    setCooldowns(prev => {
      const newCooldowns: Record<number, number> = {};
      Object.entries(prev).forEach(([id, value]) => {
        if (value > 0) {
          newCooldowns[Number(id)] = value - 1;
        }
      });
      return newCooldowns;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {skills.map((skill) => (
        <Card key={skill.id} className="bg-white/80 border-amber-200/30 hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-amber-50 rounded-lg">
                {skill.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medieval text-lg text-amber-900">{skill.name}</h3>
                <p className="text-sm text-amber-700">{skill.description}</p>
                <div className="flex justify-between mt-2 text-sm text-amber-600">
                  <span>Elemento: {skill.element}</span>
                  <span>Custo: {skill.manaCost} MP</span>
                  <span>CDW: {cooldowns[skill.id] || 0}/{skill.cooldown}</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 bg-amber-50 hover:bg-amber-100"
              onClick={() => useSkill(skill)}
              disabled={cooldowns[skill.id] > 0 || currentMp < skill.manaCost}
            >
              Usar Habilidade
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SkillList;