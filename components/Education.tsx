"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface EducationItem {
    degree: string;
    institute: string;
    year: string;
}

export function Education({ education }: { education: EducationItem[] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section className="w-full overflow-hidden py-12 pb-24">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-4xl font-chalk mb-12 text-center"
            >
                Education
            </motion.h2>

            <div ref={containerRef} className="w-full overflow-hidden">
                <motion.div
                    className="flex gap-8 px-4 md:px-12 cursor-grab active:cursor-grabbing w-max items-end"
                    drag="x"
                    dragConstraints={containerRef}
                    dragElastic={0.1}
                    dragTransition={{ power: 0.3, timeConstant: 200 }}
                >
                    {education.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            className="w-[75vw] md:w-[40vw] lg:w-[25vw] min-w-64 shrink-0"
                        >
                            <div className="flex flex-col items-center w-full group">
                                {/* Degree Pill */}
                                <div className="chalk-border px-6 py-3 bg-black/40 -mb-4 z-10 relative w-[90%] text-center transition-transform duration-300 group-hover:-translate-y-2">
                                    <span className="text-xl md:text-2xl font-hand font-bold whitespace-nowrap overflow-hidden text-ellipsis">{edu.degree}</span>
                                </div>

                                {/* Content Box */}
                                <div className="w-full h-full min-h-36 chalk-border bg-black/30 flex flex-col items-center justify-center p-6 hover:bg-black/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                    <p className="text-lg md:text-2xl font-chalk text-center opacity-90 leading-tight mb-2 text-(--text-primary)">
                                        {edu.institute}
                                    </p>
                                    <p className="text-lg font-hand text-(--text-secondary)">
                                        {edu.year}
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
