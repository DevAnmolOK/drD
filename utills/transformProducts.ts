// utils/transformProducts.ts

export interface TransformedProduct {
  division?: string;
  name?: string;
  composition?: string;
  packing?: string;
  packingType?: string;
  slug?: string;
  type?: string;
  upcoming?: boolean;
  mrp?: number;
  image?: string;
  moq?: number;
}

export const TransformProducts = (
  products: any[] = []
): TransformedProduct[] => {
  return products.map((data: any) => ({
    division: data?.division_id?.[0]?.name,
    name: data?.name,
    composition: data?.details,
    packing: data?.packingVarient?.[0]?.packing,
    packingType: data?.packingVarient?.[0]?.packing_type?.[0]?.name,
    slug: data?.slug,
    type: data?.type_id?.[0]?.name,
    upcoming: data?.upcoming,
    mrp: Number(data?.packingVarient?.[0]?.price?.["$numberDecimal"]) || 0,
    image: data?.images?.[0]?.url,
    moq: data?.min_order_qty,
  }));
};
