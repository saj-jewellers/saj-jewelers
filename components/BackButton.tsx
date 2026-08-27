"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ href = "/" }: { href?: string }) {
    return (
        <Link href={href} className="inline-block outline-none" aria-label="Back to Categories">
            <motion.div
                whileHover={{ scale: 1.08, x: -3 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/50 text-white hover:text-[#D4AF37] active:bg-[#D4AF37]/40 active:ring-2 active:ring-[#D4AF37] transition-colors shadow-sm cursor-pointer select-none"
            >
                <ArrowLeft className="w-5 h-5 transition-transform duration-200" />
            </motion.div>
        </Link>
    );
}
