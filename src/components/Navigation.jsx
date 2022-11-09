import { useRouter } from 'next/router'
import Translate from '../components/Translation'

export default function Navigation() {
  const router = useRouter()

  return(
    <>
      <div className='flex absolute'>
        <div className='bg-slate-900 h-screen laptop:w-[252px] desktop:w-[288px]'>
          <div className='h-[60px] border-b border-slate-800'>

          </div>
          <nav className='flex flex-1 flex-col justify-between justify-items-stretch'>
            <ul className='text-slate-400 text-sm'>
              <li onClick={() => router.push('/')} className='group cursor-pointer border-l-3 px-6 py-4 relative hover:text-white hover:bg-slate-800 flex items-center'>
                <span><Translate placeholder='module_name_dashboard' /></span>
              </li>
              <li onClick={() => router.push('/products')} className='group cursor-pointer border-l-3 px-6 py-4 relative hover:text-white hover:bg-slate-800 flex items-center'>
                <span><Translate placeholder='module_name_products' /></span>
              </li>
              <li onClick={() => router.push('/online-ads')} className='group cursor-pointer border-l-3 px-6 py-4 relative hover:text-white hover:bg-slate-800 flex items-center'>
                <span><Translate placeholder='module_name_online_ads' /></span>
              </li>
            </ul>
          </nav>
        </div>

      </div>
    </>
  )
}