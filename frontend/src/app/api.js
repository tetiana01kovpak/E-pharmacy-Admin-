import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { credentialsCleared } from './authSlice.js';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithAuthHandling = async (args, apiContext, extraOptions) => {
  const result = await rawBaseQuery(args, apiContext, extraOptions);
  if (result.error?.status === 401) {
    apiContext.dispatch(credentialsCleared());
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuthHandling,
  tagTypes: ['Dashboard', 'Products', 'Suppliers', 'Customers', 'Orders'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({ url: '/user/login', method: 'POST', body: credentials }),
    }),
    logout: builder.mutation({
      query: () => ({ url: '/user/logout', method: 'GET' }),
    }),
    getUserInfo: builder.query({
      query: () => '/user/user-info',
    }),
    getDashboard: builder.query({
      query: () => '/dashboard',
      providesTags: ['Dashboard'],
    }),
    getOrders: builder.query({
      query: (params) => ({ url: '/orders', params }),
      providesTags: ['Orders'],
    }),
    getProducts: builder.query({
      query: (params) => ({ url: '/products', params }),
      providesTags: ['Products'],
    }),
    addProduct: builder.mutation({
      query: (body) => ({ url: '/products', method: 'POST', body }),
      invalidatesTags: ['Products', 'Dashboard'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/products/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/products/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Products', 'Dashboard'],
    }),
    getSuppliers: builder.query({
      query: (params) => ({ url: '/suppliers', params }),
      providesTags: ['Suppliers'],
    }),
    addSupplier: builder.mutation({
      query: (body) => ({ url: '/suppliers', method: 'POST', body }),
      invalidatesTags: ['Suppliers', 'Dashboard'],
    }),
    updateSupplier: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/suppliers/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Suppliers'],
    }),
    getCustomers: builder.query({
      query: (params) => ({ url: '/customers', params }),
      providesTags: ['Customers'],
    }),
    getCustomerById: builder.query({
      query: (id) => `/customers/${id}`,
      providesTags: ['Customers'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserInfoQuery,
  useGetDashboardQuery,
  useGetOrdersQuery,
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSuppliersQuery,
  useAddSupplierMutation,
  useUpdateSupplierMutation,
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
} = api;
