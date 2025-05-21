'use client';
import React from 'react';
import largeData from '@/src/mock/large/products.json';
import smallData from '@/src/mock/small/products.json';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import TextInput from '@/src/utils/TextInput';
import EmptyState from '@/src/utils/EmptyState';
import { fetchProductsBySearch } from '@/src/services/productAPI';

const ProductSearch = () => {
  const data = [...smallData];

  const [productData, setProductData] = useState(data);
  const [searchText, setSearchText] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const searchProductsByName = (products: any[], keyword: string) => {
    const keywords = keyword.toLowerCase().split(/\s+/);
    return products.filter((product) => {
      const name = product.name.toLowerCase();
      return keywords.some((word) => name.includes(word));
    });
  };
  const fetchProducts = async (val: string) => {
    const data = await fetchProductsBySearch(val);
    setProductData(data);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchProducts(value);
    }, 300);
  };
  return (
    <div>
      <div id='search' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextInput name='search' placeholder='Search...' onChange={onChange} value={searchText} />
      </div>
      <main className='flex min-h-screen flex-col items-center p-24'>
        <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
          <div className='grid lg:max-w-5xl lg:w-full lg:grid-cols-2 lg:text-left'>
            {productData.map((product) => (
              <div
                key={product.id}
                className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
              >
                <Link href={`/products/${product.id}`}>
                  <h3 className={`mb-3 text-2xl font-semibold`}>{product.name}</h3>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Price: {product.price}</p>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Description: {product.description}</p>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Category: {product.category}</p>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Rating: {product.rating}</p>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Reviews: {product.numReviews}</p>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Stock: {product.countInStock}</p>
                </Link>
              </div>
            ))}
            {productData.length === 0 && <EmptyState />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductSearch;
