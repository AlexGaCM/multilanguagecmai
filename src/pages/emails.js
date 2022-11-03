import Navigation from '../components/Navigation'
import Topbar from "../components/Topbar";
import Translate from "../components/Translation";

export default function Emails() {

  return (
    <>
      <div>
        <Navigation />
        <Topbar />
        <div className='mt-[40px] laptop:ml-[300px] desktop:ml-[340px]'>
          <h1 className='text-3xl'>
            <Translate placeholder='module_name_emails' />
          </h1>
        </div>
      </div>
    </>
  )
}
