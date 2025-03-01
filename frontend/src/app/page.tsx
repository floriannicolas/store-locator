import dynamic from "next/dynamic";

const StoreFinder = dynamic(() => import("../components/store-finder"));

export default function Home() {
  return <StoreFinder />;
}
