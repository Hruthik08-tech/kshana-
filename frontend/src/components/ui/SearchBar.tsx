
export const SearchBar = () => {
    return (
        <div className="flex-1 w-full relative shadow-2xl rounded-full group">
            <input 
                type="text" 
                id="searchInput"
                placeholder="Search events in Bengaluru..." 
                className="w-full bg-white/95 backdrop-blur-md border border-airy-200 text-slate-700 text-sm sm:text-base rounded-full py-3 sm:py-4 pl-5 sm:pl-6 pr-12 sm:pr-32 focus:outline-none focus:border-airy-500 focus:ring-4 focus:ring-airy-500/10 transition-all placeholder:text-slate-400"
            />
            {/* Desktop Button */}
            <button 
                id="searchBtn"
                className="hidden sm:block absolute right-1.5 top-1.5 bottom-1.5 bg-airy-900 text-white px-8 rounded-full font-bold text-sm hover:bg-airy-700 transition-all active:scale-95"
            >
                Search
            </button>
            {/* Mobile Icon Button */}
            <button 
                className="sm:hidden absolute right-1.5 top-1.5 bottom-1.5 bg-airy-900 text-white w-10 h-10 flex items-center justify-center rounded-full active:scale-90"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
        </div>
    );
};






