"use client";

import ProductForm from "@/components/ProductForm";
import Head from "next/head";
import React from "react";

function newProduct() {
  return (
    <>
      <Head>
        <title>New Product</title>
      </Head>

      <h1>New Product</h1>
      <ProductForm />
    </>
  );
}

export default newProduct;
