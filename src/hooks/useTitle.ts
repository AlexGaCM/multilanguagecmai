import { useQuery } from "react-query";

const useTitle = () => {

  const getData = async () => {
    const res = await fetch('./api/postcolor')
    return res.json()
  }

  const { data } = useQuery([ 'title' ], getData)

  return [ data ]
}

export default useTitle