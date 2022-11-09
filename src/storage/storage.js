import create from "zustand";

const useStore = create(set => ({
  color: "text-black",
  title: "Title",
  setColor: (color) => set({ color }),
  setTitle: (title) => set({ title }),
}))

export default useStore