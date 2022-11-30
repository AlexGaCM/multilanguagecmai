import { useQuery } from "react-query";

const useProducts = () => {

  const getData = async () => {
    const res = await fetch('./api/callProducts')
    return res.json()
  }

  const { data, status } = useQuery([ 'products' ], getData)

  return [ data, status ]
}

export default useProducts