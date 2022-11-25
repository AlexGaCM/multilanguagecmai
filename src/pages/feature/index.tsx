import { useQuery } from 'react-query'

const fetchFromAPI = async () => {
  const res = await fetch('./api/postcolor')
  return res.json()
}

export default function Features() {
  const { data, status } = useQuery("", fetchFromAPI);
  console.log('data: ', data)
  console.log('status: ', status)
  return (
    <>
      <div style={{ display:'flex', width:"100%", marginTop:"50px", flexDirection:"column", justifyContent:'center', alignItems:'center' }} className='text-3xl'>
        {
          status==="success" &&
          <>
            <div>{data.title}</div>
            <div className={data.color}>{data.color}</div>
          </>
        }
      </div>
    </>
  )
}