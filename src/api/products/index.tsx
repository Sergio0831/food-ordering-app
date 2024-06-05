import { supabase } from '@/src/lib/supabase';
import { Product } from '@/src/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useProductsList = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: Omit<Product, 'id' | 'created_at'>) {
      const { error } = await supabase.from('products').insert({
        name: data.name,
        price: data.price,
        image: data.image,
      });

      if (error) {
        throw error;
      }
    },

    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
    },

    onError(error) {
      console.log(error);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id, ...update }: Omit<Product, 'created_at'>) {
      const { data: updatedProduct, error } = await supabase
        .from('products')
        .update(update)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return updatedProduct;
    },

    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      await queryClient.invalidateQueries({ queryKey: ['product', id] });
    },

    onError(error) {
      console.log(error);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: number) {
      await supabase.from('products').delete().eq('id', id);
    },

    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
    },

    onError(error) {
      console.log(error);
    },
  });
};
