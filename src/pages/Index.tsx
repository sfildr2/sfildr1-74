import { useState } from "react";
import { Shield, User, KeyRound, Sword, Users, Plus, Play } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface IndexProps {
  isRegister?: boolean;
}

const Index = ({ isRegister = false }: IndexProps) => {
  const [isLogin, setIsLogin] = useState(!isRegister);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "As senhas não coincidem",
      });
      return;
    }

    setIsLoggedIn(true);
    toast({
      title: isLogin ? "Bem-vindo aventureiro!" : "Sua jornada começa agora!",
      description: isLogin ? "Login realizado com sucesso" : "Registro realizado com sucesso",
    });
    navigate("/");
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen p-6 space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-medieval text-amber-100 mb-2">Portal do Aventureiro</h1>
          <p className="text-amber-200/60">Bem-vindo à sua jornada épica</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Seção de Aventuras como Jogador */}
          <Card className="bg-black/20 border-amber-800/30">
            <CardHeader>
              <CardTitle className="font-medieval text-2xl text-amber-100 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Suas Aventuras
              </CardTitle>
              <CardDescription className="text-amber-200/60">
                Aventuras em que você participa como jogador
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-black/30 rounded-lg p-4 border border-amber-800/30">
                <p className="text-amber-100">Nenhuma aventura encontrada</p>
              </div>
            </CardContent>
          </Card>

          {/* Seção de Aventuras como Mestre */}
          <Card className="bg-black/20 border-amber-800/30">
            <CardHeader>
              <CardTitle className="font-medieval text-2xl text-amber-100 flex items-center gap-2">
                <Sword className="w-6 h-6" />
                Suas Campanhas
              </CardTitle>
              <CardDescription className="text-amber-200/60">
                Aventuras em que você é o Mestre
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-black/30 rounded-lg p-4 border border-amber-800/30">
                <p className="text-amber-100">Nenhuma campanha encontrada</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            className="bg-amber-900/90 hover:bg-amber-800/90 text-amber-100 font-medieval flex items-center gap-2"
            onClick={() => toast({ title: "Em breve!", description: "Funcionalidade em desenvolvimento" })}
          >
            <Plus className="w-5 h-5" />
            Criar Nova Aventura
          </Button>
          <Button
            className="bg-amber-900/90 hover:bg-amber-800/90 text-amber-100 font-medieval flex items-center gap-2"
            onClick={() => toast({ title: "Em breve!", description: "Funcionalidade em desenvolvimento" })}
          >
            <Play className="w-5 h-5" />
            Entrar em Aventura
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-medieval-pattern flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="relative bg-white/10 backdrop-blur-sm rounded-lg border border-amber-800/30 p-8 shadow-xl transition-all duration-500">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="bg-amber-900/90 p-4 rounded-full shadow-xl">
              <Shield className="w-8 h-8 text-amber-100" />
            </div>
          </div>

          <h2 className="text-3xl font-medieval text-center mb-8 mt-4 text-amber-100">
            {isLogin ? "Portal do Aventureiro" : "Nova Jornada"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-200/60 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Nome do aventureiro"
                  className="w-full bg-black/20 border border-amber-800/30 rounded-md py-2 pl-10 pr-4 text-amber-100 placeholder:text-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-200/60 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Senha mágica"
                  className="w-full bg-black/20 border border-amber-800/30 rounded-md py-2 pl-10 pr-4 text-amber-100 placeholder:text-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-200/60 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="Confirmar senha mágica"
                    className="w-full bg-black/20 border border-amber-800/30 rounded-md py-2 pl-10 pr-4 text-amber-100 placeholder:text-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-amber-900/90 hover:bg-amber-800/90 text-amber-100 rounded-md py-2 transition-colors duration-200 font-medieval"
            >
              {isLogin ? "Entrar no Reino" : "Iniciar Jornada"}
            </button>
          </form>

          <p className="mt-6 text-center text-amber-200/80 text-sm">
            {isLogin ? "Não possui uma conta?" : "Já possui uma conta?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                navigate(isLogin ? "/register" : "/login");
              }}
              className="ml-2 text-amber-400 hover:text-amber-300 transition-colors duration-200 font-medieval"
            >
              {isLogin ? "Registre-se" : "Entre"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;