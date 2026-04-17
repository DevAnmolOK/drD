export const safeFetch = async (fn: any) => {
  try {
    return await fn();
  } catch (e) {
    console.error("API error:", e);
    return null;
  }
};
