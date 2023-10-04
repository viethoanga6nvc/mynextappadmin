/* eslint-disable react-hooks/rules-of-hooks */
import DeleteBtn from "@/components/DeleteBtn";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function categories(props) {
  const route = useRouter();
  const [title, setTitle] = useState("");
  const [_id, setId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  async function saveCategories(ev) {
    ev.preventDefault();
    if (title === "") return alert("Không đc đe trong");
    const data = { title };
    if (_id) {
      await axios.put("/api/categories", { ...data, _id });
    } else {
      await axios.post("/api/categories", data);
    }
    route.reload();
  }

  const handleEdit = (ca) => {
    console.log(ca);
    setId(ca._id);
    setTitle(ca.title);
  };

  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>

      <h1>Categories</h1>
      <form onSubmit={saveCategories} className="mb-3 flex gap-2">
        <label className="w-fit whitespace-nowrap">New category name:</label>
        <input
          className="mb-0"
          type="text"
          placeholder="New category name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <button type="submit" className="btn-primary">
          {_id ? "Update" : "Create"}
        </button>
      </form>

      {categories.map((ca, index) => (
        <div
          key={index}
          className="border border-gray-400 flex justify-between px-1 py-2 w-96 mb-1 mx-auto"
        >
          <span className="text-lg">{ca.title}</span>
          <div className="flex gap-2">
            <i onClick={() => handleEdit(ca)}>
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
            </i>
            <DeleteBtn id={ca._id} title={ca.title} type={"categories"} />
          </div>
        </div>
      ))}
    </>
  );
}

export default categories;
