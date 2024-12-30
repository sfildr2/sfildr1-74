import { BookOpen, LogIn, Users } from "lucide-react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const AppNavigation = () => {
  return (
    <NavigationMenu className="fixed top-4 right-4">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={navigationMenuTriggerStyle()}>
            <BookOpen className="mr-2 h-4 w-4" />
            Portal do Aventureiro
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/login" className={navigationMenuTriggerStyle()}>
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/register" className={navigationMenuTriggerStyle()}>
            <Users className="mr-2 h-4 w-4" />
            Registro
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AppNavigation;