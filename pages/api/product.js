import connetMongoDB from "@/lib/mongodb";
import Product from "@/models/product";

export default async function handler(req, res) {
  await connetMongoDB();

  if (req.method === "POST") {
    const { title, description, price, images, category, inStock } =
      await req.body;
    if (
      !title ||
      !description ||
      !price ||
      !inStock ||
      images.length === 0 ||
      category === "all"
    ) {
      return res.status(400).json({ message: "Please add all fields" });
    }
    await Product.create({
      title,
      description,
      price,
      category,
      inStock,
      images,
    });
    return res.status(201).json({ message: "Add succes" });
  }

  if (req.method === "GET") {
    const { id } = req.query;
    if (id) {
      return res.json(await Product.findById(id));
    } else {
      return res.json(await Product.find());
    }
  }

  if (req.method === "PUT") {
    const { title, description, price, category, images, inStock, _id } =
      await req.body;
    await Product.findByIdAndUpdate(_id, {
      title,
      description,
      price,
      category,
      images,
      inStock,
    });
    return res.json({ message: "update succes" });
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    await Product.findByIdAndDelete(id);
    return res.json({ message: "delete succes" });
  }
}
