import clientPromise from '/lib/mongodb'
import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const dbClient = await clientPromise;
  const db = dbClient.db('sample_supplies')
  const collection = db.collection('sales')
  const data1 = await collection.findOne({storeLocation: "Denver"})
  const data2 = await collection.findOne({storeLocation: "Seattle"})
  // const data = await collection.find({storeLocation: "Denver"})

  const myJSON = {
    Denver: {data1},
    Seattle: {data2}
  }

  res.status(200).json(myJSON)
}

