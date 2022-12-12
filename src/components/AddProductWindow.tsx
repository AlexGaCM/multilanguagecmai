import useStore from '../storage/storage'
import Translate from './Translation'
import { queryClient } from '../pages/_app'
import { useState, useRef } from 'react'

export default function AddProductWindow() {

  const { product, setProduct, open, setOpen } = useStore()
  const picturesArr = ['Bild1', 'Bild2', 'Bild3', 'Bild4', 'Bild5', 'Bild6', 'Bild7', 'Bild8']
  const [loadPic, setLoadPic] = useState(null)

  const nameRef = useRef<HTMLInputElement>()
  const priceRef = useRef<HTMLInputElement>()
  const descRef = useRef<HTMLTextAreaElement>()
  const picRef = useRef<HTMLSelectElement>()

  const handleSubmit = () => {

    const objArr = Object.entries(product)
    let bool = false

    for (const [key, value] of objArr) {
      if (key !== '_id' && value === null || key === 'price' && isNaN(value) || value.toString().trim() === '') {
        alert("ERROR! input cant be empty and price must be a number")
        bool = false
        break
      } else {
        bool = true
      }
    }

    if (bool) {
      setOpen(!open)

      nameRef.current.value = ''
      priceRef.current.value = null
      descRef.current.value = ''
      picRef.current.value = ' '
      setLoadPic(null)

      setProduct({
        _id: 'ID wird automatisch vergeben',
        name: '',
        price: null,
        desc: '',
        picture: null
      })

      product.picture = parseInt(product.picture)

      fetch('./api/callProducts', {
        method: 'POST',
        body: JSON.stringify(product)
      }).then(() => {
        queryClient.invalidateQueries({queryKey: ['products']}).then()
      }).catch((error) => {
        console.log('ERROR:', error)
      })
    }

  }

  return(
    <>
      <div className={ open ? 'fixed h-screen w-screen bg-slate-900 opacity-50 top-0' : 'hidden' }></div>
      <div className={ open ? 'fixed h-screen w-screen top-0 backdrop-blur-sm' : 'hidden' }>
        <div className='flex desktop:mt-[13%] laptop:mt-[6%] justify-center place-content-center'>
          <div>
            <div className='rounded-t-xl bg-blue-500 h-12 w-full'>
              <button className='rounded-tr-xl float-right h-full w-12 text-white' onClick={() => setOpen(!open)}>
                X
              </button>
            </div>
            <div className='rounded-b-xl bg-slate-50 w-[960px] h-[540px]'>
              <div className='justify-left flex pt-12 mr-8'>
                <div className='grid grid-cols-2 gap-y-8 gap-x-4 text-right mt-6'>
                  <p className=''>Produktname:</p>
                  <input ref={nameRef} className='border-slate-600 border rounded w-64' onChange={(e) => {
                    product.name = e.target.value
                  }} />
                  <p className=''>Preis:</p>
                  <input ref={priceRef} className='border-slate-600 border rounded w-64' onChange={(e) => {
                    product.price = e.target.value.replace(',', '.')
                  }} />
                  <p className=''>Beschreibung:</p>
                  <textarea ref={descRef} className='resize-none border-slate-600 border rounded w-64 h-64' onChange={(e) => {
                    product.desc = e.target.value
                  }} />
                </div>
                <div className='ml-16'>
                  <p>Bild:</p>
                  <select ref={picRef} defaultValue='' className='w-64 border border-slate-500 rounded' onChange={(e) => {
                    product.picture = e.target.value
                    setLoadPic(parseInt(product.picture) + 1)
                  }}>
                    <option value=' '><Translate placeholder='select_dropdown'/></option>
                    {picturesArr.map((picture, index ) =>
                      <option value={index} key={index}>{picture}</option>
                    )}
                  </select>
                  <div className='mt-2 mr-4 w-96'>
                    {
                      product.picture && product.picture !== ' '
                        ?
                        <>
                        <p>Preview:</p>
                        <img
                          src={`/img/Bild${loadPic}.png`}
                          className=' text-slate-400 rounded border border-slate-500'
                          alt='product_picture'
                        />
                        </>
                      :
                      <></>
                    }
                  </div>
                </div>
              </div>
              <div className='float-right flex gap-x-4 mt-12 mr-6'>
                <button
                  className='border-slate-400 hover:bg-slate-400 hover:text-white border-2 rounded-md h-10 w-24'
                  onClick={() => setOpen(!open)}
                >
                  <Translate placeholder='dialog_close' />
                </button>
                <button
                  type="submit"
                  className='bg-emerald-500 hover:bg-emerald-400 text-white rounded-md h-10 w-24'
                  onClick={() => handleSubmit()}
                >
                  <Translate placeholder='dialog_submit' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}