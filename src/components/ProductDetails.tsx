import { useState } from 'react'
import Translate from '../components/Translation'
import { queryClient } from '../pages/_app'
import { ObjectId } from 'mongodb'
import { useRouter } from 'next/router'

type Props = {
  data: {
    _id: ObjectId,
    name: string,
    price: any,
    desc: string,
    picture: number
  }
}

export default function ProductDetails({data}: Props) {

  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const router = useRouter()

  const store = {
    _id: data._id,
    name: data.name,
    price: data.price,
    desc: data.desc,
    picture: data.picture
  }

  const cutText = (str, n) => (str.length > n) ? str.slice(0, n-1).trim() + '...' : str

  const handleMoreInfo = () => router.push(`/shop/${data._id}`)

  const handleChange = (e, key) => store[key] = e.target.value

  const handleEdit = () => {

    store.price = parseFloat(store.price.replace(',', '.'))

    if (Math.floor(store.price) != 0) {
      store.price = store.price.toFixed(2)
    }

    const objArr = Object.entries(store)
    let bool = false

    if (edit) {
      for (const [key, value] of objArr) {
        if (key !== '_id' && value === null || key === 'price' && isNaN(value) || value.toString().trim() === '') {
          alert("ERROR! input cant be empty and price must be a number")
          setEdit(false)
          bool = false
          break
        } else {
          bool = true
        }
      }
    } else {
      setEdit(true)
    }

    if (bool) {
      data = store
      setEdit(!edit)

      fetch('./api/callProducts', {
        method: 'PUT',
        body: JSON.stringify(data)
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ['products']}).then()
      }).catch((error) => {
        console.log('ERROR:', error)
      })
    }

  }

  const handleClose = () => {
    setOpen(!open)
    setEdit(false)
  }

  const delProduct = () => {
    setOpen(!open)

    fetch('./api/callProducts', {
      method: 'DELETE',
      body: JSON.stringify(data)
    }).then(() => {
      queryClient.invalidateQueries({ queryKey: ['products']}).then()
    }).catch((error) => {
      console.log('ERROR:', error)
    })
  }

  const formatPrice = (price) => {
    return parseFloat(price.replace(',', '.')).toFixed(2).toString().replace('.', ',')
  }

  data.price = data.price.toString()

  return(
    <>
      <button onClick={() => handleMoreInfo()}>
        <div className='grid grid-cols-1 place-items-center grid-rows-10 bg-slate-50 border border-slate-400 font-light rounded'>
          <div className='p-4 row-span-2 flex desktop:h-[240px] laptop:h-[200px]'>
            <img
              src={`/img/Bild${data.picture + 1}.png`}
              className='text-slate-400 rounded border border-slate-400 bg-slate-50'
              alt='product_picture'
            />
          </div>
          <div className='hover:text-slate-500 border-b border-slate-400 px-4 pb-2 w-full rounded-full font-semibold'>
            <span className='px-4 py-1 rounded-md'>{cutText(data.name , 30)}
            </span>
          </div>
          <div className='py-2'>{parseFloat(data.price).toFixed(2).toString().replace('.', ',')}€</div>
          <div className='border-b border-slate-300 px-4 w-[90%]'></div>
          <div className='py-2'>{cutText(data.desc, 24)}</div>
        </div>
      </button>
      <div className={ open ? 'z-40 fixed h-screen w-screen bg-slate-900 opacity-50 top-0 left-0' : 'hidden' }></div>
      <div className={ open ? 'z-50 fixed h-screen grid grid-cols-1 grid-rows-1 place-items-center w-screen backdrop-blur-sm left-0 top-0 font-light text-black' : 'hidden' }>
        <div>
          <div className={ edit ? 'rounded-t-xl bg-slate-500 h-12 w-full' : 'rounded-t-xl bg-blue-500 h-12 w-full' }>
            <button className='rounded-tr-xl float-right h-full w-12 text-white text-base' onClick={() => handleClose()}>
              x
            </button>
          </div>
          <div className='rounded-b-xl bg-slate-50 w-[960px]'>
            <div className='grid grid-rows-3 grid-cols-2 mx-8 place-items-center'>
              {
                edit
                ?
                <>
                  <div>
                    <input
                      defaultValue={data.name}
                      className='overflow-y-auto w-64 text-center bg-slate-200 rounded border border-slate-900 font-semibold'
                      onChange={(e) => {
                        handleChange(e, 'name')
                      }}
                    ></input>
                    <input
                      defaultValue={formatPrice(data.price)}
                      className='overflow-y-auto mt-2 w-64 text-center bg-slate-200 rounded border border-slate-900'
                      onChange={(e) => {
                        handleChange(e, 'price')
                      }}
                    ></input>
                  </div>
                  <textarea
                    defaultValue={data.desc}
                    className='overflow-y-scroll px-4 h-4/6 w-[380px] text-base text-center row-span-3 bg-slate-200 rounded border border-slate-900 resize-none'
                    onChange={(e) => {
                      handleChange(e, 'desc')
                    }}
                  ></textarea>
                </>
                :
                <>
                  <div>
                    <p className='overflow-scroll font-semibold'>{data.name}</p>
                    <p className='overflow-scroll mt-2'>Preis: {formatPrice(data.price)}€</p>
                  </div>
                  <textarea
                    defaultValue={data.desc}
                    readOnly
                    className='overflow-scroll px-4 h-4/6 w-[380px] text-center text-base row-span-3 bg-blue-100 rounded border border-blue-500 resize-none'
                  >
                  </textarea>
                </>
              }
              <div className='row-span-2'>
                <img src={`/img/Bild${data.picture + 1}.png`} className='text-slate-400 rounded border border-slate-500 w-96 place-items-end' alt='product_picture' />
              </div>
            </div>
            <div className='flex gap-x-4 p-4 mt-6 text-base justify-end font-normal'>
              <button
                className='hover:bg-rose-500 bg-rose-600 text-white hover:text-white rounded-md h-10 w-24'
                onClick={() => delProduct()}
              >
                Löschen
              </button>
              <button
                className={
                  edit
                  ?
                  'border-slate-400 bg-slate-400 text-white border-2 rounded-md h-10 w-28'
                  :
                  'border-slate-400 hover:bg-slate-400 bg-slate-50 hover:text-white border-2 rounded-md h-10 w-28'
                }
                onClick={() => handleEdit()}
              >
                { edit ? 'Übernehmen' : 'Bearbeiten' }
              </button>
              <button
                className='border-slate-400 hover:bg-slate-400 bg-slate-50 hover:text-white border-2 rounded-md h-10 w-24'
                onClick={() => handleClose()}
              >
                <Translate placeholder='dialog_close' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}