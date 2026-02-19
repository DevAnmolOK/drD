import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const CategoryDropdown = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: any) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCategoryName =
    categories.find((c: any) => c.id === selectedCategory)?.name || "All";

  //  Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full md:w-[360px]">
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className=" w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold bg-bgSecondaryone/10 text-textSecondary  hover:bg-gray-200 transition-all"
      >
        <span>{selectedCategoryName}</span>
        <FiChevronDown
          className={`transition-transform duration-300 ${
            open ? "-rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute z-50 mt-2 w-full  bg-white rounded-lg shadow-lg border border-gray-100 max-h-64 overflow-y-auto">
          {categories.map((category: any) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.slug);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-base font-semibold transition-all ${
                selectedCategory === category.id
                  ? "bg- text-secondary hover:bg-secondary/10"
                  : "hover:bg-secondary/10 text-textSecondary"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
