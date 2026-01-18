"use client";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
    title: string;
    description: string;
    link: string;
    type: string;
}

export function Projects({ projects }: { projects: Project[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center", // Center alignment usually looks better for 'focus'
        breakpoints: {
            '(min-width: 768px)': { align: 'start' }
        }
    });

    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCurrent(emblaApi.selectedScrollSnap() + 1);
        setCount(emblaApi.scrollSnapList().length);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setCount(emblaApi.scrollSnapList().length);
        setCurrent(emblaApi.selectedScrollSnap() + 1);
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const ProjectCard = ({ project }: { project: Project }) => (
        <div className={cn(
            "flex flex-col items-center gap-4 group h-full w-[85vw] md:w-[45vw] lg:w-[30vw] min-w-75 transition-all duration-300 transform scale-95 hover:scale-100"
        )}>
            {/* Card Container */}
            <div
                className="w-full aspect-video chalk-border-straight bg-black/40 overflow-hidden relative shadow-none hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-shadow duration-300"
            >
                {project.link && project.link !== "#" ? (
                    <div className="w-full h-full relative">
                        <iframe
                            src={project.link}
                            className="w-[400%] h-[400%] scale-[0.25] origin-top-left border-0 pointer-events-none"
                            title={project.title}
                            loading="lazy"
                            scrolling="no"
                        />
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-20 bg-transparent block"
                            aria-label={`Visit ${project.title}`}
                        />
                    </div>
                ) : (
                    <div className="absolute inset-0 p-2 pointer-events-none">
                        <div className="w-full h-full border border-(--border-accent)/20 rounded flex items-center justify-center bg-(--text-primary)/5">
                            <span className="text-sm font-hand opacity-60 text-(--text-primary)">
                                {project.type} Preview
                            </span>
                        </div>
                    </div>
                )}

                {/* Description Overlay - Bottom Left */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/95 via-black/60 to-transparent pt-16 z-10 flex flex-col justify-end items-start pointer-events-none">
                    <p className="font-hand text-(--text-primary)/90 text-sm md:text-base text-left line-clamp-2 drop-shadow-md select-none">
                        {project.description}
                    </p>
                </div>
            </div>

            {/* Title Badge */}
            <div className="chalk-border px-6 py-2 bg-black/60 backdrop-blur-sm -mt-6 z-20 transform -rotate-1 group-hover:rotate-0 transition-transform relative">
                <span className="text-xl font-hand font-bold text-(--text-primary)">{project.title}</span>
            </div>
        </div>
    );

    return (
        <section className="w-full overflow-hidden py-12">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-4xl font-chalk mb-12 text-center"
            >
                Projects
            </motion.h2>

            <div className="embla overflow-hidden px-4 md:px-0 py-8 -my-8" ref={emblaRef}>
                <div className="flex gap-4 md:gap-8 -ml-4">
                    {projects.map((project, idx) => (
                        <div key={idx} className="flex-[0_0_auto] pl-4">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-12 pb-8">
                <button
                    onClick={scrollPrev}
                    className="flex items-center gap-2 px-6 py-3 rounded-full chalk-border bg-black/50 hover:bg-black/80 hover:scale-105 active:scale-95 transition-all text-(--text-primary) font-hand text-lg group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Previous
                </button>

                <div className="px-8 py-3 rounded-full chalk-border bg-black/30 text-(--text-primary) font-chalk text-xl tracking-widest min-w-25 text-center">
                    {current} / {count}
                </div>

                <button
                    onClick={scrollNext}
                    className="flex items-center gap-2 px-6 py-3 rounded-full chalk-border bg-black/50 hover:bg-black/80 hover:scale-105 active:scale-95 transition-all text-(--text-primary) font-hand text-lg group"
                >
                    Next
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </section>
    );
}
