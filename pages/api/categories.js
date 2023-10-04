import connetMongoDB from "@/lib/mongodb";
import Categories from "@/models/categories";

export default async function handler(req, res) {
  await connetMongoDB();

  if (req.method === "POST") {
    const { title } = await req.body;
    await Categories.create({ title });
    return res.status(201).json({ message: "Add succes" });
  }

  if (req.method === "GET") {
    const { id } = req.query;
    if (id) {
      return res.json(await Categories.findById(id));
    } else {
      return res.json(await Categories.find());
    }
  }

  if (req.method === "PUT") {
    const { title, _id } = await req.body;
    await Categories.findByIdAndUpdate(_id, { title });
    return res.json({ message: "update succes" });
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    await Categories.findByIdAndDelete(id);
    return res.json({ message: "delete succes" });
  }
}
