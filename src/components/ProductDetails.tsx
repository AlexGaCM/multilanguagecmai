import { useState } from 'react'
import Translate from '../components/Translation'
import { queryClient } from '../pages/_app'
import { ObjectId } from 'mongodb'

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

  const cutText = (str, n) => {
    return (str.length > n) ? str.slice(0, n-1).trim() + '...' : str
  }

  const store = {
    _id: data._id,
    name: data.name,
    price: data.price,
    desc: data.desc,
    picture: data.picture
  }

  const handleMoreInfo = () => {
    setOpen(!open)
  }

  const handleEdit = () => {

    store.price = parseFloat(store.price.replace(',', '.'))

    if (Math.floor(store.price) != 0) {
      store.price = store.price.toFixed(2)
    }

    const objArr = Object.entries(store)
    let bool = false

    for (const [key, value] of objArr) {
      if (key !== '_id' && value === null || key === 'price' && isNaN(value) || value.toString().trim() === '') {
        console.log(key, value)
        alert("ERROR! input cant be empty and price must be a number")
        bool = false
        break
      } else {
        bool = true
      }
    }


    if (bool) {
      data = store
      setEdit(!edit)

      fetch('./api/callProducts', {
        method: 'PATCH',
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

  const handleChange = (e, key) => {
    store[key] = e.target.value
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

  data.price = data.price.toString()

  return(
    <>
      <button className='hover:text-slate-500 border-b border-slate-400 px-4 pb-2 w-full rounded-full font-semibold' onClick={() => handleMoreInfo()}>{cutText(data.name, 32)}</button>
      <div className={ open ? 'fixed h-screen w-screen bg-slate-900 opacity-50 top-0 left-0' : 'hidden' }></div>
      <div className={ open ? 'fixed h-screen w-screen flex align-center justify-center backdrop-blur-sm left-0 top-0' : 'hidden' }>
        <div className='desktop:mt-[13%] laptop:mt-[6%]'>
          <div className={ edit ? 'rounded-t-xl bg-slate-500 h-12 w-full' : 'rounded-t-xl bg-blue-500 h-12 w-full' }>
            <button className='rounded-tr-xl float-right h-full w-12 text-white' onClick={() => handleClose()}>
              X
            </button>
          </div>
          <div className='rounded-b-xl bg-slate-50 w-[960px]'>
            <div className='grid grid-rows-3 grid-cols-2 mx-8 place-items-center'>
                {
                  edit
                  ?
                  <>
                    <input
                      defaultValue={data.price.replace('.', ',')}
                      className='overflow-y-auto text-center bg-slate-200 rounded border border-slate-900'
                      onChange={(e) => {
                        handleChange(e, 'price')
                      }}
                    ></input>
                    <input
                      defaultValue={data.name}
                      className='overflow-y-auto w-64 text-center bg-slate-200 rounded border border-slate-900 font-semibold'
                      onChange={(e) => {
                        handleChange(e, 'name')
                      }}
                    ></input>
                    <textarea
                      defaultValue={data.desc}
                      className='overflow-y-scroll px-4 h-56 w-[380px] text-base text-center row-span-2 bg-slate-200 rounded border border-slate-900 resize-none'
                      onChange={(e) => {
                        handleChange(e, 'desc')
                      }}
                    ></textarea>
                  </>
                  :
                  <>
                    <p className='overflow-scroll'>Preis: {parseFloat(data.price.replace(',', '.')).toFixed(2).toString().replace('.', ',')}€</p>
                    <p className='overflow-scroll font-semibold'>{data.name}</p>
                    <p className='overflow-scroll px-4 h-56 w-[380px] text-base row-span-2 bg-blue-100 rounded border border-blue-500'>{data.desc}</p>
                  </>
                }
              <div className='row-span-2'>
                <img src={`/img/Bild${data.picture+1}.png`} className='text-slate-400 rounded border border-slate-500 w-96 place-items-end' alt='product_picture' />
              </div>
            </div>
            <div className='flex gap-x-4 p-4 mt-6 text-base justify-end font-normal'>
              <button
                className='hover:bg-rose-400 bg-rose-600 text-white hover:text-white rounded-md h-10 w-24'
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