import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const EMPTY_GOODS_ID = "00000000-0000-0000-0000-000000000000";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: ({ number }) => ({
        url: "/hs/hsprice/",
        params: {
          key: import.meta.env.VITE_CLIENT_ID,
          number,
        },
      }),
      transformResponse: (response) => {
        const goods = response?.goods;
        if (!Array.isArray(goods)) return [];

        const uniqueBrands = goods
          .filter((item) => item.goodsID !== EMPTY_GOODS_ID)
          .map((item) => item.brand);

        return [...new Set(uniqueBrands)].sort();
      },
    }),
    getGoods: builder.query({
      query: ({ number, brand }) => ({
        url: "/hs/hsprice/",
        params: {
          key: import.meta.env.VITE_CLIENT_ID,
          number,
          brand,
          analogues: "on",
        },
      }),
      transformResponse: (response) => {
        const goods = response?.goods;
        if (!Array.isArray(goods)) return [];

        return goods
          .filter((item) => item.goodsID !== EMPTY_GOODS_ID)
          .flatMap((item) => {
            const originalProduct = {
              id: item.goodsID,
              name: item.name,
              price: item.price,
              stock: item.count,
              brand: item.brand,
              isOriginal: true,
            };

            if (!Array.isArray(item.analogues)) {
              return [originalProduct];
            }

            const mappedAnalogues = item.analogues.map((analogue) => ({
              id: analogue.goodsID,
              name: analogue.name,
              price: analogue.price,
              stock: analogue.count,
              brand: analogue.brand,
              isOriginal: false,
            }));

            return [originalProduct, ...mappedAnalogues];
          });
      },
    }),
  }),
});

export const { useGetBrandsQuery, useGetGoodsQuery } = apiSlice;
