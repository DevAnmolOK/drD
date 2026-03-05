export async function getUpcomingProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/products?upcoming=true`,
      {
        next: { revalidate: 60 }, // ISR caching
        headers: {
          "Content-Type": "application/json",
          "x-secret-key": process.env.NEXT_PUBLIC_SECRET_API_KEY as string,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch upcoming products");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Upcoming products fetch error:", error);
    return null;
  }
}
