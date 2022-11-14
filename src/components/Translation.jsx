import i18n from "i18next"
// import dynamic from 'next/dynamic'
import { initReactI18next, useTranslation } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import HttpApi from "i18next-http-backend"


i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init(
    {
      supportedLngs: ["de", "en", "fr"],
      fallbackLng: "en",
      detection: {
        order: ['path', 'localStorage', 'cookie'],
        caches: ['localStorage', 'cookie']
      },
      backend: {
        loadPath: '/assets/locales/{{lng}}/common.json'
      }
    })


export default function Translation(props) {
  const {t} = useTranslation()

  return(
    <>{t(props.placeholder)}</>
  )
}



// export default dynamic(() => Promise.resolve(Translation), {
//   ssr: false
// })