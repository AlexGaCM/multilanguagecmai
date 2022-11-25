import '../styles/globals.css'
import { appWithTranslation } from "next-i18next";
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return(
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp)
