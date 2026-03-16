export async function getNewLaunchesProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products?new_launched=true`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-secret-key": `${process.env.NEXT_PUBLIC_SECRET_API_KEY}`,
        },
        cache: "no-store", // prevents caching (optional)
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch new products");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}
