export interface PTS_PTR_Result {
  ptr: number; // Price to Retailer
  pts: number; // Price to Stockist
}

export function calculatePtsPtr(
  mrp: number,
  options?: {
    gstRate?: number; // %  (default 12)
    retailerMargin?: number; // %  (default 20)
    stockistMargin?: number; // %  (default 10)
  },
): PTS_PTR_Result {
  const gstRate = options?.gstRate ?? 12;
  const retailerMargin = options?.retailerMargin ?? 20;
  const stockistMargin = options?.stockistMargin ?? 10;

  if (!mrp || mrp <= 0) return { ptr: 0, pts: 0 };

  // MRP excluding GST
  const mrpExclGst = mrp / (1 + gstRate / 100);

  // Price to Retailer (PTR)
  const ptr = mrpExclGst * (1 - retailerMargin / 100);

  // Price to Stockist (PTS)
  const pts = ptr * (1 - stockistMargin / 100);

  return {
    ptr: parseFloat(ptr.toFixed(2)),
    pts: parseFloat(pts.toFixed(2)),
  };
}
