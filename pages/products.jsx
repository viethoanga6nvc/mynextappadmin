/* eslint-disable react-hooks/rules-of-hooks */
import DeleteBtn from "@/components/DeleteBtn";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function products(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/product").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <Link
        className="bg-sky-500 text-white py-1 px-2 rounded-md"
        href={"/products/new"}
      >
        Add new product
      </Link>
      {products.length === 0 ? (
        <p className="text-xl font-bold">No Product</p>
      ) : (
        <table className="tb-list">
          <thead>
            <tr>
              <th>Product Name</th>
              <th className="w-1/12"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={index}>
                <td>{p.title}</td>
                <td className="flex gap-2">
                  <Link href={"/products/edit/" + p._id}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-green-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </Link>
                  <DeleteBtn id={p._id} title={p.title} type={"product"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default products;
