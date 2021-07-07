import { graphCmsClient } from '$lib/graphql-client'
import { gql } from 'graphql-request'

export async function get(_req) {
  try {
    const { todos } = await graphCmsClient.request(gql`
      query TodoDone {
        todos(where: { done: true }) {
          todoName
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

export async function put({ body }) {
  try {
    const { updateTodo } = await graphCmsAuthClient.request(
      gql`
        mutation UpdateTodo($id: ID!, $done: Boolean!) {
          updateTodo(where: { id: $id }, data: { done: $done }) {
            id
          }
        }
      `,
      { id: body.id, done: body.done }
    )

    await graphCmsAuthClient.request(
      gql`
        mutation PublishTodo($id: ID!) {
          publishTodo(where: { id: $id }) {
            id
          }
        }
      `,
      { id: updateTodo.id }
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
