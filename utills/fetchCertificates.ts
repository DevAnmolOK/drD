export async function fetchCertificates() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/certificate/get`,
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
      throw new Error("Failed to fetch certificates");
    }

    const data = await res.json();

    return {
      certificates: data?.certificate || [],
    };
  } catch (error) {
    console.error("Error fetching certificates:", error);

    return {
      certificates: [],
    };
  }
}
