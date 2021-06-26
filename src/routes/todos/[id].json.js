import { graphCmsClient } from '$lib/graphql-client'
import { gql } from 'graphql-request'

export async function get(req) {
  const id = req.params.id
  try {
    const query = gql`
      query GetTodo($id: ID!) {
        todo(where: { id: $id }) {
          id
          todoName
          done
        }
      }
    `
    const variables = { id }

    const { todo } = await graphCmsClient.request(query, variables)

    return {
      status: 200,
      body: {
        todo,
      },
    }
  } catch (error) {
    return {
      status: 500,
      body: {
        error: 'Big oof! I sorry',
      },
    }
  }
}

// other CRUDs
export async function post(request) {}
export async function put(request) {}
export async function del(request) {}
