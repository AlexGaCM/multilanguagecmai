import type { NextApiRequest, NextApiResponse } from "next";

enum Colors {
  blue = "text-blue-500",
  red = "text-red-600",
  green = "text-emerald-500",
  pink = "text-pink-400",
  black = "text-black"
}

export default (req:NextApiRequest, res:NextApiResponse) => {
  const body = JSON.parse(req.body)

  const ColorConfig = {
    [Colors.blue]: {
      message: "Die gewählte Farbe ist Blau"
    },
    [Colors.red]: {
      message: "Du hast Rot gewählt!"
    },
    [Colors.green]: {
      message: "Farbe: Grün"
    },
    [Colors.pink]: {
      message: "Du hast die Farbe Pink gewählt"
    },
    [Colors.black]: {
      message: "Keine Farbe gewählt"
    }
  }

  res.status(200).json({ selected_color: ColorConfig[body.color].message  })
}