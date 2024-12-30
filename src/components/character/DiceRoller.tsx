import { useState } from "react";
import { Sword, Shield, Heart, Clover } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const DiceRoller = () => {
  const { toast } = useToast();
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = (type: string) => {
    setIsRolling(true);
    const result = Math.floor(Math.random() * 6) + 1;
    
    setTimeout(() => {
      setIsRolling(false);
      toast({
        title: `${type} - Resultado do dado:`,
        description: `Você tirou ${result}!`,
      });
    }, 1000);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Button
        variant="outline"
        className="bg-red-50 hover:bg-red-100 border-red-200"
        onClick={() => rollDice("Atacar")}
        disabled={isRolling}
      >
        <Sword className="mr-2" />
        Atacar
      </Button>
      <Button
        variant="outline"
        className="bg-blue-50 hover:bg-blue-100 border-blue-200"
        onClick={() => rollDice("Defender")}
        disabled={isRolling}
      >
        <Shield className="mr-2" />
        Defender
      </Button>
      <Button
        variant="outline"
        className="bg-purple-50 hover:bg-purple-100 border-purple-200"
        onClick={() => rollDice("Resistir")}
        disabled={isRolling}
      >
        <Heart className="mr-2" />
        Resistir
      </Button>
      <Button
        variant="outline"
        className="bg-green-50 hover:bg-green-100 border-green-200"
        onClick={() => rollDice("Sorte")}
        disabled={isRolling}
      >
        <Clover className="mr-2" />
        Sorte
      </Button>
    </div>
  );
};

export default DiceRoller;