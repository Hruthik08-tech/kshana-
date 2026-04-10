import { ProfileCard } from "./ProfileCard";
import { Logo } from "./ui/Logo";
import { NavLinks } from "./ui/NavLinks";

export const NavBar = () => {
    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-soft-breeze sticky top-0 z-50 pt-2 pb-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <Logo />

                {/* Search — hidden on mobile */}
                <div className="flex-1 max-w-2xl hidden sm:block relative">
                    <input
                        type="text"
                        placeholder="Search events, organizers, or locations..."
                        className="w-full bg-soft-breeze border border-clear-sky text-slate-700 text-sm rounded-full py-2.5 pl-5 pr-12 focus:outline-none focus:border-delight-blue focus:ring-1 focus:ring-delight-blue transition-all placeholder:text-slate-400"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-delight-blue transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                <div className="flex items-center gap-6">
                    {/* NavLinks — hidden on mobile, shown md+ */}
                    <div className="hidden md:flex items-center gap-6">
                        <NavLinks link="Bookings" to="/bookings" />
                        <NavLinks link="Discover" to="/discover" />
                    </div>

                    <ProfileCard />

                    {/* Hamburger — only on mobile */}
                    <button className="md:hidden text-slate-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};