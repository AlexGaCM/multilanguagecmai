// import useStore from '../../storage/storage'
import type { NextApiRequest, NextApiResponse } from "next";

// const { color } = useStore()

export default (req:NextApiRequest, res:NextApiResponse) => {
  res.status(200).json({ selected_color: "you selected color "})
}