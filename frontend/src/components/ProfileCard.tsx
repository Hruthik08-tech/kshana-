import { useEffect, useRef, useState } from "react";
import { ProfileIcon } from "./ProfileIcon";
import { LogoutButton } from "./ui/LogoutButton";

export const ProfileCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2"
      >
        <ProfileIcon/>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-3 w-72 origin-top-right overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_18px_50px_rgba(15,23,42,0.14)] backdrop-blur-sm z-50 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="p-2">
            {/* Profile Header */}
            <div className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-sky-50 to-white px-3 py-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-sm font-semibold text-white shadow-sm">
                H
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900 font-body">
                  Hruthikesh
                </p>
                <p className="truncate text-xs text-slate-500 font-body">
                  hruthikesh@gmail.com
                </p>
              </div>
            </div>

            {/* Account Info */}
            <div className="px-1 py-3 font-body">
                <div className="rounded-xl px-3 py-2">
                  <p className="text-[11px] font-medium text-slate-400">
                    Location
                  </p>
                  <p className="text-sm text-slate-600">
                    Bengaluru, Karnataka
                  </p>
                </div>
            </div>

            {/* Logout */}
            <div className="border-t border-slate-100 pt-2">
                <div className="flex w-full items-center rounded-xl px-3 py-2 text-red-600">
                  <LogoutButton />
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
