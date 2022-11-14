import { useRouter } from 'next/router'

export default function Logo() {
  const router = useRouter()

  return (
    <>
      <img src='/logo/claim_black.svg' onClick={() => router.push('/')} className='cursor-pointer laptop:ml-[282px] desktop:ml-[320px] laptop:h-6 desktop:h-7 laptop:mt-[18px] desktop:mt-4 float-left'/>
    </>
  )
}