/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { imageUpload } from "@/lib/imageUpload";

function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  category: existingCategory,
  inStock: existingInStock,
  images: existingImages,
}) {
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || Number);
  const [inStock, setInStock] = useState(existingInStock || Number);
  const [category, setCategory] = useState(existingCategory || "");
  const [categories, setCategories] = useState([]);

  const [images, setImages] = useState(existingImages || []);
  const [goToProductList, setGoToProductList] = useState(false);

  async function saveProduct(ev) {
    ev.preventDefault();
    if (price < 0 || inStock < 0) return alert("price & instock không âm");

    const data = { title, description, price, category, inStock };
    let media = [];
    const imgNewUrl = images.filter((img) => !img.url);
    const imgOldUrl = images.filter((img) => img.url);
    if (imgNewUrl.length > 0) {
      media = await imageUpload(imgNewUrl);
    }
    if (_id) {
      //update
      await axios.put("/api/product", {
        ...data,
        images: [...imgOldUrl, ...media],
        _id,
      });
    } else {
      //create
      await axios.post("/api/product", {
        ...data,
        images: [...imgOldUrl, ...media],
      });
    }
    setGoToProductList(true);
  }

  if (goToProductList) {
    router.push("/products");
  }

  function uploadImages(ev) {
    let newImange = [];
    let num = 0;
    let err = "";
    const files = [...ev.target.files];

    if (files.length === 0) {
      return alert("Files do not exists.");
    }
    files.forEach((file) => {
      if (file.size > 1020 * 1024)
        return (err = "The largest image size is 1Mb.");
      num += 1;
      if (num <= 5) newImange.push(file);
      return newImange;
    });

    if (err) return alert(err);

    const imgCount = images.length;
    if (imgCount + newImange.length > 5) return alert("Select up to 5 image.");
    setImages([...images, ...newImange]);
  }

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const hasImages = "mb-2 flex gap-2";
  const nonImages = "mb-2 flex flex-col";

  return (
    <>
      <form onSubmit={saveProduct}>
        <label>Product Name:</label>
        <input
          type="text"
          placeholder="Product name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />

        <label>Photos</label>
        <div className={images?.length === 0 ? nonImages : hasImages}>
          {images?.length === 0 ? (
            <h2>this product has no images</h2>
          ) : (
            images.map((img, index) => (
              <div key={index} className="relative cursor-pointer m-0">
                <img
                  src={img.url ? img.url : URL.createObjectURL(img)}
                  alt=""
                  className="w-24 h-28 block"
                />
                <span
                  onClick={() => deleteImage(index)}
                  className="text-red-600 absolute top-0 right-0 bg-white rounded-sm border-red-600 font-semibold border"
                >
                  X
                </span>
              </div>
            ))
          )}
          <label className="w-24 h-28 cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <span>Upload</span>
            <input
              type="file"
              onChange={uploadImages}
              multiple
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>

        <label>Description:</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />

        <div className="flex gap-2">
          <div className="w-1/2">
            <label>Price (in USD):</label>
            <input
              className=" text-right"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label>In stock:</label>
            <input
              className=" text-right"
              type="number"
              placeholder="In stock"
              value={inStock}
              onChange={(ev) => setInStock(ev.target.value)}
            />
          </div>
        </div>

        <label>Category:</label>
        <select
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        >
          <option value="all">All Products</option>
          {categories.map((ca, index) => (
            <option key={index} value={ca.title}>
              {ca.title}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-primary">
          {_id ? "Update" : "Create"}
        </button>
      </form>
      <button
        className="bg-red-700 text-white px-4 py-1 rounded-lg mt-2"
        onClick={() => router.back()}
      >
        Cancel
      </button>
    </>
  );
}

export default ProductForm;
