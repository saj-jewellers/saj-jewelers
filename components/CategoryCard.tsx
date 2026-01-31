"use client";

import Link from "next/link";
import { useState } from "react";
import type { Category } from "@/lib/googleDrive";

export default function CategoryCard({ category }: { category: Category }) {
    const [imageError, setImageError] = useState(false);

    return (
        <Link
            href={`/category/${category.id}?name=${encodeURIComponent(category.name)}`}
            className="group relative overflow-hidden bg-card rounded-2xl border border-border/50 hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300"
        >
            <div className="aspect-[4/3] flex items-center justify-center bg-secondary/5 overflow-hidden relative">
                {/* Category Thumbnail */}
                {!imageError ? (
                    <img
                        src={`/categories/${category.name}.jpg`}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
            </div>

            <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Overlay content if needed */}
            </div>

            <div className="p-4 text-center relative z-10 bg-card border-t border-border/50">
                <h2 className="text-lg md:text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                    {category.name}
                </h2>
            </div>
        </Link>
    );
}
