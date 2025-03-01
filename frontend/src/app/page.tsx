import { StoreFinderConfig } from "@/lib/definitions";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const StoreFinder = dynamic(() => import("../components/store-finder"));

const VAPIANO_CONFIG = {
  apiKey: '4d5b7598-7ce4-4533-b0c0-f2147b175fd9',
  label: 'Vapiano',
  style: {
    mainColor: '#D40128',
  },
};

export default function Home() {
  const [config, setConfig] = useState<StoreFinderConfig | null>(VAPIANO_CONFIG);

  useEffect(() => {
    const windowWithConfig = window as unknown as Window & { 
      storeLocatoreConfig: StoreFinderConfig 
    };
    
    if ('storeLocatoreConfig' in windowWithConfig) {
      setConfig(windowWithConfig.storeLocatoreConfig);
    }
  }, []);

  if (!config) return null;

  return <StoreFinder config={config} />;
}
