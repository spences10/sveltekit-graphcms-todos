import { graphCmsAuthClient } from '$lib/graphql-client'
import { gql } from 'graphql-request'

export async function post({ body }) {
  try {
    const { createTodo } = await graphCmsAuthClient.request(
      gql`
        mutation CreateTodo($todoName: String!) {
          createTodo(data: { todoName: $todoName, done: false }) {
            id
          }
        }
      `,
      { todoName: body.todoName }
    )

    await graphCmsAuthClient.request(
      gql`
        mutation PublishTodo($id: ID!) {
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

// other CRUDs
export async function get(req) {}
export async function del(req) {}
