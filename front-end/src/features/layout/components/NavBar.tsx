'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import {signIn, signOut, useSession} from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const { data } = useSession();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 mr-10 ml-10">
        <NavigationMenu>
          <NavigationMenuList className='gap-5'>
            <NavigationMenuItem>
              <Link href='/'>Home</Link>
            </NavigationMenuItem>
            {data?.user && (
              <NavigationMenuItem>
                <Link href='/projects'>Projects</Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList className='gap-5'>
            {data?.user && (
              <NavigationMenuItem>
                {data?.user.name}
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
              {data?.user ? (
                <Button onClick={() => signOut()}>Sign Out</Button>
              ) : (
                <>
                  <Button onClick={() => signIn()}>Sign In</Button>
                  <Link href='/auth/register'>
                    <Button>
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default NavBar;
