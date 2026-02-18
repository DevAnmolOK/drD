async function fetchProductMenu() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCTS_API_URL}/menu`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.NEXT_PUBLIC_SECRET_API_KEY}`,
        },
      },
    );
    if (!res.ok) throw new Error("failed to fetch division Data");
    const division = await res.json();
    return division;
  } catch (err) {
    console.error("failed to fetch division", err);
    return [];
  }
}

export default fetchProductMenu;
