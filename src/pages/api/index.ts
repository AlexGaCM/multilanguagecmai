import useStore from '../../storage/storage'

// const { color } = useStore()
const color = "blue"

export default function handler(req, res) {
  res.status(200).json({ selected_color: "you selected color " + color })
}