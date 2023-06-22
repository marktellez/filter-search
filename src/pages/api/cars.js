import createHandler from "next-connect";
import clientPromise from "@/modules/db";

const handler = createHandler();

handler.post(async (req, res) => {
  const { make, model, color } = JSON.parse(req.body);

  const matchStage = {};

  if (color) {
    matchStage.color = color;
  }

  if (make._id) {
    matchStage["make._id"] = make._id;
  }

  if (model._id) {
    matchStage["model._id"] = model._id;
  }

  const cars = await (
    await clientPromise
  )
    .db()
    .collection("cars")
    .aggregate([
      {
        $lookup: {
          from: "makes",
          localField: "make",
          foreignField: "_id",
          as: "make",
        },
      },
      {
        $lookup: {
          from: "models",
          localField: "model",
          foreignField: "_id",
          as: "model",
        },
      },
      {
        $match: matchStage,
      },
      {
        $project: {
          _id: 1,
          color: 1,
          make: { $arrayElemAt: ["$make.name", 0] },
          model: { $arrayElemAt: ["$model.name", 0] },
        },
      },
    ])
    .toArray();

  res.json(cars);
});

export default handler;
