import { getCategoryFolders } from "@/lib/googleDrive";
import Link from "next/link";
import { Gem } from "lucide-react";
import CategoryCard from "@/components/CategoryCard";

export const revalidate = 3600; // Cache for 1 hour

export default async function Home() {
  const categories = await getCategoryFolders();

  return (
    <main className="min-h-screen bg-[#002147] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16 flex flex-col items-center">
          {/* Logo */}
          <div className="mb-8 relative w-32 md:w-48">
            <img
              src="/logo.png"
              alt="Saj Jewelers Logo"
              className="w-full h-auto object-contain drop-shadow-sm"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-4 tracking-tight">
            Welcome to Saj Jewelers
          </h1>
          <p className="text-lg text-[#F5F5DC] max-w-2xl mx-auto">
            Browse our jewelry designs
          </p>
        </header>

        {categories.length === 0 ? (
          <div className="text-center p-12 bg-card rounded-xl border border-border">
            <p className="text-secondary/60">Loading categories... or check configuration.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}

        <footer className="mt-20 text-center text-sm text-white/50 border-t border-[#D4AF37]/30 pt-8">
          <p>© {new Date().getFullYear()} Saj Jewelers. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
