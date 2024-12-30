import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import Dashboard from "@/components/dashboard/Dashboard";

interface IndexProps {
  isRegister?: boolean;
}

const Index = ({ isRegister = false }: IndexProps) => {
  const [isLogin, setIsLogin] = useState(!isRegister);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <AuthForm
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      setIsLoggedIn={setIsLoggedIn}
    />
  );
};

export default Index;