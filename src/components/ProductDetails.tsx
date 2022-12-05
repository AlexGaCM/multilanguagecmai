import {useState} from "react";
import Translate from '../components/Translation'
import {queryClient} from "../pages/_app";
import {ObjectId} from "mongodb";

type Props = {
  data: {
    _id: ObjectId,
    name: string,
    price: string,
    desc: string,
    picture: number
  }
}

export default function ProductDetails({data}: Props) {

  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)

  const handleMoreInfo = () => {
    setOpen(!open)
  }

  const handleChange = (e, key) => {
    data[key] = e.target.value

    fetch('./api/callProducts', {
      method: 'PATCH',
      body: JSON.stringify(data)
    }).then(() => {
      queryClient.invalidateQueries({ queryKey: ['products']})
    }).catch((error) => {
      console.log('ERROR:', error)
    })
  }

  const delProduct = () => {
    setOpen(!open)

    fetch('./api/callProducts', {
      method: 'DELETE',
      body: JSON.stringify(data)
    }).then(() => {
      queryClient.invalidateQueries({ queryKey: ['products']})
    }).catch((error) => {
      console.log('ERROR:', error)
    })
  }

  return(
    <>
      <div>
        <button className='hover:text-slate-500 text-sm py-2' onClick={() => handleMoreInfo()}>Mehr Anzeigen</button>
        <div className={ open ? 'fixed h-screen w-screen bg-slate-900 opacity-50 top-0 left-0' : 'hidden' }></div>
        <div className={ open ? 'fixed h-screen w-screen flex align-center justify-center backdrop-blur-sm left-0 top-0' : 'hidden' }>
          <div className='desktop:mt-[13%] laptop:mt-[6%]'>
            <div className='rounded-t-xl bg-blue-500 h-12 w-full'>
              <button className='rounded-tr-xl float-right h-full w-12 text-white hover:bg-blue-400' onClick={() => setOpen(!open)}>
                X
              </button>
            </div>
            <div className='rounded-b-xl bg-slate-50 w-[960px] h-[420px]'>
              <div className='grid grid-rows-3 grid-cols-2 mx-8 place-items-center'>
                  {
                    edit
                    ?
                    <>
                      <input
                        defaultValue={data.name}
                        className='overflow-y-auto text-center text-white bg-slate-800 rounded border border-slate-900'
                        onChange={(e) => {
                          handleChange(e, 'name')
                        }}
                      ></input>
                      <input
                        defaultValue={data.price}
                        className='overflow-y-auto text-center text-white bg-slate-800 rounded border border-slate-900'
                        onChange={(e) => {
                          handleChange(e, 'price')
                        }}
                      ></input>
                      <textarea
                        defaultValue={data.desc}
                        className='overflow-y-auto h-full w-full text-center row-span-2 text-white bg-slate-900 rounded border border-slate-900 resize-none'
                        onChange={(e) => {
                          handleChange(e, 'desc')
                        }}
                      ></textarea>
                    </>
                    :
                    <>
                      <p className='overflow-scroll'>{data.name}</p>
                      <p className='overflow-scroll'>{data.price}€</p>
                      <p className='overflow-y-auto h-full w-full row-span-2 bg-blue-100 rounded border border-blue-500'>{data.desc}</p>
                    </>
                  }
                <div className='row-span-2'>
                  <img src={`/img/Bild${data.picture+1}.png`} className='text-slate-400 rounded border border-slate-500 w-96 place-items-end' alt='product_picture' />
                </div>
              </div>
              <div className='flex float-right gap-x-4 mt-10 mr-4'>
                <button
                  className='hover:bg-rose-400 bg-rose-600 text-white hover:text-white rounded-md h-10 w-24'
                  onClick={() => delProduct()}
                >
                  Löschen
                </button>
                <button
                  className='border-slate-400 hover:bg-slate-400 bg-slate-50 hover:text-white border-2 rounded-md h-10 w-28'
                  onClick={() => setEdit(!edit)}
                >
                  Bearbeiten
                </button>
                <button
                  className='border-slate-400 hover:bg-slate-400 bg-slate-50 hover:text-white border-2 rounded-md h-10 w-24'
                  onClick={() => setOpen(!open)}
                >
                  <Translate placeholder='dialog_close' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}