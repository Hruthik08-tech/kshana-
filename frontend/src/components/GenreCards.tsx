import React from 'react';
import music from '../assets/genre_images/music.png';
import business from '../assets/genre_images/business.png';
import cooking from '../assets/genre_images/cooking.png';
import spiritual from '../assets/genre_images/spiritual.png';
import tech from '../assets/genre_images/tech.png';
import education from '../assets/genre_images/education.png';

/**
 * Image mapping for genre cards.
 */
const genreImages: Record<string, string> = {
    music,
    business,
    cooking,
    spiritual,
    tech,
    education
};

interface GenreCardProps {
    title: string;
    eventCount?: number;
    image?: string;
}

/**
 * Reusable GenreCard component for displaying event categories with style.
 */
export const GenreCard: React.FC<GenreCardProps> = ({ title, eventCount = 0, image }) => {
    const normalizedTitle = title.toLowerCase();
    const displayImage = image || genreImages[normalizedTitle] || genreImages['music'];

    return (
        <div className="relative group shrink-0 w-64 h-64 rounded-2xl shadow-sm overflow-hidden snap-start cursor-pointer border border-soft-breeze hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 left-0 p-6 z-20 w-full">
                <h3 className="display-2 !text-4xl font-bold text-white mb-1 uppercase drop-shadow-md">
                    {title}
                </h3>
                <p className="body text-sm text-white/90 font-medium">
                    {eventCount} active events
                </p>
            </div>
            <img 
                src={displayImage} 
                alt={title} 
                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-700 ease-out" 
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity"></div>
        </div>
    );
};

// Legacy exports for backward compatibility if needed, though we will update Home.tsx
export const MusicCard = () => <GenreCard title="Music" eventCount={124} />;
export const BusinessCard = () => <GenreCard title="Business" eventCount={124} />;
export const CookingCard = () => <GenreCard title="Cooking" eventCount={124} />;
export const SpiritualCard = () => <GenreCard title="Spiritual" eventCount={124} />;
export const TechCard = () => <GenreCard title="Tech" eventCount={124} />;
export const EducationCard = () => <GenreCard title="Education" eventCount={124} />;
