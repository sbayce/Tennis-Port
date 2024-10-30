"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { racketBrands, racketTypes } from "@/app/page"
import Link from "next/link"

function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-semibold">Rackets</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <>
                    <h3 className="font-semibold">Types</h3>
                    <div className="mt-4 flex flex-col gap-2 text-sm">
                      {racketTypes.map(racketType => 
                        <Link key={racketType} href={`/?type=${racketType}`} className="hover:text-yellow-400">{racketType}</Link>
                      )}
                    </div>
                  </>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <>
                    <h3 className="font-semibold">Brands</h3>
                    <div className="mt-4 flex flex-col gap-2 text-sm">
                      {racketBrands.map(racketBrand => 
                        <Link key={racketBrand} href={`/?brand=${racketBrand}`} className="hover:text-yellow-400">{racketBrand}</Link>
                      )}
                    </div>
                  </>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-semibold">Strings</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-6">
              <h3 className="font-semibold">Brands</h3>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] text-sm">
                {racketBrands.map((racketBrand) => (
                  <Link key={racketBrand} href={`/?brand=${racketBrand}`} className="hover:text-yellow-400">{racketBrand}</Link>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
export default NavMenu
