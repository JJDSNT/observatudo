'use client'
import React from 'react';
import Layout from '@/app/Layout/Layout';


const Home = () => {
  return (
    <div className="container mx-auto p-4">
      {typeof window !== 'undefined' && <Layout />}
    </div>
  );
};

export default Home;
