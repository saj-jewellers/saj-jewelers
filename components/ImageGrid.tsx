"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import type { DriveImage } from "@/lib/googleDrive"; // I need to export the type or redefine it

interface DriveImageProps {
    id: string;
    name: string;
    thumbnailLink: string | null | undefined;
    src: string | null | undefined;
}

import Image from "next/image";

// ... (keep interface)

export default function ImageGrid({ images }: { images: DriveImageProps[] }) {
    const [selectedImage, setSelectedImage] = useState<DriveImageProps | null>(null);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image) => (
                    <motion.div
                        key={image.id}
                        layoutId={`card-${image.id}`}
                        className="relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-secondary/5 border border-transparent hover:border-primary/30 group"
                        onClick={() => setSelectedImage(image)}
                        whileHover={{ y: -5 }}
                    >
                        <Image
                            src={`/api/images/${image.id}`}
                            alt={image.name}
                            fill
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <ZoomIn className="text-white w-8 h-8 drop-shadow-lg" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 z-50 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                        >
                            <X size={24} />
                        </button>

                        <motion.div
                            layoutId={`card-${selectedImage.id}`}
                            className="relative w-full h-full flex items-center justify-center p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full max-w-[90vw] max-h-[90vh]">
                                <Image
                                    src={`/api/images/${selectedImage.id}`}
                                    alt={selectedImage.name}
                                    fill
                                    className="object-contain"
                                    sizes="90vw"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
