import React from 'react';

// Dynamically import all images in the event_images asset directory
const imageModules = import.meta.glob('../assets/event_images/*/*.{jpg,jpeg,png,webp}', { eager: true });

const imagesByCategory: Record<string, string[]> = {};
for (const path in imageModules) {
  const match = path.match(/\/event_images\/([^\/]+)\//);
  if (match) {
    const categoryName = match[1].toLowerCase();
    if (!imagesByCategory[categoryName]) {
      imagesByCategory[categoryName] = [];
    }
    // @ts-ignore - Vite default import mapping
    imagesByCategory[categoryName].push(imageModules[path].default || imageModules[path]);
  }
}

// Sort alphabetically to assure deterministic order across reloads
for (const category in imagesByCategory) {
  imagesByCategory[category].sort();
}

// Basic string hashing function
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

// Strict schema types enforced
interface EventCardProps {
  event: {
    id: string;
    title: string;          // Mapped from event_name
    description: string;    // Required by schema for hover state
    rating: number;         // Mapped from event_rating
    date: string;           // Mapped from event_date
    start_time: string;     // Mapped from event_start_time
    end_time: string;       // Mapped from event_end_time
  };
  category_name: string;    // Joined from categories schema
  location_address: string; // Joined from locations schema
  image_url: string;        // External asset (used as fallback now)
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  category_name, 
  location_address, 
  image_url 
}) => {
  // Determine images based on category, fallback to a valid category if unmapped/empty
  const normalizedCategory = category_name?.toLowerCase() || '';
  let availableImages = imagesByCategory[normalizedCategory];
  let displayCategory = category_name;
  
  if (!availableImages || availableImages.length === 0) {
    // If the category is not one of our event_images, we pick a valid one deterministically
    const validCategories = Object.keys(imagesByCategory);
    if (validCategories.length > 0) {
      const hash = hashString(event.id?.toString() || event.title || 'default');
      const selectedCategory = validCategories[hash % validCategories.length];
      
      availableImages = imagesByCategory[selectedCategory];
      // Update the display category to the selected valid one
      displayCategory = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
    } else {
      availableImages = [image_url];
    }
  }

  // Hash event id (or title) to get deterministic index
  const hash = hashString(event.id?.toString() || event.title || 'default');
  const index = hash % availableImages.length;
  // Fallback to original image_url if somehow empty
  const finalImageUrl = availableImages[index] || image_url;

  return (
    <div className="group shrink-0 w-96 sm:w-80 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-soft-breeze overflow-hidden snap-start transition-all duration-300 cursor-pointer flex flex-col h-[360px] relative">
      
      {/* Header / Image Area */}
      <div className="h-[180px] w-full relative overflow-hidden bg-soft-breeze shrink-0">
        <img
          src={finalImageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
          ⭐ {event.rating.toFixed(1)}
        </div>
      </div>

      {/* Body Content - Rounded Top Corners over image */}
      <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-t-[1.5rem] relative -mt-6 pt-5 pl-5 pr-10 pb-0 z-10 flex flex-col min-h-[240px] transition-transform duration-300 ease-out group-hover:-translate-y-[4.5rem]">
        
        {/* Category & Date/Time info */}
        <div className="flex flex-col mb-3">
          <p className="text-[11px] font-semibold text-delight-blue tracking-wider uppercase mb-1">
            {displayCategory}
          </p>
          <div className="text-[11px] text-slate-500 font-medium tracking-wide flex items-center gap-1.5 flex-wrap">
            <span>{event.date}</span>
            <span className="text-slate-300">•</span>
            <span>{event.start_time} - {event.end_time}</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="font-playfair text-xl font-bold text-midnight-navy mb-3 group-hover:text-delight-blue transition-colors line-clamp-1">
          {event.title}
        </h3>
        
        {/* Location & Seats */}
        <div className="flex items-center justify-between text-xs text-slate-400">
           <div className="flex items-center gap-1 flex-1 min-w-0 pr-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span className="truncate">{location_address}</span>
           </div>
        </div>

        {/* Revealed Description (pulled into view when translating Y) */}
        <div className="mt-4 opacity-0 transform translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75 ease-out">
           <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
             {event.description}
           </p>
        </div>

      </div>
    </div>
  );
};