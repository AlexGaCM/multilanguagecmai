import { useTranslation } from "next-i18next"

type props = {
  placeholder: string
}

export default function Translation({placeholder}: props) {
  const {t} = useTranslation()

  return(
    <>{t(placeholder)}</>
  )
}