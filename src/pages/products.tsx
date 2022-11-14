import Navigation from '../components/Navigation'
import Topbar from "../components/Topbar";
import Translate from "../components/Translation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], null )),
    }
  }
}

export default function Products() {

  return (
    <>
      <div>
        <Navigation />
        <Topbar />
        <div className='mt-[40px] laptop:ml-[300px] desktop:ml-[340px]'>
          <h1 className='text-3xl'>
            <Translate placeholder='module_name_products' />
          </h1>
        </div>
      </div>
    </>
  )
}
