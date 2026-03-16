export async function fetchOffers() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/offers/get`,
      {
        method: "GET",
        next: { revalidate: 60 }, // optional caching
        headers: {
          "Content-Type": "application/json",
          "x-secret-key": process.env.NEXT_PUBLIC_SECRET_API_KEY as string,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch offers");
    }

    const data = await res.json();

    return {
      validOffers: data?.nowOffers || [],
      expiredOffers: data?.expOffers || [],
    };
  } catch (error) {
    console.error("Error fetching offers:", error);

    return {
      validOffers: [],
      expiredOffers: [],
    };
  }
}
