import { Store, StoreResponse } from "./definitions";

type SearchStoreParams = {
    lat?: number;
    lng?: number;
}

export async function getStores(apiKey: string, params: SearchStoreParams = {}): Promise<Store[]> {
    const url = new URL(`${import.meta.env.VITE_API_URL}/api/clients/stores`);
    if (params.lat && params.lng) {
        url.searchParams.append("lat", params.lat.toString());
        url.searchParams.append("lng", params.lng.toString());
    }
    const call = await fetch(url, {
        headers: {
          Authorization: `clients API-Key ${apiKey}`,
        },
      })
    const response = await call.json() as StoreResponse;

    return response.docs;
}