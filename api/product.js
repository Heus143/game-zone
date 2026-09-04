import fs from "fs";

export default function handler(req, res) {
  try {
    const data = JSON.parse(
      fs.readFileSync(
        new URL("../../db.json", import.meta.url),
        "utf-8"
      )
    );

    res.status(200).json(data.products);
  } catch (error) {
    res.status(500).json({
      error: "Unable to load products"
    });
  }
}