"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Category } from "@/lib/googleDrive";

export default function CategoryCard({ category }: { category: Category }) {
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            className="w-full"
        >
            <Link
                href={`/category/${category.id}?name=${encodeURIComponent(category.name)}`}
                className="group block relative overflow-hidden bg-card rounded-2xl border border-border/40 hover:border-primary shadow-sm hover:shadow-xl active:shadow-inner active:ring-2 active:ring-primary/60 transition-all duration-300 select-none outline-none"
            >
                <div className="aspect-[4/3] flex items-center justify-center bg-secondary/5 overflow-hidden relative">
                    {/* Category Thumbnail */}
                    {!imageError ? (
                        <img
                            src={`/categories/${category.name}.jpg`}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-active:scale-105"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        /* Fallback Placeholder */
                        <div className="absolute inset-0 flex items-center justify-center bg-secondary/10 w-full h-full">
                            <span className="text-4xl font-bold text-primary/40 group-hover:text-primary/80 transition-all duration-500 group-hover:scale-110 transform">
                                {category.name.charAt(0)}
                            </span>
                        </div>
                    )}

                    {/* Subtle Tap / Hover Ripple Light */}
                    <div className="absolute inset-0 bg-white/0 group-active:bg-white/10 group-hover:bg-primary/5 transition-colors duration-200 pointer-events-none" />
                </div>

                <div className="p-4 text-center relative z-10 bg-card border-t border-border/40 transition-colors group-hover:bg-card/90">
                    <h2 className="text-lg md:text-xl font-bold text-secondary group-hover:text-primary group-active:text-primary/80 transition-colors">
                        {category.name}
                    </h2>
                </div>
            </Link>
        </motion.div>
    );
}

