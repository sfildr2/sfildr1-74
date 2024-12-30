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
          <Link to="/" className={navigationMenuTriggerStyle() + " bg-amber-100 text-amber-900 hover:bg-amber-200 hover:text-amber-900"}>
            <BookOpen className="mr-2 h-4 w-4" />
            Portal do Aventureiro
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/login" className={navigationMenuTriggerStyle() + " bg-amber-100 text-amber-900 hover:bg-amber-200 hover:text-amber-900"}>
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/register" className={navigationMenuTriggerStyle() + " bg-amber-100 text-amber-900 hover:bg-amber-200 hover:text-amber-900"}>
            <Users className="mr-2 h-4 w-4" />
            Registro
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AppNavigation;