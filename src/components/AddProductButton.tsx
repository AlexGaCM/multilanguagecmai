import { useState } from 'react'
import Translate from './Translation'

export default function AddProductButton() {

  const [ open, setOpen ] = useState(false)
  const [ data, setData ] = useState({
      id: '',
      name: '',
      price: '',
      desc: '',
      picture: ''
  })

  const picturesArr = ["Bild1", "Bild2", "Bild3", "Bild4", "Bild5"]

  const handleSubmit = () => {

    console.log(data)

    setData({
      id: '',
      name: '',
      price: '',
      desc: '',
      picture: ''
    })

    for (const [key, value] of Object.entries(data)) {
      if (value === '' && key != 'id') {
        alert("ERROR! input cant be empty")
        break
      }
    }
  }

  return(
    <>
      <div className='laptop:ml-[300px] desktop:ml-[340px]'>
        <button
          onClick={() => setOpen(!open)}
          className='mt-8 bg-blue-500 hover:bg-blue-400 text-white rounded py-1 px-2'
        >
          <Translate placeholder='add_product_button' />
        </button>
      </div>
      <div className={ open ? 'absolute h-screen w-screen bg-slate-900 opacity-50 top-0' : 'hidden' }></div>
      <div className={ open ? 'absolute h-screen w-screen top-0 backdrop-blur-sm' : 'hidden' }>
        <div className='flex desktop:mt-[13%] laptop:mt-[6%] justify-center place-content-center'>
          <div>
            <div className='bg-blue-500 h-12 w-full'>
              <button className='float-right h-full w-12 text-white hover:bg-blue-400' onClick={() => setOpen(!open)}>
                X
              </button>
            </div>
            <div className='bg-slate-50 w-[960px] h-[540px]'>
              <div className='justify-left flex pt-8'>
                <div className='grid grid-cols-2 gap-y-6 gap-x-4 text-right'>
                    <p className=''>ID:</p>
                    <input readOnly className='border-slate-600 border rounded w-64 text-slate-600 bg-slate-200' />
                    <p className=''>Produktname:</p>
                    <input className='border-slate-600 border rounded w-64' onChange={(e) => {
                      data.name = e.target.value
                    }} />
                    <p className=''>Preis:</p>
                    <input className='border-slate-600 border rounded w-64' onChange={(e) => {
                      data.price = e.target.value
                    }} />
                    <p className=''>Beschreibung:</p>
                    <textarea className='resize-none border-slate-600 border rounded w-64 h-64' onChange={(e) => {
                      data.desc = e.target.value
                    }} />
                </div>
                <div className='ml-16'>
                  <p className=''>Bild:</p>
                  <select className='w-64 border border-slate-500 rounded' onChange={(e) => {
                    data.picture = e.target.value
                  }}>
                    <option value=''><Translate placeholder='select_dropdown'/></option>
                    {picturesArr.map((picture, index ) =>
                      <option value={index} key={index}>{picture}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className='float-right flex gap-x-2 mt-12 mr-6'>
                <button
                  className='border-slate-400 hover:bg-slate-400 hover:text-white border-2 rounded-md h-10 w-24'
                  onClick={() => setOpen(!open)}
                >
                  <Translate placeholder='dialog_close' />
                </button>
                <button
                  type="submit"
                  className='bg-emerald-500 hover:bg-emerald-400 text-white rounded-md h-10 w-24'
                  onClick={() => {
                    handleSubmit()
                  }}
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