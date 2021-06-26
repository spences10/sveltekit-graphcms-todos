import { graphCmsClient } from '$lib/graphql-client'
import { gql } from 'graphql-request'

export async function get(_req) {
  try {
    const { todos } = await graphCmsClient.request(gql`
      {
        todos {
          id
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
        error: 'I oops! Sorry',
      },
    }
  }
}

export async function post({ body }) {
  try {
    const { id } = await graphCmsClient.request(
      gql`
        mutation AddTodo($todoName: String!) {
          createTodo(data: { todoName: $todoName, done: false }) {
            id
          }
        }
      `,
      { todoName: body.todoName }
    )

    return {
      status: 200,
      body: {
        id,
      },
    }
  } catch (error) {
    return {
      status: 500,
      body: {
        error: 'I oops! Sorry',
      },
    }
  }
}

// other CRUDs
export async function put(request) {}
export async function del(request) {}
