import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CharacterImage = ({ name }: { name: string }) => {
  return (
    <Card className="bg-white/80 border-amber-200/30">
      <CardContent className="p-6">
        <div className="w-full aspect-square bg-amber-50/50 rounded-lg border-2 border-dashed border-amber-200/50 flex items-center justify-center">
          <User className="w-1/2 h-1/2 text-amber-200/50" />
        </div>
        <p className="text-center mt-2 text-amber-800 font-medieval">{name}</p>
      </CardContent>
    </Card>
  );
};

export default CharacterImage;