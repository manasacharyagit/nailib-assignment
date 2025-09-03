"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import navlogo from "../assets/navlogo.svg";
import { Menu, X } from "lucide-react"; 
import login from "../app/login/page";



function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(false);


    const toggleMenu = () => setIsOpen(!isOpen);

    const router = useRouter()

    const handleLogin = () => {
        router.push('/login');

    }

    useEffect(() => {
        if (localStorage.theme === "dark") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
        } else {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
        }
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/auth/me", { cache: "no-store" });
                if (!res.ok) return setUser(null);
                const data = await res.json();
                if (data?.authenticated) setUser(data.user);
                else setUser(null);
            } catch {
                setUser(null);
            }
        })();
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setUser(null);
        router.refresh(); 
    };


    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-gray/20 backdrop-blur-md">
            <div className="container mx-auto flex flex-wrap py-2 px-5 flex-row items-center justify-between">
             
                <div className="flex items-center">
                    <Image src={navlogo} alt="Logo" width={40} height={40} />
                </div>

          
                <nav className="hidden md:flex space-x-5 text-base">
                    <nav className="hidden md:flex space-x-5 text-base">
                        <Link href="https://nailib.com/" className="hover:text-blue-600">IB Resources</Link>
                        <Link href="https://nailib.com/schools" className="hover:text-blue-600">Schools</Link>
                        <Link href="https://nailib.com/ib-past-papers" className="hover:text-blue-600">Past Papers</Link>
                        <Link href="https://nailib.com/ib-question-bank" className="hover:text-blue-600">Question Bank</Link>
                        <Link href="https://nailib.com/pricing" className="hover:text-blue-600">Pricing</Link>
                    </nav>

                </nav>
                <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    className="toggle"
                />

               
                <div className="flex items-center justify-center">
                    {user && <span className="mr-2 text-gray-700"> {user.name}</span>}
                    {user ? (<button onClick={handleLogout} className=" w-full cursor-pointer text-white p-2 bg-blue-400 py-2 rounded hover:bg-blue-500">
                        Logout
                    </button>) : (
                        <button onClick={handleLogin} className="w-full cursor-pointer text-white bg-blue-400 py-2 rounded hover:bg-blue-500">
                            Login
                        </button>
                    )

                    }

               
                    <button
                        className="md:hidden ml-3 p-2"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t">
                    <nav className="flex flex-col px-5 py-3 space-y-3">
                        <Link href="/resources" className="hover:text-blue-600">IB Resources</Link>
                        <Link href="/schools" className="hover:text-blue-600">Schools</Link>
                        <Link href="/past-papers" className="hover:text-blue-600">Past Papers</Link>
                        <Link href="/question-bank" className="hover:text-blue-600">Question Bank</Link>
                        <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>
                        {user ? (<button onClick={handleLogout} className="mt-3 cursor-pointer w-full bg-blue-400 py-2 rounded hover:bg-blue-500">
                            Log Out
                        </button>) : (
                            <button onClick={handleLogin} className="mt-3 w-full cursor-pointer bg-blue-400 py-2 rounded hover:bg-blue-500">
                                Login
                            </button>
                        )

                        }

                    </nav>
                </div>
            )}

        </header>
    );
}

export default Navbar;
