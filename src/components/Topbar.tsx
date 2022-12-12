import LanguageSwitch from './LanguageSwitch';
import Logo from './Logo'

export default function Topbar() {

  return(
    <div className='border-b border-slate-300 h-[60px] sticky top-0 z-0 bg-white w-full'>
      <Logo />
      <LanguageSwitch />
    </div>
  )
}
