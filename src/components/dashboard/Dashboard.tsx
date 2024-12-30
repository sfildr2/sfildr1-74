import { Users, Sword, Plus, Play } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen p-6 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-medieval text-amber-900 mb-2">Portal do Aventureiro</h1>
        <p className="text-amber-800/60">Bem-vindo à sua jornada épica</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/80 border-amber-200/30">
          <CardHeader>
            <CardTitle className="font-medieval text-2xl text-amber-900 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Suas Aventuras
            </CardTitle>
            <CardDescription className="text-amber-800/60">
              Aventuras em que você participa como jogador
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50/50 rounded-lg p-4 border border-amber-200/30">
              <p className="text-amber-900">Nenhuma aventura encontrada</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 border-amber-200/30">
          <CardHeader>
            <CardTitle className="font-medieval text-2xl text-amber-900 flex items-center gap-2">
              <Sword className="w-6 h-6" />
              Suas Campanhas
            </CardTitle>
            <CardDescription className="text-amber-800/60">
              Aventuras em que você é o Mestre
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50/50 rounded-lg p-4 border border-amber-200/30">
              <p className="text-amber-900">Nenhuma campanha encontrada</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <button
          className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-medieval flex items-center gap-2 px-6 py-3 rounded-md border border-amber-200 transition-colors"
          onClick={() => toast({ title: "Em breve!", description: "Funcionalidade em desenvolvimento" })}
        >
          <Plus className="w-5 h-5" />
          Criar Nova Aventura
        </button>
        <button
          className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-medieval flex items-center gap-2 px-6 py-3 rounded-md border border-amber-200 transition-colors"
          onClick={() => toast({ title: "Em breve!", description: "Funcionalidade em desenvolvimento" })}
        >
          <Play className="w-5 h-5" />
          Entrar em Aventura
        </button>
      </div>
    </div>
  );
};

export default Dashboard;