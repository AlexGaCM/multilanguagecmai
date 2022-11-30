import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb'

type Product = {
  _id: ObjectId,
  name: string,
  price: string,
  desc: string,
  picture: string
}

export default async (req:NextApiRequest, res:NextApiResponse) => {

  const method = req.method
  const dbClient = await clientPromise
  const db = dbClient.db('shop_products')
  const collection = db.collection<Product>('products')
  // const filter = {_id: new ObjectId('6384cc3a9953107e2c5691c9')}

  console.log(method)

  if (method === 'POST') {
    console.log('empty')
  }

  if (method === 'GET') {
    const data = await collection.find().toArray()
    res.status(200).json(data)
  }
}