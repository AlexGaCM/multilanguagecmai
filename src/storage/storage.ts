import create from "zustand";

type Storage = {
  color: string
  title: string
  colorName: string
  setColor: (string) => void
  setTitle: (string) => void
  setColorName: (string) => void
}

const useStore = create<Storage>(set => ({
  color: "text-black",
  title: "Title",
  colorName: "",
  setColor: (color) => set({ color }),
  setTitle: (title) => set({ title }),
  setColorName: (colorName) => set({ colorName })
}))

export default useStore