export interface Product {
  id: string | number;
  title: string;
  name: string;
  slug: string;
  type_id?: any;
  images?: any;
  details?: string;
  // Add other product properties as needed
}

export interface SearchApiResponse {
  products: Product[];
  // Add other response properties if needed
}

// Updated search API function
export async function searchApi(query: string): Promise<SearchApiResponse> {
  if (!query.trim()) return { products: [] };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products?name=${query}&limit=20`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) throw new Error("Failed to fetch search results");

    const data = await res.json();
    // console.log("Searchresult", data);

    // Return the data as SearchApiResponse
    return data || { products: [] };
  } catch (error) {
    console.error("Search API error:", error);
    return { products: [] };
  }
}
