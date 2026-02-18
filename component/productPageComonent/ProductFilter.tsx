"use client";
import { useState, useRef, useEffect } from "react";
import { FaSortDown } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { PiPackageLight } from "react-icons/pi";

interface FilterItem {
  id: string;
  name: string;
  slug?: string;
}

interface FilterMenu {
  [key: string]: FilterItem[];
}

interface DynamicProductFilterProps {
  filterMenu: FilterMenu;
  onFilterChange: (group: string, selectedSlugs: string[]) => void;
  onSpecialFilter?: (filterType: "upcoming" | "new_launched") => void;
  onShowAllProducts?: () => void;
  totalProducts: any;
}

// Define display names and slug mappings for API parameters
const FILTER_CONFIG = {
  productTypes: {
    displayName: "Product Form",
    apiParam: "type_slug",
  },
  concerns: {
    displayName: "Concerns",
    apiParam: "concern_slug",
  },
  categories: {
    displayName: "Therapathic",
    apiParam: "therapatic_slug",
  },
  specialities: {
    displayName: "Specialities",
    apiParam: "speciality_slug",
  },
  divisions: {
    displayName: "Divisions",
    apiParam: "division_slug",
  },
  // Add more mappings as needed when API adds new fields
};

export default function DynamicProductFilter({
  filterMenu,
  onFilterChange,
  onSpecialFilter,
  onShowAllProducts,
  totalProducts,
}: DynamicProductFilterProps) {
  const [openFilters, setOpenFilters] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [dropdownHeights, setDropdownHeights] = useState<
    Record<string, number>
  >({});
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Track previous state to avoid unnecessary calls
  const prevSelectedFiltersRef = useRef<Record<string, string[]>>({});

  // Calculate dropdown heights for smooth animations
  useEffect(() => {
    const heights: Record<string, number> = {};
    Object.keys(contentRefs.current).forEach((key) => {
      const height = contentRefs.current[key]?.scrollHeight || 0;
      heights[key] = height;
    });
    setDropdownHeights(heights);
  }, [openFilters, filterMenu]);

  // Effect to handle filter changes - this will run after render completes
  useEffect(() => {
    const prevFilters = prevSelectedFiltersRef.current;

    // Check if filters actually changed
    const filtersChanged =
      Object.keys(selectedFilters).some(
        (key) =>
          JSON.stringify(selectedFilters[key]) !==
          JSON.stringify(prevFilters[key]),
      ) ||
      Object.keys(prevFilters).some(
        (key) =>
          JSON.stringify(selectedFilters[key]) !==
          JSON.stringify(prevFilters[key]),
      );

    if (filtersChanged) {
      // Update parent with all current filter states
      Object.keys(filterMenu).forEach((groupKey) => {
        const currentSelection = selectedFilters[groupKey] || [];
        onFilterChange(groupKey, currentSelection);
      });

      // Update ref to track changes
      prevSelectedFiltersRef.current = { ...selectedFilters };
    }
  }, [selectedFilters, onFilterChange, filterMenu]);

  const toggleDropdown = (filterKey: string) => {
    setOpenFilters((prev) =>
      prev.includes(filterKey)
        ? prev.filter((f) => f !== filterKey)
        : [...prev, filterKey],
    );
  };

  const toggleSelection = (groupKey: string, slug: string) => {
    if (!slug) return;

    setSelectedFilters((prev) => {
      const currentSelection = prev[groupKey] || [];
      const updatedSelection = currentSelection.includes(slug)
        ? currentSelection.filter((s) => s !== slug)
        : [...currentSelection, slug];

      return {
        ...prev,
        [groupKey]: updatedSelection,
      };
    });
  };

  const removeSingleFilter = (groupKey: string, slug: string) => {
    setSelectedFilters((prev) => {
      const updatedSelection = (prev[groupKey] || []).filter((s) => s !== slug);

      return {
        ...prev,
        [groupKey]: updatedSelection,
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    setOpenFilters([]);
  };

  // Handle clear all and show all products
  const handleClearAll = () => {
    clearAllFilters();
    if (onShowAllProducts) {
      // Use setTimeout to ensure state update completes first
      setTimeout(() => {
        onShowAllProducts();
      }, 0);
    }
  };

  // Handle special filters
  const handleSpecialFilter = (filterType: "upcoming" | "new_launched") => {
    clearAllFilters(); // Clear existing filters first
    if (onSpecialFilter) {
      setTimeout(() => {
        onSpecialFilter(filterType);
      }, 0);
    }
  };

  // Generate selected chips for display
  const selectedChips = Object.entries(selectedFilters).flatMap(
    ([groupKey, slugs]) =>
      (filterMenu[groupKey] || [])
        .filter((item) => item.slug && slugs.includes(item.slug))
        .map((item) => ({
          groupKey,
          slug: item.slug!,
          name: item.name,
          displayName:
            FILTER_CONFIG[groupKey as keyof typeof FILTER_CONFIG]
              ?.displayName || groupKey,
        })),
  );

  const getDisplayName = (key: string) => {
    return (
      FILTER_CONFIG[key as keyof typeof FILTER_CONFIG]?.displayName ||
      key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")
    );
  };

  const renderFilterGroup = (groupKey: string, items: FilterItem[]) => {
    const displayName = getDisplayName(groupKey);
    const selectedSlugs = selectedFilters[groupKey] || [];

    return (
      <div key={groupKey} className="border-b border-[#e8e8e8] py-2">
        <button
          onClick={() => toggleDropdown(groupKey)}
          className="w-full flex justify-between items-center text-left font-[400] text-lg capitalize focus:outline-none text-black"
        >
          {displayName}
          <FaSortDown
            className={`w-5 h-5 transition-transform duration-500 ${
              openFilters.includes(groupKey) ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className="transition-all duration-500 ease-in-out overflow-hidden"
          style={{
            height: openFilters.includes(groupKey)
              ? `${dropdownHeights[groupKey] || 0}px`
              : "0px",
            opacity: openFilters.includes(groupKey) ? 1 : 0,
            marginTop: openFilters.includes(groupKey) ? "8px" : "0px",
          }}
        >
          <div ref={(el: any) => (contentRefs.current[groupKey] = el)}>
            <ul className="space-y-2 pt-2">
              {items.map((item, index) => {
                // if (!item?.slug || item.slug.trim() === "") return null;
                const isDisabled = !item.slug || item.slug.trim() === "";
                const displayText =
                  item.name &&
                  !["na", "Na", "NA", "nA"].includes(item.name.trim())
                    ? item.name
                    : "Not Specified";

                return (
                  <li key={item.id || index}>
                    <label
                      className={`flex items-center space-x-2 text-sm text-black capitalize cursor-pointer hover:text-black ${
                        isDisabled ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="accent-primary2"
                        checked={
                          item.slug ? selectedSlugs.includes(item.slug) : false
                        }
                        disabled={isDisabled}
                        onChange={() =>
                          item.slug && toggleSelection(groupKey, item.slug)
                        }
                      />
                      <span>{displayText}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="text-[#250900] font-medium text-lg py-5 lg:pr-[2rem] h-full w-full">
      <div className="w-full flex mb-2 text-[#383838] justify-between">
        <span>Filter Products By:</span>
        <div className=" flex gap-1 text-white items-center justify-center bg-link px-1 rounded-md text-pbase">
          <span className=""> Products</span>
          <span>{totalProducts}</span>
        </div>
      </div>

      {/* Selected filters chips */}
      {selectedChips.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2  p-2 rounded-md">
          {selectedChips.map((chip) => (
            <span
              key={`${chip.groupKey}-${chip.slug}`}
              className="flex items-center gap-1 bg-primary2/10 text-primary2 text-sm px-2 py-1 rounded-md shadow-md"
            >
              {chip.name}
              <IoClose
                className="cursor-pointer"
                onClick={() => removeSingleFilter(chip.groupKey, chip.slug)}
              />
            </span>
          ))}

          <button
            onClick={handleClearAll}
            className="ml-auto text-sm font-medium bg-primary2/20 text-primary2 px-3 py-1 rounded-md shadow-md hover:bg-primary2/30 flex gap-1 "
          >
            <RiDeleteBin5Line size={18} />
            Clear All
          </button>
        </div>
      )}

      {/* Dynamic filter groups */}
      {Object.entries(filterMenu)
        .filter(([_, items]) => items && items.length > 0)
        .map(([groupKey, items]) => renderFilterGroup(groupKey, items))}

      {/* Special action buttons */}
      <div className="flex flex-col w-full mt-2">
        {onSpecialFilter && (
          <>
            <button
              className="border-b py-2 flex justify-start text-[#727272] border-[#e8e8e8] cursor-pointer hover:text-primary1 transition-colors"
              onClick={() => handleSpecialFilter("upcoming")}
            >
              <span>Upcoming Products</span>
            </button>
            <button
              className="border-b flex justify-start py-2 text-[#727272] border-[#e8e8e8] cursor-pointer hover:text-primary1 transition-colors"
              onClick={() => handleSpecialFilter("new_launched")}
            >
              <span>Newly Launched Products</span>
            </button>
          </>
        )}

        <button
          className="py-2 flex justify-start text-[#727272] cursor-pointer hover:text-primary1 transition-colors"
          onClick={handleClearAll}
        >
          <span>Show All Products</span>
        </button>
      </div>
    </div>
  );
}
