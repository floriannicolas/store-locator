"use server";

import { Store, StoreResponse } from "./definitions";

const API_URL = "http://localhost:3000/api/clients/stores";

type SearchStoreParams = {
    lat?: number;
    lng?: number;
}

export async function getStores(apiKey: string, params: SearchStoreParams = {}): Promise<Store[]> {
    const url = new URL(API_URL);
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