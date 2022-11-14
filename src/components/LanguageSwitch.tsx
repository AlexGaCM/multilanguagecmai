import i18n from "i18next";

export default function LanguageSwitch() {

  const languages = [
    {
      code: 'de',
      name: 'Deutsch',
      country_code: 'de'
    },
    {
      code: 'en',
      name: 'English',
      country_code: 'gb'
    },
    {
      code: 'fr',
      name: 'Français',
      country_code: 'fr'
    }
  ]

  return(
    <div className='group float-right text-sm rounded-lg p-2 mt-[10px] mr-6 cursor-pointer hover:bg-slate-900 hover:text-slate-400'>
      Language 🌐
      <div className='pt-2'>
        {languages.map(({ code, name, country_code }, index) =>
          <div
            key={index}
            className={'py text-center hidden hover:bg-slate-600 hover:text-white group-hover:block hidden'}
            onClick={() => i18n.changeLanguage(code)}
          >
            {" "} {name}
          </div>
        )}
      </div>
    </div>
  )
}