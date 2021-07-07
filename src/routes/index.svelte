<script context="module">
  export async function load({ fetch, session }) {
    const res = await fetch('/todos.json')
    if (res.ok) {
      const { todos } = await res.json()

      return {
        props: { todos, user: session.user },
      }
    }

    const { message } = await res.json()

    return {
      error: new Error(message),
    }
  }
</script>

<script>
  export let user
  export let todos
  let text = ''

  async function addTodo() {
    if (text !== '') {
      try {
        const todo = {
          todoName: text,
          done: false,
        }
        await fetch('/todos', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(todo),
        })
        fetchTodos()
        text = ''
      } catch (error) {}
    }
  }

  async function todoDone(id, done) {
    try {
      await fetch('/todos', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(id, done),
      })
      fetchTodos()
    } catch (error) {}
  }

  async function fetchTodos() {
    const res = await fetch('/todos.json')
    const jsonRes = await res.json()
    todos = jsonRes.todos
  }
</script>

{#if user}
  <h2 class="mb-5 text-2xl text-gray-900">Welcome {user}</h2>
  <a href="/logout">
    <button
      class="rounded-lg font-bold bg-purple-700 shadow-md text-white mb-5 py-2 px-8"
      >Logout</button
    >
  </a>
{:else}
  <h2 class="mb-5 text-2xl text-gray-900">You're logged out</h2>
  <a href="/login">
    <button
      class="rounded-lg font-bold bg-purple-700 shadow-md text-white mb-5 py-2 px-8"
      >Login using Github</button
    >
  </a>
{/if}

