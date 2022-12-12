import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb'

type Product = {
  _id: ObjectId,
  name: string,
  price: number,
  desc: string,
  picture: number
}

export default async (req:NextApiRequest, res:NextApiResponse) => {

  const method = req.method
  const dbClient = await clientPromise
  const db = dbClient.db('shop_products')
  const collection = db.collection<Product>('products')

  if (method === 'GET') {
    const data = await collection.find().toArray()
    res.status(200).json(data)
  }

  if (method === 'POST') {
    const body = JSON.parse(req.body)
    body._id = undefined
    body.price = parseFloat(body.price)
    await collection.insertOne(body)
    res.status(200).end()
  }

  if (method === 'DELETE') {
    const body = JSON.parse(req.body)
    await collection.deleteOne({_id: new ObjectId(body._id)}, {})
    res.status(200).end()
  }

  if (method === 'PUT') {
    const body = JSON.parse(req.body)
    await collection.updateOne(
      {_id: new ObjectId(body._id)},
      { $set: {
          name: body.name,
          price: parseFloat(body.price),
          desc: body.desc,
          picture: body.picture
        }})
    res.status(200).end()
  }

}