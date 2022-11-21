import create from "zustand";

type Storage = {
  color: string
  title: string
  setColor: (string) => void
  setTitle: (string) => void
}

const useStore = create<Storage>(set => ({
  color: "text-black",
  title: "Title",
  setColor: (color) => set({ color }),
  setTitle: (title) => set({ title })
}))

export default useStore