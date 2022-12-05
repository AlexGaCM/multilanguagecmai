import Navigation from '../components/Navigation'
import Topbar from '../components/Topbar'
import Translate from '../components/Translation'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AddProductButton from "../components/AddProductButton";
import ProductList from '../components/ProductList'

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
          <div className='mr-12'>
            <div className='h-12 mt-8 bg-blue-500 rounded-t-xl'></div>
            <div className='bg-slate-100 border rounded-b-xl p-8'>
              <ProductList />
            </div>
          </div>
        </div>
      </div>
      <AddProductButton />
      <div className='mt-16'></div>
    </>
  )
}