import { useEffect, useState } from "react";
import { CategoryLinks } from "./ui/CategoryLinks";
import { fetchCategories, type Category } from "../api/events";

/**
 * CategoryBar Component
 * Dynamically displays event categories fetched from the backend.
 */
export const CategoryBar = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err) {
                console.error('[CATEGORY_BAR_ERROR]:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadCategories();
    }, []);

    return (
        <div className="bg-white/80 backdrop-blur-md border-b border-soft-breeze shadow-sm top-[61px] z-40">
            <div className="max-w-7xl mx-auto">
                <ul className="flex items-center justify-start md:justify-center gap-8 text-sm font-medium text-slate-500 capitalize overflow-x-auto no-scrollbar px-6 py-3 font-body">
                    {isLoading ? (
                        // Skeleton loaders for categories
                        [1, 2, 3, 4, 5].map((i) => (
                            <li key={i} className="h-4 w-16 bg-slate-100 animate-pulse"></li>
                        ))
                    ) : (
                        categories.map((cat) => (
                            <CategoryLinks 
                                key={cat.category_id} 
                                link={cat.category_name} 
                            />
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};
