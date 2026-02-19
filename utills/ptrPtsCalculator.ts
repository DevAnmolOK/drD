export type PTRPTSInput = {
  mrp: string | number;
  gstRate: string | number;
  retailerMargin: string | number;
  stockistMargin: string | number;
};

export type PTRPTSResult = {
  ptr: number;
  pts: number;
  retailerProfit: number;
  stockistProfit: number;
};

export function calculatePTRPTS(input: PTRPTSInput): PTRPTSResult {
  const mrp = parseFloat(String(input.mrp)) || 0;
  const gstRate = parseFloat(String(input.gstRate)) || 0;
  const retailerMargin = parseFloat(String(input.retailerMargin)) || 0;
  const stockistMargin = parseFloat(String(input.stockistMargin)) || 0;

  if (mrp <= 0) {
    return {
      ptr: 0,
      pts: 0,
      retailerProfit: 0,
      stockistProfit: 0,
    };
  }

  // Step 1: Remove GST from MRP
  const mrpExclGst = mrp / (1 + gstRate / 100);

  // Step 2: PTR
  const ptr = mrpExclGst * (1 - retailerMargin / 100);

  // Step 3: PTS
  const pts = ptr * (1 - stockistMargin / 100);

  // Step 4: Profit Calculations
  const retailerProfit = mrpExclGst - ptr;
  const stockistProfit = ptr - pts;

  return {
    ptr: parseFloat(ptr.toFixed(2)),
    pts: parseFloat(pts.toFixed(2)),
    retailerProfit: parseFloat(retailerProfit.toFixed(2)),
    stockistProfit: parseFloat(stockistProfit.toFixed(2)),
  };
}
