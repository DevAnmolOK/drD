"use client";

import React from "react";
import { FiSearch } from "react-icons/fi";
import CategoryDropdown from "../common/CustomdropDown";
interface BlogFilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categories: any;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

export default function BlogFilterBar({
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategory,
  setSelectedCategory,
}: BlogFilterBarProps) {
  return (
    <div className="bg-white rounded-xl p-6 mb-8 shadow-custom-md border border-gray-100 w-full">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* Search Bar */}
        <div className="flex-1 relative  w-full ">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary/40 focus:border-transparent outline-none"
          />
        </div>

        <CategoryDropdown
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
}
