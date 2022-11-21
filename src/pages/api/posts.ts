import clientPromise from '/lib/mongodb'
import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const dbClient = await clientPromise;
  const db = dbClient.db('sample_supplies')
  const collection = db.collection('sales')
  const data = await collection.find({storeLocation: "San Diego", couponUsed: true, purchaseMethod: "Online"}).toArray()

  res.status(200).json(data)
}

