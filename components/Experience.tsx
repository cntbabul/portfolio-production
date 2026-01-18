"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ExperienceItem {
    role: string;
    company: string;
    period: string;
    description: string;
}

export function Experience({ experience }: { experience: ExperienceItem[] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section className="w-full overflow-hidden py-12">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-4xl font-chalk mb-12 text-center"
            >
                Experience
            </motion.h2>

            <div ref={containerRef} className="w-full overflow-hidden">
                <motion.div
                    className="flex gap-8 px-4 md:px-12 cursor-grab active:cursor-grabbing w-max"
                    drag="x"
                    dragConstraints={containerRef}
                    dragElastic={0.1}
                    dragTransition={{ power: 0.3, timeConstant: 200 }}
                >
                    {experience.map((exp, i) => (
                        <motion.div
                            key={i}
                            className="w-[90vw] md:w-[45vw] lg:w-[32vw] min-w-75 shrink-0"
                        >
                            <div className="chalk-border-straight p-8 bg-black/40 flex flex-col gap-4 relative isolate h-full min-h-75 hover:bg-black/50 transition-colors">
                                <div className="absolute -top-6 -left-4 bg-[#2b2b2b] px-4 py-2 chalk-border -rotate-2 z-20">
                                    <span className="text-xl font-hand font-bold text-(--text-primary)">{exp.period}</span>
                                </div>

                                <div className="mt-2">
                                    <h3 className="text-2xl font-chalk mb-1 text-(--text-primary)">{exp.role}</h3>
                                    <p className="text-xl font-hand text-(--text-secondary) mb-4 font-bold tracking-wide">{exp.company}</p>
                                    <div className="h-0.5 w-20 bg-(--border-accent)/20 mb-4 rounded-full" />
                                    <p className="text-lg font-hand leading-relaxed opacity-90 select-none text-(--text-primary)">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
