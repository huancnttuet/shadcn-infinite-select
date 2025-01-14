'use client';

import { getProducts } from '@/api';
import InfiniteSelect from '@/components/infinite-select';
import { Option } from '@/types/common';
import { useState } from 'react';

export default function Page() {
  const [value, setValue] = useState<string[]>([]);

  const fetchData = async (page: number, searchTerm = '') => {
    const products = await getProducts(page, searchTerm);
    const hasMore = products.length === 10;

    return {
      options: products.map((product) => ({
        value: product.id.toString(),
        label: product.title,
      })),
      hasMore,
    };
  };

  const onConfirm = (value: Option[]) => {
    setValue(value.map((v) => v.value));
  };

  return (
    <InfiniteSelect
      value={value}
      fetchData={fetchData}
      onConfirm={onConfirm}
    />
  );
}
