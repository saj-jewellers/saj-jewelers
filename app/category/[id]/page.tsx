import { getImagesInFolder } from "@/lib/googleDrive";
import ImageGrid from "@/components/ImageGrid";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 3600;

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ name?: string }>;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const { name } = await searchParams;

    const images = await getImagesInFolder(id);

    return (
        <main className="min-h-screen bg-[#002147] p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex items-center gap-4 border-b border-[#D4AF37]/30 pb-4">
                    <Link
                        href="/"
                        className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors text-white hover:text-[#D4AF37]"
                        aria-label="Back to Categories"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#D4AF37]">
                        {name ? decodeURIComponent(name) : 'Gallery'}
                    </h1>
                    <span className="ml-auto text-sm text-white/60 font-mono">
                        {images.length} Items
                    </span>
                </header>

                {images.length === 0 ? (
                    <div className="text-center py-32 bg-secondary/5 rounded-2xl border border-dashed border-secondary/20">
                        <p className="text-secondary/50 text-xl font-medium">No images found in this category yet.</p>
                        <Link href="/" className="inline-block mt-4 text-primary hover:underline">
                            Return Home
                        </Link>
                    </div>
                ) : (
                    <ImageGrid images={images} />
                )}
            </div>
        </main>
    );
}
