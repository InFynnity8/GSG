"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


function ListItem({
  title,
  href,
}: {
  title: string
  href: string
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={href} className="text-sm font-medium text-foreground hover:text-primary">
          {title}
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">

     
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

   
        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className="grid gap-4 w-[200px] p-4">
              <ListItem title="History" href="/about/history" />
              <ListItem title="Leadership" href="/about/leadership" />
              <ListItem title="Mission" href="/about/mission" />
              <ListItem title="Branches" href="/about/branches" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Stores</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className="grid gap-4 w-[200px] p-4">
              <ListItem title="Books" href="/stores/books" />
              <ListItem title="Merchandise" href="/stores/merch" />
              <ListItem title="Media" href="/stores/media" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

     
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/departments">Departments</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

    
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/give">Donate</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

   
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/events">Events</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

  
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/contact">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}
