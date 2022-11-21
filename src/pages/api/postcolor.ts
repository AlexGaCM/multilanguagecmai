import clientPromise from '../../../lib/mongodb'
import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const method = req.method
  const dbClient = await clientPromise
  const db = dbClient.db('dialog_button')
  const collection = db.collection('color_and_title')

  if (method == "POST") {
    const body = JSON.parse(req.body)
    await collection.updateOne({name: 'color_and_title'}, {$set: {title: body[1], color: body[0]}})
    res.status(200)
  }

  if (method == "GET") {
    const data = await collection.findOne({name: 'color_and_title'})
    res.status(200).json(data)
  }

}
