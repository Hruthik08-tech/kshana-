
import { NavBar } from '../components/NavBar';
import { CategoryBar } from '../components/CategoryBar';
import { EventCard } from '../components/EventCard';
import { SeeAllButton } from '../components/ui/SeeAllButton';
import { GenreCard } from '../components/GenreCards';

import { useEffect, useState } from 'react';
import { fetchEvents, fetchCategories, type Event, type Category } from '../api/events';

/**
 * Home Page Component
 * Serves as the landing page, displaying top-rated events and trending genres.
 * Data is fetched dynamically from the backend services.
 */
export default function Home() {
    const [events, setEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Effect hook to fetch all required page data on component mount.
     */
    useEffect(() => {
        const loadPageData = async () => {
            try {
                setIsLoading(true);
                // Fetch events and categories in parallel for better performance
                const [eventsData, categoriesData] = await Promise.all([
                    fetchEvents(),
                    fetchCategories()
                ]);
                
                setEvents(eventsData);
                setCategories(categoriesData);
                setError(null);
            } catch (err) {
                console.error('[HOME_LOAD_ERROR]:', err);
                setError('Failed to load content. Please check your connection and try again.');
            } finally {
                setIsLoading(false);
            }
        };

        loadPageData();
    }, []);

    return (
        <div className="bg-cloud-white font-body text-slate-800 antialiased selection:bg-clear-sky selection:text-midnight-navy min-h-screen">
            <NavBar />
            <CategoryBar />
            
            <main className="max-w-7xl mx-auto px-6 py-10 space-y-16">

                {/* Top Rated Events Section */}
                <section>
                    <div className="flex items-end justify-between mb-6">
                        <div className="space-y-1">
                            <h2 className="heading text-3xl text-midnight-navy font-bold">Top rated events</h2>
                            <p className="text-slate-500 text-sm">Handpicked experiences just for you</p>
                        </div>
                        <div className="hidden sm:flex gap-2">
                            <SeeAllButton />
                        </div>
                    </div>

                    {/* Events List Rendering */}
                    {isLoading ? (
                        <div className="flex gap-6 overflow-x-hidden py-2 no-scrollbar">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="shrink-0 w-80 h-[360px] bg-slate-200 animate-pulse rounded-2xl" />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="p-12 text-center bg-red-50 rounded-3xl border border-red-100">
                            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            </div>
                            <p className="text-red-800 font-semibold mb-2">Something went wrong</p>
                            <p className="text-red-600/80 text-sm mb-6">{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-xl text-sm hover:bg-red-700 hover:shadow-lg transition-all"
                            >
                                Tap to Retry
                            </button>
                        </div>
                    ) : events.length === 0 ? (
                        <div className="p-16 text-center bg-soft-breeze rounded-3xl border border-dashed border-slate-300">
                            <div className="mb-4 text-slate-400">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            </div>
                            <p className="text-slate-600 font-medium">No events found yet</p>
                            <p className="text-slate-400 text-sm mt-1">Check back later for exciting new experiences!</p>
                        </div>
                    ) : (
                        <div className="flex overflow-x-auto gap-6 pb-6 pt-2 no-scrollbar snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0">
                            {events.map((e) => (
                                <EventCard 
                                    key={e.id}
                                    event={{
                                        id: String(e.id),
                                        title: e.title,
                                        description: e.description || `Join us for ${e.title} at ${e.location_address}!`,
                                        rating: Number(e.rating),
                                        date: e.date,
                                        start_time: e.start_time,
                                        end_time: e.end_time,
                                    }}
                                    category_name={e.category_name}
                                    location_address={e.location_address}
                                    available_seats={e.available_seats}
                                    image_url="" 
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* Genre Section */}
                <section>
                    <div className="flex items-end justify-between mb-6">
                        <div className="space-y-1">
                            <h2 className="heading text-3xl text-midnight-navy font-bold">The best Genre</h2>
                            <p className="text-slate-500 text-sm">Explore events by your favorite interests</p>
                        </div>
                    </div>
                    
                    <div className="flex overflow-x-auto gap-6 pb-6 pt-2 no-scrollbar snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0">
                        {isLoading ? (
                            [1, 2, 3, 4].map((i) => (
                                <div key={i} className="shrink-0 w-64 h-64 bg-slate-200 animate-pulse rounded-2xl" />
                            ))
                        ) : (
                            categories.map((cat) => (
                                <GenreCard 
                                    key={cat.category_id}
                                    title={cat.category_name}
                                    eventCount={cat.event_count}
                                />
                            ))
                        )}
                    </div>
                </section>

            </main>
        </div> 
    );
};



