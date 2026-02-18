async function fetchProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.NEXT_PUBLIC_SECRET_API_KEY}`,
        },
        next: { revalidate: 60 },
      },
    );
    if (!res.ok) throw new Error("Error fetching slider");
    const result = await res.json();
    return result;
  } catch (err) {
    console.error("Product fetch error", err);
    return [];
  }
}
export default fetchProducts;

export async function fetchNewLaunchProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products?new_launched=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      },
    );
    if (!res.ok) throw new Error("Error fetching slider");
    const result = await res.json();
    return result;
  } catch (err) {
    console.error("Product fetch error", err);
    return [];
  }
}
