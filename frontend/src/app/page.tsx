import { StoreFinderConfig } from "@/lib/definitions";
import dynamic from "next/dynamic";

const StoreFinder = dynamic(() => import("../components/store-finder"));

export default function Home({ config = {} }: { config: StoreFinderConfig }) {
  return <StoreFinder config={{
    ...config,
    apiKey: '4d5b7598-7ce4-4533-b0c0-f2147b175fd9',
    label: 'Vapiano',
    style: {
      mainColor: '#D40128',
    }
  }} />;
}
