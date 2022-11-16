import type { NextApiRequest, NextApiResponse } from "next";

export default (req:NextApiRequest, res:NextApiResponse) => {
  const body = JSON.parse(req.body)

  let color

  switch (body.color) {
    case 'text-blue-500':
      color = "blue"
      break
    case 'text-red-600':
      color = "red"
      break
    case 'text-emerald-500':
      color = "green"
      break
    case 'text-pink-400':
      color = "pink"
      break
    default:
      color = "black"
    }

  res.status(200).json({ selected_color: `your selected color: ${color}`  })
}