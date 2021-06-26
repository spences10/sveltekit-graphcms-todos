import { graphCmsClient } from '$lib/graphql-client'
import { gql } from 'graphql-request'

export async function post({ body }) {
  try {
    const { createTodo } = await graphCmsClient.request(
      gql`
        mutation AddTodo($todoName: String!) {
          createTodo(data: { todoName: $todoName, done: false }) {
            id
          }
        }
      `,
      { todoName: body.todoName }
    )

    await graphCmsClient.request(
      gql`
        mutation publishUpvote($id: ID!) {
          publishTodo(where: { id: $id }, to: PUBLISHED) {
            id
          }
        }
      `,
      { id: createTodo.id }
    )

    return {
      status: 200,
      body: {
        status: 'success',
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
export async function get(req) {}
export async function put(req) {}
export async function del(req) {}
