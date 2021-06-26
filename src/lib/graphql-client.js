import { GraphQLClient } from 'graphql-request'
import { API_TOKEN, API_URL } from './endpoint'

export const graphCmsClient = new GraphQLClient(API_URL, {
  headers: {},
})

export const graphCmsAuthClient = new GraphQLClient(API_URL, {
  headers: {
    authorization: `Bearer ${API_TOKEN}`,
  },
})
