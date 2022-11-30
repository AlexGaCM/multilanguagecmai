import create from 'zustand'

type Storage = {
  product: object,
  open: boolean,
  setProduct: (object) => void,
  setOpen: (boolean) => void
}

const useStore = create<Storage>(set => ({
  product: {
    _id: '6384cc3a9953107e2c5691c9',
    name: '',
    price: '',
    desc: '',
    picture: ''
},
  open: false,
  setProduct: (product) => set({ product }),
  setOpen: (open) => set ({ open })
}))

export default useStore