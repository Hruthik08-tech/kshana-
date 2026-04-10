

// ProfileIcon.jsx
export const ProfileIcon = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full 
                 bg-sky-100 text-sky-700 font-bold border-2 border-sky-200 
                 transition-all hover:bg-sky-200 hover:shadow-md active:scale-95"
    >
      H
    </div>
  );
};
