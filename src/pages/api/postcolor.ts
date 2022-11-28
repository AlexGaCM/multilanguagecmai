import clientPromise from '../../../lib/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const method = req.method
  const dbClient = await clientPromise
  const db = dbClient.db('dialog_button')
  const collection = db.collection('color_and_title')
  const filter = {_id: new ObjectId('637b52af881c052554e495dc')}

  if (method === "POST") {
    const body = JSON.parse(req.body)
    await collection.updateOne(filter, {$set: {title: body[1], color: body[0]}})
    res.status(200).end()
  }

  if (method === "GET") {
    const data = await collection.findOne(filter)
    res.status(200).json(data)
  }

}
