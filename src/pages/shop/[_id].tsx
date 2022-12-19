import { queryClient } from '../_app'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navigation from '../../components/Navigation'
import Topbar from '../../components/Topbar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Product } from '../../storage/storage'

export async function getServerSideProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], null )),
    }
  }
}

export default function ProductDetail() {

  const [product, setProduct] = useState<Product>({
    _id: '',
    name: '',
    price: 999,
    desc: '',
    picture: 999
  })
  const [edit, setEdit] = useState(false)
  const [warning, setWarning] = useState({warning1: false, warning2: false})
  const router = useRouter()

  useEffect(() => {
    fetch('../api/getProductById', {
    method: 'POST',
    body: router.query._id as string
  })
    .then(res => res.json())
    .then(res => setProduct(res))
  }, [])

  const store = {
    _id: product._id,
    name: product.name,
    price: product.price,
    desc: product.desc,
    picture: product.picture
  }

  const handleChange = (e, key) => store[key] = e.target.value

  const handleEdit = () => {

    store.price = parseFloat(store.price.replace(',', '.'))

    if (Math.floor(store.price) != 0) {
      store.price = store.price.toFixed(2)
    }

    const objArr = Object.entries(store)
    let bool = false

    if (edit) {
      for (const [key, value] of objArr) {
        if (key !== '_id' && value === null || key === 'price' && isNaN(value) || value.toString().trim() === '') {
          alert("ERROR! input cant be empty and price must be a number")
          setEdit(false)
          bool = false
          break
        } else {
          bool = true
        }
      }
    } else {
      setEdit(true)
    }

    if (bool) {

      product._id = store._id
      product.name = store.name
      product.price = store.price
      product.desc = store.desc

      setEdit(!edit)

      fetch('../api/callProducts', {
        method: 'PUT',
        body: JSON.stringify(product)
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ['products']}).then()
      }).catch((error) => {
        console.log('ERROR:', error)
      })
    }

  }

  const delProduct = () => {

    console.log(warning)

    if (warning.warning2) {
      fetch('../api/callProducts', {
        method: 'DELETE',
        body: JSON.stringify(product)
      }).then(() => {
        queryClient.invalidateQueries({queryKey: ['products']}).then()
      }).catch((error) => {
        console.log('ERROR:', error)
      })

      router.push('/shop').then()
    }

  }

  const formatPrice = (price) => {
    return parseFloat(price.replace(',', '.')).toFixed(2).toString().replace('.', ',')
  }

  product.price = product.price.toString()

  return (
    <>
      <Navigation activeSite='shop' />
      <Topbar />
      <div className={ warning.warning1 ? 'absolute h-screen w-screen bg-slate-900 opacity-50 top-0' : 'hidden' }></div>
      <div className={ warning.warning1 ? 'absolute h-screen w-screen top-0 backdrop-blur-sm z-10' : 'hidden' }>
        <div className='flex grid grid-cols-1 grid-rows-1 place-items-center h-screen w-screen justify-center align-center'>
          <div className='w-[860px]'>
            <div className="rounded-t-xl bg-rose-700 h-12 w-full">
              <button className='rounded-tr-xl float-right h-full w-12 text-white' onClick={() => setWarning({warning1: false, warning2: false})}>
                x
              </button>
            </div>
            <div className='w-full bg-slate-100 rounded-b-xl text-center'>
              <div className='py-4'>
                Möchtest du das Produkt wirklich Löschen? Diese Änderung kann <span className='text-rose-600'>nicht</span> rückgängig gemacht werden!
              </div>
              <div className='text-right p-4'>
                <button
                  className='hover:bg-rose-500 bg-rose-600 text-white hover:text-white rounded-md h-10 px-4 mr-4'
                  onClick={() => {
                    warning.warning2 = true
                    delProduct()
                  }}
                >
                  Löschen
                </button>
                <button
                  onClick={() => setWarning({warning1: false, warning2: false})}
                  className='border-slate-400 hover:bg-slate-400 bg-slate-50 hover:text-white border-2 rounded-md h-10 px-4'
                >
                  Zurück
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-fit mt-12 rounded-xl laptop:ml-[300px] desktop:ml-[340px]'>
        <div className={ edit ? 'rounded-t-xl bg-slate-500 h-12 w-full' : 'rounded-t-xl border-xl bg-blue-500 h-12 w-full' }>
          <img alt='arrow-back' src='/svg/arrow-back.svg' onClick={() => router.push('/shop')} className='cursor-pointer w-12 p-2 rounded-full hover:bg-blue-600' />
        </div>
        <div className='rounded-b-xl border bg-slate-100 w-[960px]'>
          <div className='grid grid-rows-3 grid-cols-2 mx-8 place-items-center text-center text-xl'>
            {
              edit
                ?
                <>
                  <div>
                    <input
                      defaultValue={product.name}
                      className='overflow-y-auto w-64 text-center bg-slate-200 rounded border border-slate-900 font-semibold'
                      onChange={(e) => {
                        handleChange(e, 'name')
                      }}
                    ></input>
                    <input
                      defaultValue={formatPrice(product.price)}
                      className='overflow-y-auto mt-2 w-64 text-center bg-slate-200 rounded border border-slate-900'
                      onChange={(e) => {
                        handleChange(e, 'price')
                      }}
                    ></input>
                  </div>
                  <textarea
                    defaultValue={product.desc}
                    className='overflow-y-scroll px-4 h-4/6 w-[380px] text-base text-center row-span-3 bg-slate-200 rounded border border-slate-900 resize-none'
                    onChange={(e) => {
                      handleChange(e, 'desc')
                    }}
                  ></textarea>
                </>
                :
                <>
                  <div>
                    <p className='overflow-scroll font-semibold'>{product.name}</p>
                    <p className='overflow-scroll mt-2'>Preis: {formatPrice(product.price)}€</p>
                  </div>
                  <textarea
                    defaultValue={product.desc}
                    readOnly
                    className='overflow-scroll px-4 h-4/6 w-[380px] text-center text-base row-span-3 bg-blue-100 rounded border border-blue-500 resize-none'
                  >
                  </textarea>
                </>
            }
            <div className='row-span-2'>
              <img src={`/img/Bild${product.picture + 1}.png`} className='text-slate-400 rounded border border-slate-500 w-96 place-items-end' alt='product_picture' />
            </div>
          </div>
          <div className='flex gap-x-4 p-4 mt-6 text-base justify-end font-normal'>
            <button
              className='hover:bg-rose-500 bg-rose-600 text-white hover:text-white rounded-md h-10 w-24'
              onClick={() => {
                setWarning({warning1: true, warning2: false})
              }}
            >
              Löschen
            </button>
            <button
              className={
                edit
                  ?
                  'border-slate-400 bg-slate-400 text-white border-2 rounded-md h-10 w-28'
                  :
                  'border-slate-400 hover:bg-slate-400 bg-slate-50 hover:text-white border-2 rounded-md h-10 w-28'
              }
              onClick={() => handleEdit()}
            >
              { edit ? 'Übernehmen' : 'Bearbeiten' }
            </button>
          </div>
        </div>
      </div>
    </>
  )
}