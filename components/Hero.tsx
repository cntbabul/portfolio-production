"use client";
import { cn } from "@/lib/utils";
import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroProps {
    personalInfo: {
        name: string;
        title: string;
        contacts: { type: string; value: string; label: string }[];
        profileImageUrl?: string;
    };
    techStack: string[];
}

export function Hero({ personalInfo, techStack }: HeroProps) {
    const handleContactClick = (contact: { type: string, value: string }) => {
        if (contact.type === "whatsapp") {
            const formatted = contact.value.replace(/[^0-9]/g, "");
            window.open(`https://wa.me/${formatted}`, "_blank");
        } else if (contact.type === "call") {
            window.open(`tel:${contact.value}`, "_self");
        }
    };
    return (
        <section className="w-full max-w-5xl mx-auto p-4 md:p-8 flex flex-col gap-6 md:gap-8 pt-16 md:pt-28">
            <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-4 md:gap-8">
                {/* Intro Text */}
                <div className="flex-1 space-y-4 pt-4">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-hand"
                    >
                        hello, i am
                    </motion.h2>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-5xl md:text-7xl font-chalk tracking-wider"
                    >
                        {personalInfo.name}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl md:text-3xl font-hand"
                    >
                        {personalInfo.title}
                    </motion.p>

                    {/* Contact Pills */}
                    <div className="flex flex-wrap gap-4 mt-6 md:mt-8">
                        {personalInfo.contacts.map((contact, idx) => (
                            <motion.div
                                key={contact.type || idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + idx * 0.1 }}
                                onClick={() => handleContactClick(contact)}
                                className="chalk-border px-6 py-3 flex items-center gap-2 bg-black/20 backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer"
                            >
                                {contact.type === "call" ? <Phone size={20} /> : <MessageCircle size={20} />}
                                <span className="text-xl font-hand font-bold">{contact.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Profile Image */}
                <motion.div
                    initial={{ opacity: 0, rotate: 5 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="w-full md:w-80 h-64 md:h-96 chalk-border flex items-center justify-center bg-black/20 overflow-hidden relative shadow-lg"
                >
                    <Image
                        src={personalInfo.profileImageUrl || "/profile.png"}
                        alt="Profile"
                        width={320}
                        height={384}
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-2xl font-chalk opacity-0">Profile Photo</span>
                    </div>
                </motion.div>
            </div>

            {/* Tech Stack Bar */}
            <motion.div
                initial={{ opacity: 0, width: "0%" }}
                whileInView={{ opacity: 1, width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full chalk-border p-1 flex mt-8 md:mt-0 overflow-hidden bg-(--text-secondary)/10"
            >
                <div className="flex w-full overflow-hidden relative">
                    <motion.div
                        className="flex min-w-full"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 20,
                        }}
                    >
                        {[...techStack, ...techStack].map((tech, idx) => (
                            <div
                                key={`${tech}-${idx}`}
                                className="shrink-0 px-8 py-4 text-2xl md:text-3xl font-hand font-bold hover:bg-(--text-primary)/10 transition-colors whitespace-nowrap border-r-2 border-(--text-primary)/80"
                            >
                                {tech}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
