import { calculateDistanceInKm } from '@/utils/distance'
import type { CollectionConfig } from 'payload'

export const Stores: CollectionConfig = {
  slug: 'store',
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients',
      required: true,
    },
    {
      name: 'websiteUrl',
      type: 'text',
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'coordinates',
          type: 'point',
        },
        {
          name: 'street',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'postalCode',
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
        },
        {
          name: 'googleMapUrl',
          type: 'text',
        },
      ],
    },
    {
      name: 'reservationRule',
      type: 'text',
    },
    {
      name: 'openingHours',
      type: 'group',
      fields: [
        {
          name: 'monday',
          type: 'group',
          fields: [
            {
              name: 'isClosed',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'openTime',
              type: 'text',
              admin: {
                condition: (data, sibling) => !sibling?.isClosed,
              },
            },
            {
              name: 'closeTime',
              type: 'text',
              admin: {
                condition: (data, sibling) => !sibling?.isClosed,
              },
            },
          ],
        },
        {
          name: 'tuesday',
          type: 'group',
          fields: [
            {
              name: 'isClosed',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'openTime',
              type: 'text',
              admin: {
                condition: (data, sibling) => !sibling?.isClosed,
              },
            },
            {
              name: 'closeTime',
              type: 'text',
              admin: {
                condition: (data, sibling) => !sibling?.isClosed,
              },
            },
          ],
        },
        {
          name: 'wednesday',
          type: 'group',
          fields: [
            {
              name: 'isClosed',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'openTime',
              type: 'text',
              admin: {
                condition: (data, sibling) => !sibling?.isClosed,
              },
            },
            {
              name: 'closeTime',
              type: 'text',
              admin: {
                condition: (data, sibling) => !sibling?.isClosed,
              },
            },
          ],
        },
        {
          name: 'thursday',
          type: 'group',
          fields: [
            {
              name: 'isClosed',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'openTime',
              type: 'text',
              admin: {
                condition: (data, sibling) => !sibling?.isClosed,
              },
            },
            {
              name: 'closeTime',
              type: 'text',
              admin: {
                condition: (data, sibling) => !sibling?.isClosed,
              },
            },
          ],
        },
        {
          name: 'friday',
          type: 'group',
          fields: [
            {
              name: 'isClosed',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'openTime',
              type: 'text',
              admin: {
                condition: (data, sibling) => !sibling?.isClosed,
              },
            },
            {
              name: 'closeTime',
              type: 'text',
              admin: {
                condition: (data, sibling) => !sibling?.isClosed,
              },
            },
          ],
        },
        {
          name: 'saturday',
          type: 'group',
          fields: [
            {
              name: 'isClosed',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'openTime',
              type: 'text',
              admin: {
                condition: (data, sibling) => !sibling?.isClosed,
              },
            },
            {
              name: 'closeTime',
              type: 'text',
              admin: {
                condition: (data, sibling) => !sibling?.isClosed,
              },
            },
          ],
        },
        {
          name: 'sunday',
          type: 'group',
          fields: [
            {
              name: 'isClosed',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'openTime',
              type: 'text',
              admin: {
                condition: (data, sibling) => !sibling?.isClosed,
              },
            },
            {
              name: 'closeTime',
              type: 'text',
              admin: {
                condition: (data, sibling) => !sibling?.isClosed,
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterRead: [
      async ({ doc, query }) => {
        const nearCoordinatesQuery = query?.and?.find(
          (rule: { 'location.coordinates'?: { near?: unknown } }) =>
            rule['location.coordinates']?.near,
        )

        if (nearCoordinatesQuery) {
          const [docLng, docLat] = doc.location?.coordinates || []
          const [lng, lat] = nearCoordinatesQuery['location.coordinates'].near
          if (lat && lng && docLat && docLng) {
            doc.location.distance = calculateDistanceInKm(Number(lat), Number(lng), docLat, docLng)
          }
        }

        return doc
      },
    ],
  },
}
