"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";

interface DriveImageProps {
    id: string;
    name: string;
    thumbnailLink: string | null | undefined;
    src: string | null | undefined;
}

export default function ImageGrid({ images }: { images: DriveImageProps[] }) {
    const [selectedImage, setSelectedImage] = useState<DriveImageProps | null>(null);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {images.map((image) => (
                    <motion.div
                        key={image.id}
                        layoutId={`card-${image.id}`}
                        className="relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/80 group shadow-md hover:shadow-2xl active:ring-4 active:ring-[#D4AF37]/60 active:scale-95 transition-shadow duration-300 select-none outline-none"
                        onClick={() => setSelectedImage(image)}
                        whileHover={{ y: -6, scale: 1.02 }}
                        whileTap={{ scale: 0.94 }}
                        transition={{ type: "spring", stiffness: 450, damping: 25 }}
                    >
                        <Image
                            src={`/api/images/${image.id}`}
                            alt={image.name}
                            fill
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 group-active:scale-105"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />

                        {/* Interactive overlay on hover/tap */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileHover={{ scale: 1.1 }}
                                className="p-3 rounded-full bg-black/40 backdrop-blur-sm border border-[#D4AF37]/50 text-[#D4AF37] shadow-lg"
                            >
                                <ZoomIn className="w-6 h-6" />
                            </motion.div>
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
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Interactive Cross Close Button */}
                        <motion.button
                            onClick={() => setSelectedImage(null)}
                            whileHover={{ scale: 1.15, rotate: 90 }}
                            whileTap={{ scale: 0.82, rotate: 180 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="absolute top-5 right-5 md:top-8 md:right-8 z-50 p-3 text-white hover:text-[#D4AF37] bg-white/10 hover:bg-white/20 active:bg-[#D4AF37]/30 border border-white/20 hover:border-[#D4AF37]/50 active:ring-2 active:ring-[#D4AF37] rounded-full backdrop-blur-md shadow-lg cursor-pointer outline-none transition-colors"
                            aria-label="Close image preview"
                        >
                            <X className="w-6 h-6 md:w-7 md:h-7" />
                        </motion.button>

                        {/* Modal Image Display */}
                        <motion.div
                            layoutId={`card-${selectedImage.id}`}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 350, damping: 28 }}
                            className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center p-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 flex items-center justify-center"
                            >
                                <Image
                                    src={`/api/images/${selectedImage.id}`}
                                    alt={selectedImage.name}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 1200px) 95vw, 1200px"
                                    priority
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

