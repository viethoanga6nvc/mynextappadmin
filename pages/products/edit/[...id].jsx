/* eslint-disable react-hooks/rules-of-hooks */
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function editProduct(props) {
  const route = useRouter();
  const { id } = route.query;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/product?id=" + id).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  return (
    <>
      <Head>
        <title>Edit Product</title>
      </Head>

      <h1>Edit Product</h1>
      {product && <ProductForm {...product} />}
    </>
  );
}

export default editProduct;
