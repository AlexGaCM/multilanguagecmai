import create from 'zustand'

type Storage = {
  product: object,
  open: boolean,
  setProduct: (object) => void,
  setOpen: (boolean) => void
}

const useStore = create<Storage>(set => ({
  product: {
    _id: 'ID wird automatisch vergeben',
    name: '',
    price: '',
    desc: '',
    picture: null
},
  open: false,
  setProduct: (product) => set({ product }),
  setOpen: (open) => set ({ open })
}))

export default useStore