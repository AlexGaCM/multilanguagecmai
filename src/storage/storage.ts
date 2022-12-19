import create from 'zustand'

export type Product = {
  _id: string,
  name: string,
  price: any,
  desc: string,
  picture: any
}

type Storage = {
  product: Product,
  open: boolean,
  setProduct: (object) => void,
  setOpen: (boolean) => void
}

const useStore = create<Storage>(set => ({
  product: {
    _id: 'ID wird automatisch vergeben',
    name: '',
    price: null,
    desc: '',
    picture: null
},
  open: false,
  setProduct: (product) => set({ product }),
  setOpen: (open) => set ({ open })
}))

export default useStore