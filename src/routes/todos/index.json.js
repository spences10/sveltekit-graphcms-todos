import { graphCmsClient } from '$lib/graphql-client'
import { gql } from 'graphql-request'

export async function get(_req) {
  try {
    const { todos } = await graphCmsClient.request(gql`
      {
        todos {
          id
          todoName
          done
        }
      }
    `)

    return {
      status: 200,
      body: {
        todos,
      },
    }
  } catch (error) {
    return {
      status: 500,
      body: {
        error: 'Big oof! Sorry',
      },
    }
  }
}

// other CRUDs
export async function post(req) {}
export async function put(req) {}
export async function del(req) {}
