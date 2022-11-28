import Navigation from '../components/Navigation'
import Topbar from '../components/Topbar'
import Translate from '../components/Translation'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AddProductButton from "../components/AddProductButton";

export async function getServerSideProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], null )),
    }
  }
}

export default function Shop() {

  return (
    <>
      <div>
        <Navigation />
        <Topbar />
        <div className='mt-[40px] laptop:ml-[300px] desktop:ml-[340px]'>
          <h1 className='text-3xl'>
            <Translate placeholder='module_name_shop' />
          </h1>
          <div className='mt-4 bg-slate-200 mr-12 rounded-md p-4'>
          </div>
        </div>
      </div>
      <AddProductButton />
    </>
  )
}