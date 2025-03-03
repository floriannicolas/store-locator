import '@/globals/react-select.css'
import { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'

export type PlaceOption = {
  label: string
  value: string
  location: {
    lat: number
    lng: number
  }
}

const PLACES: PlaceOption[] = [
  {
    location: {
      lat: 43.296482,
      lng: 5.36978,
    },
    value: 'marseille',
    label: 'Marseille',
  },
  {
    location: {
      lat: 48.856613,
      lng: 2.352222,
    },
    value: 'paris',
    label: 'Paris',
  },
  {
    location: {
      lat: 45.764042,
      lng: 4.835659,
    },
    value: 'lyon',
    label: 'Lyon',
  },
  {
    location: {
      lat: 43.604652,
      lng: 1.444209,
    },
    value: 'toulouse',
    label: 'Toulouse',
  },
]

const filterPlaces = (inputValue: string) => {
  return PLACES.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()))
}

const promiseOptions = (inputValue: string) =>
  new Promise<PlaceOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterPlaces(inputValue))
    }, 300)
  })

function SearchPlace({
  onSelect,
  forcedValue,
}: {
  onSelect: (option: PlaceOption | null) => void
  forcedValue: PlaceOption | null | undefined
}) {
  const [value, setValue] = useState<PlaceOption | null>()

  useEffect(() => {
    if (forcedValue === null) {
      setValue(null)
    }
  }, [forcedValue])

  return (
    <div className="mb-4">
      <AsyncSelect
        cacheOptions
        loadOptions={promiseOptions}
        onChange={(option) => {
          setValue(option)
          onSelect(option)
        }}
        value={value}
        noOptionsMessage={() => 'Aucun restaurant trouvé'}
        loadingMessage={() => 'Recherche...'}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: '#E6E6E6',
            primary50: '#CCCCCC',
            primary75: '#B3B3B3',
            primary: 'black',
          },
        })}
        placeholder="Rechercher un restaurant"
        className="w-full"
        menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
        menuPosition={'fixed'}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 60 }),
        }}
      />
    </div>
  )
}

export { SearchPlace }
