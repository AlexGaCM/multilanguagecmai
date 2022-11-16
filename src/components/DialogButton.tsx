import { useState } from "react";
import Translate from './Translation'
import useStore from '../storage/storage'

type Props = {
  buttonClassName: string
  dialogClassName: string
}

export default function DialogButton({ buttonClassName, dialogClassName }: Props) {

  const [ open, setOpen ] = useState(false)
  const { color, title, setColor, setTitle } = useStore()
  const [ previewColor, setPreviewColor ] = useState(color)
  const [ content, setContent ] = useState(title)

  const postData = (selectedColor) => {
    const data = { color: selectedColor }

    return fetch('./api', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response)  => response.json())
      .catch((error) => {
        console.log('ERROR:', error)
      })
  }

  return (
    <>
      <div className='laptop:ml-[300px] desktop:ml-[340px]'>
        <h1 className={'text-3xl mt-16 ' + color}>
          {title}
        </h1>
        <button className={buttonClassName} onClick={() => setOpen(!open)}>
          <Translate placeholder='dialog_open' />
        </button>
      </div>
      <div className={ open ? 'absolute h-screen w-screen bg-slate-900 opacity-50 top-0' : 'hidden' }></div>
      <div className={ open ? 'absolute h-screen w-screen top-0 backdrop-blur-sm' : 'hidden' }>
        <div className='flex desktop:mt-[15%] laptop:mt-[10%] justify-center place-content-center'>
          <div className={ open ? dialogClassName : 'hidden' }>
            <div className="bg-blue-500 h-12 w-full">
              <button className='float-right h-full w-12 text-white' onClick={() => setOpen(false)}>
                X
              </button>
            </div>
            <form className='text-center'>
              <textarea
                className='mt-12 resize-none text-center w-4/6 h-32 rounded border-2 border-blue-500'
                placeholder='Enter Text'
                onChange={(e) => setContent(e.target.value)}
                defaultValue={title}
              ></textarea>
            </form>
            <div className='flex'>
              <div className='ml-8 mt-8 gap-x-4 flex'>
                <button className='bg-blue-600 hover:bg-blue-500 w-28 h-28 rounded-md' onClick={() => setPreviewColor("text-blue-500")}></button>
                <button className='bg-red-600 hover:bg-red-500 w-28 h-28 rounded-md' onClick={() => setPreviewColor("text-red-600")}></button>
                <button className='bg-emerald-500 hover:bg-emerald-400 w-28 h-28 rounded-md' onClick={() => setPreviewColor("text-emerald-500")}></button>
                <button className='bg-pink-400 hover:bg-pink-300 w-28 h-28 rounded-md' onClick={() => setPreviewColor("text-pink-400")}></button>
              </div>
              <div className='ml-12 mt-4'>
                <div>
                  <Translate placeholder='dialog_preview' />
                </div>
                <div className={'bg-white desktop:w-96 laptop:w-80 desktop:h-30 laptop:h-28 rounded-md px-2 py-1 resize-none text-3xl overflow-scroll text-center ' + previewColor}>
                  {content}
                </div>
              </div>
            </div>
            <div className='float-right flex gap-x-2 mt-10 mr-6'>
              <button
                className='border-slate-400 hover:bg-slate-400 hover:text-white border-2 rounded-md h-10 w-24'
                onClick={() => {
                  setPreviewColor(color)
                  setContent(title)
                  setOpen(false)
                }}
              >
                <Translate placeholder='dialog_close' />
              </button>
              <button
                className='bg-emerald-500 hover:bg-emerald-400 text-white rounded-md h-10 w-24'
                onClick={() => {
                  setTitle(content)
                  setColor(previewColor)
                  setOpen(false)
                  postData(previewColor).then((data) => {
                    console.log(data.selected_color)
                  })
                }}
              >
                <Translate placeholder='dialog_submit' />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={color !== 'text-black' ? `laptop:ml-[300px] desktop:ml-[340px] text-3xl mt-8` : ''}>
        Gewählte Farbe ist {color}
      </div>
    </>
  )
}
