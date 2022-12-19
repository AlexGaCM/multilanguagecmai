import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async (req:NextApiRequest, res:NextApiResponse) => {

  const id = req.body
  const dbClient = await clientPromise
  const db = dbClient.db('shop_products')
  const collection = db.collection('products')
  const filter = {_id: new ObjectId(id)}
  const product = await collection.findOne(filter)

  res.status(200).json(product)

}