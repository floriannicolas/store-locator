import '@/globals/styles.css'
import { useMediaQuery } from 'usehooks-ts'
import { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Store, StoreFinderConfig } from '@/lib/definitions'
import { getStores } from '@/lib/actions'
import { delay } from '@/lib/delay'
import Loader from '@/components/ui/loader'
import { StoreSchedules } from '@/components/store-locator/components/store-schedules'
import { PlaceOption, SearchPlace } from '@/components/store-locator/components/search-place'
import StoreButton from '@/components/store-locator/components/store-button'

export default function StoreLocator() {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearch, setHasSearch] = useState(false)
  const [tab, setTab] = useState('')
  const [isGeolocationRefused, setIsGeolocationRefused] = useState(false)
  const [showPopover, setShowPopover] = useState(false)
  const [stores, setStores] = useState<Store[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const [searchValue, setSearchValue] = useState<PlaceOption | null>()
  const isWindowMd = useMediaQuery('(min-width: 768px)')
  const [config, setConfig] = useState<StoreFinderConfig | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const windowWithConfig = window as unknown as Window & {
      myliStoreLocatorConfig: StoreFinderConfig
    }

    if ('myliStoreLocatorConfig' in windowWithConfig) {
      setConfig(windowWithConfig.myliStoreLocatorConfig)
    }
  }, [])

  if (!config || !mounted) {
    return null
  }

  const handleHidePopover = () => {
    setShowPopover(false)
    setTab('')
  }

  const handleShowPopover = async (newTab: string) => {
    if (showPopover) {
      setShowPopover(false)
      await delay(200)
    }
    if (newTab !== tab) {
      setTab(newTab)
      setShowPopover(true)
    } else {
      setTab('')
    }
  }

  const handleGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          fetchStores({ lat: latitude, lng: longitude })
          setSearchValue(null)
        },
        (error) => {
          console.error('Error getting location:', error)
          setIsGeolocationRefused(true)
        },
      )
    } else {
      console.error('Geolocation is not supported by this browser')
      setIsGeolocationRefused(true)
    }
  }

  const fetchStores = async (options: { lat: number; lng: number }) => {
    if (!config.apiKey) {
      return
    }

    setIsLoading(true)
    const newStores = await getStores(config.apiKey, {
      lat: options.lat,
      lng: options.lng,
    })
    setStores(newStores)
    setIsLoading(false)
    setHasSearch(true)
  }

  return (
    <>
      <div
        onClick={handleHidePopover}
        className={`${showPopover ? '' : 'hidden'} z-30 fixed inset-0 z-[110000000] w-full h-screen bg-white/90`}
      />
      <section
        ref={sectionRef}
        className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-1 p-1 bg-white z-[110000200] md:relative md:gap-3 md:py-3"
        style={{
          backgroundColor: isWindowMd ? config?.style?.mainColor : 'white',
        }}
      >
        <StoreButton
          mainColor={config?.style?.mainColor}
          onClick={() => {
            handleShowPopover('on-site')
          }}
        >
          Sur place
        </StoreButton>
        <StoreButton
          mainColor={config?.style?.mainColor}
          onClick={() => {
            handleShowPopover('take-away')
          }}
        >
          À Emporter
        </StoreButton>
        <StoreButton
          mainColor={config?.style?.mainColor}
          onClick={() => {
            handleShowPopover('delivery')
          }}
        >
          Livraison
        </StoreButton>
        <div
          className={`${showPopover ? '' : 'hidden'} transition-opacity absolute rounded-md border p-4 shadow-md outline-hidden w-full max-w max-w-3xl left-1/2 -translate-x-1/2 bg-white bottom-full md:bottom-auto md:top-full md-mt-1 max-h-[calc(100vh-84px)] overflow-y-auto z-50`}
        >
          <Button className="w-full" onClick={handleGeolocation}>
            {isGeolocationRefused ? (
              <>Géolocalisation refusée</>
            ) : (
              <>Voir les {config.label} près de chez vous</>
            )}
          </Button>
          <div className="text-center">ou</div>
          <SearchPlace
            onSelect={(option: PlaceOption | null) => {
              if (!option) {
                return
              }
              fetchStores({ lat: option.location.lat, lng: option.location.lng })
              setSearchValue(option)
            }}
            forcedValue={searchValue}
          />

          {isLoading && <Loader />}
          {!isLoading && stores.length > 0 && (
            <div className="mt-4">
              <label className="text-xl">Voici les restaurants à proximité :</label>
              <ul>
                {stores.map((store, index) => (
                  <li
                    key={store.id}
                    className="py-4 text-sm"
                    style={{
                      ...(index < stores.length - 1 && {
                        borderBottom: `1px solid ${config?.style?.mainColor}`,
                      }),
                    }}
                  >
                    <div>
                      <span className="font-medium text-lg">{store.label} - </span>{' '}
                      <a
                        style={{ color: config?.style?.mainColor }}
                        target="_blank"
                        href={store.websiteUrl}
                      >
                        Voir le site internet
                      </a>
                    </div>
                    <StoreSchedules store={store} />
                    <div>
                      <span className="font-bold">Réservation :</span> {store.reservationRule}
                    </div>
                    <div>
                      <span className="font-bold">Adresse :</span> {store.location.street},{' '}
                      {store.location.city}
                    </div>
                    <Button asChild className="w-full mt-2" style={{ backgroundColor: '#04A3FF' }}>
                      <a target="_blank" href={store.location.googleMapUrl}>
                        Calculez l&apos;Itinéraire en 1 clic
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!isLoading && hasSearch && stores.length === 0 && <div>Aucun restaurant trouvé</div>}
        </div>
      </section>
    </>
  )
}
