import React from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface TrustFactor {
  icon: React.ReactNode;
  title: string;
  description: string;
}