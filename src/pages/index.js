import Navigation from '../components/Navigation'
import Topbar from '../components/Topbar'
import Translate from "../components/Translation";
import DialogButton from '../components/DialogButton'

export default function Home() {

  return (
    <>
      <Navigation />
      <Topbar />
      <div className='mt-[40px] laptop:ml-[300px] desktop:ml-[340px]'>
        <h1 className='text-3xl'>
          <Translate placeholder='module_name_dashboard' />
        </h1>
      </div>
      <DialogButton
        buttonClassName='mt-8 bg-blue-500 hover:bg-blue-400 text-white rounded py-1 px-2'
        dialogClassName='absolute w-[1020px] h-[480px] m-1/2 bg-slate-200 drop-shadow-lg'
      />
    </>
  )
}
