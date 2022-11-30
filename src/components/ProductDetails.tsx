import {useState} from "react";
import Translate from "./Translation";

type Props = {
  data: object
}

export default function ProductDetails({data}: Props) {

  const [open, setOpen] = useState(false)

  const testFunc = () => {
    console.log(data)
    setOpen(!open)
  }

  return(
    <>
      <div>
        <button className='hover:text-slate-500 text-sm pt-2' onClick={() => testFunc()}>Mehr Anzeigen
          <img src='/svg/arrow-drop-down.svg' alt='arrow' className='ml-[40%] justify-center h-6 hover:text-slate-500' />
        </button>

        <div className={ open ? 'fixed h-screen w-screen bg-slate-900 opacity-50 top-0' : 'hidden' }></div>
        <div className={ open ? 'fixed h-screen w-screen top-0 backdrop-blur-sm' : 'hidden' }>
          <div className='flex desktop:mt-[13%] laptop:mt-[6%]'>
            <div className='w-64 h-64 bg-slate-900'>
              <div className='float-right flex gap-x-4 mt-1 mr-6'>
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