import { Shield, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    skills: [] // Empty for now
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
              <CardTitle className="font-medieval text-2xl text-amber-900 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Atributos
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {Object.entries(character.attributes).map(([key, value]) => (
                <div key={key} className="bg-amber-50/50 p-3 rounded-lg border border-amber-200/30">
                  <span className="font-medieval text-amber-900 uppercase">{key}</span>
                  <div className="text-2xl font-bold text-amber-800">{value}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-amber-200/30">
            <CardHeader>
              <CardTitle className="font-medieval text-2xl text-amber-900">Status</CardTitle>
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
              <CardTitle className="font-medieval text-2xl text-amber-900 flex items-center gap-2">
                <User className="w-6 h-6" />
                Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-48 h-48 bg-amber-50 rounded-lg border-2 border-amber-200 flex items-center justify-center">
                <User className="w-24 h-24 text-amber-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-amber-200/30">
            <CardHeader>
              <CardTitle className="font-medieval text-2xl text-amber-900">Skills</CardTitle>
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