"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Home, FolderGit2, Briefcase, GraduationCap } from "lucide-react";

const navItems = [
    { name: "Home", id: "hero", icon: Home },
    { name: "Projects", id: "projects", icon: FolderGit2 },
    { name: "Experience", id: "experience", icon: Briefcase },
    { name: "Education", id: "education", icon: GraduationCap },
];

export function Navbar() {
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map((item) => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 150; // Offset for better triggering

            // Check if we are at the bottom of the page
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 20) {
                setActiveSection(navItems[navItems.length - 1].id);
                return;
            }

            for (const section of sections) {
                if (!section) continue;
                // Check if top of section is near viewport top or within viewport
                if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 60, // Adjust for top header
                behavior: "smooth",
            });
            setActiveSection(id);
        }
    };

    return (
        <>
            {/* Desktop Navbar (Top) */}
            <nav className="hidden md:flex fixed top-0 inset-x-0 w-full bg-[#2b2b2b]/95 backdrop-blur-md border-b-2 border-white/20 px-8 py-2 z-50 items-center justify-center gap-12 h-14 shadow-2xl">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                            "text-lg font-hand transition-all duration-300 relative px-2 hover:scale-110",
                            activeSection === item.id ? "text-white font-bold" : "text-white/60 hover:text-white/80"
                        )}
                    >
                        {item.name}
                        {activeSection === item.id && (
                            <motion.div
                                layoutId="activeTabDesktop"
                                className="absolute -bottom-2 left-0 right-0 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                            />
                        )}
                    </button>
                ))}
            </nav>

            {/* Mobile Navbar (Bottom) */}
            <nav className="md:hidden fixed bottom-0 inset-x-0 bg-[#1a1a1a] border-t-2 border-white/20 z-50 pb-safe">
                <div className="flex justify-around items-center h-20 px-2 bg-black/10 backdrop-blur-lg">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="flex flex-col items-center justify-center gap-1 w-full h-full"
                            >
                                <div
                                    className={cn(
                                        "relative transition-all duration-300",
                                        isActive ? "scale-100" : "scale-100"
                                    )}
                                >
                                    <Icon
                                        size={isActive ? 28 : 24}
                                        className={cn(
                                            "transition-all duration-300",
                                            isActive ? "text-white stroke-[2.5px]" : "text-white/50"
                                        )}
                                    />
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabMobile"
                                            className="absolute inset-0 bg-white/20 blur-lg rounded-full"
                                        />
                                    )}
                                </div>

                                <span className={cn(
                                    "text-sm font-hand transition-all duration-300",
                                    isActive ? "text-white font-bold opacity-100 scale-110" : "text-white/50"
                                )}>
                                    {item.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
