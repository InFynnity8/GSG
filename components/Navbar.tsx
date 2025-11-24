"use client";

import Image from "next/image";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { IoIosArrowDown } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "./ui/button";

export default function Navbar() {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [mobileOpen, setMobileOpen] = useState(false);

    const controlNavbar = useCallback(() => {
        if (typeof window !== "undefined") {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // scrolling down
                setShow(false);
            } else {
                // scrolling up
                setShow(true);
            }

            setLastScrollY(currentScrollY);
        }
    }, [lastScrollY]
    )
    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);

        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [controlNavbar, lastScrollY]);

    return (
        <div className={`w-full z-100 shadow-sm sticky top-0 transition-all duration-400 ${show ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
            } bg-white shadow`}>



            <div className="w-full bg-white">
                <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">

                    <Link href="/" className="flex items-center space-x-3">
                        <Image
                            src="/GSG.png"
                            alt="Logo"
                            width={70}
                            height={70}
                            className="w-10 h-10 md:w-18 md:h-18"
                        />

                        <div className="border-l border-primary pl-3 md:pl-5 sm:block text-primary font-semibold leading-tight text-xs md:text-sm">
                            A GOD SEEKING <br />
                            GENERATION
                        </div>
                    </Link>


                    <div className="hidden md:flex items-center space-x-8 text-foreground text-md font-normal">

                        <Link href="/" className="hover:text-primary">
                            Home
                        </Link>


                        <Dropdown label="About" items={["History", "Leadership", "Mission", "Branches"]} />


                        <Dropdown label="Stores" items={["Books", "Merchandise", "Media"]} />


                        <Dropdown label="Other Links" items={["Departments", "Ministries", "Programs"]} />

                        <Link href="/give" className="hover:text-primary">
                            Donate
                        </Link>

                        <Link href="/events" className="hover:text-primary">
                            Events
                        </Link>

                        <Link href="/contact" className="hover:text-primary">
                            Contact
                        </Link>
                    </div>
                    <Button
                        onClick={() => setMobileOpen(true)}
                        variant='ghost'
                        className="md:hidden hover:text-primary text-3xl text-primary hover:bg-transparent cursor-pointer"
                    >
                        <FiMenu/>
                    </Button>
                </div>
            </div>
            {mobileOpen && (
                <div className="fixed inset-0 bg-black/40 z-100" >
                    <div className="fixed flex flex-col top-0 right-0 w-full h-screen bg-white shadow-xl p-6" >
                        <Button
                            onClick={() => setMobileOpen(false)}
                            variant='ghost'
                            className="text-3xl text-primary mb-6 self-end hover:bg-transparent hover:text-primary cursor-pointer"
                        >
                            <FiX />
                        </Button>

                        <div className="md:hidden flex flex-col gap-6 text-lg text-primary">
                            <Link href="/" className="hover:underline" onClick={() => setMobileOpen(false)}>Home</Link>
                            <Link href="/about" className="hover:underline" onClick={() => setMobileOpen(false)}>About</Link>
                            <Link href="/store" className="hover:underline" onClick={() => setMobileOpen(false)}>Stores</Link>
                            <Link href="/ministries" className="hover:underline" onClick={() => setMobileOpen(false)}>Other Links</Link>
                            <Link href="/give" className="hover:underline" onClick={() => setMobileOpen(false)}>Donate</Link>
                            <Link href="/events" className="hover:underline" onClick={() => setMobileOpen(false)}>Events</Link>
                            <Link href="/contact" className="hover:underline" onClick={() => setMobileOpen(false)}>Contact</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


function Dropdown({ label, items }: { label: string; items: string[] }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 outline-none hover:text-primary">
                <span>{label}</span>
                <IoIosArrowDown size={12} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-popover-foreground shadow-md z-300">
                {items.map((item) => (
                    <DropdownMenuItem
                        key={item}
                        className="hover:bg-accent cursor-pointer text-md"
                    >
                        {item}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
