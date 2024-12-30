import { useState } from "react";
import { Shield, User, KeyRound } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { toast } = useToast();

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

    toast({
      title: isLogin ? "Bem-vindo aventureiro!" : "Sua jornada começa agora!",
      description: isLogin ? "Login realizado com sucesso" : "Registro realizado com sucesso",
    });
  };

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
              onClick={() => setIsLogin(!isLogin)}
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