import React from 'react'
import { Button } from "@/components/ui/button";
import {
    FaYoutube,
    FaFacebookF,
    FaInstagram,
    FaTwitter,
} from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (

        <div className="w-full bg-primary text-primary-foreground py-5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-5 justify-between items-center px-4">
                    <Link href="/" className="flex items-center space-x-3">
                        <Image
                            src="/GSG.png"
                            alt="Logo"
                            width={50}
                            height={50}
                        />

                        <div className=" sm:block text-white font-semibold leading-tight text-sm">
                            A GOD SEEKING <br></br> GENERATION
                        </div>
                    </Link>

                <div className="flex items-center space-x-4 text-primary-foreground">
                    <FaYoutube className="hover:opacity-80 cursor-pointer" size={18} />
                    <FaFacebookF className="hover:opacity-80 cursor-pointer" size={18} />
                    <FaInstagram className="hover:opacity-80 cursor-pointer" size={18} />
                    <FaTwitter className="hover:opacity-80 cursor-pointer" size={18} />
                </div>


                <Button
                    variant="outline"
                    className="text-primary-foreground cursor-pointer bg-transparent hover:text-primary hover:bg-white flex items-center space-x-2"
                >
                    <span className="text-sm">Become a member</span>
                </Button>
            </div>
        </div>
    )
}

export default Footer