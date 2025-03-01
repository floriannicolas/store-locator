import { Client } from '@/payload-types'
import type { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'label',
  },
  auth: {
    useAPIKey: true,
    disableLocalStrategy: true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
  ],
  endpoints: [
    {
      path: '/stores',
      method: 'get',
      handler: async (req) => {
        const client = req.user as Client
        const clientId = client.id
        const lat = Number(req.searchParams.get('lat'))
        const lng = Number(req.searchParams.get('lng'))
        const radius = Number(req.searchParams.get('radius') || 20)
        const page = Number(req.searchParams.get('page') || 1)
        const limit = Number(req.searchParams.get('limit') || 50)

        const storesResponse = await req.payload.find({
          collection: 'store',
          where: {
            client: {
              equals: clientId,
            },
            ...(lat &&
              lng && {
                'location.coordinates': {
                  near: [lng, lat, radius * 1000],
                },
              }),
          },
          sort: lat && lng ? 'location.coordinates' : undefined,
          page,
          limit,
        })

        return Response.json(storesResponse)
      },
    },
  ],
}
