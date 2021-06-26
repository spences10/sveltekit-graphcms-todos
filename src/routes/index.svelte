<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/todos.json')
    if (res.ok) {
      const { todos } = await res.json()

      return {
        props: { todos },
      }
    }

    const { message } = await res.json()

    return {
      error: new Error(message),
    }
  }
</script>

<script>
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

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the
  documentation
</p>

<input
  type="text"
  placeholder="Enter a todo!"
  bind:value={text}
  class="border"
/>
<button on:click={addTodo}>Add todo</button>

<ul>
  {#each todos as { id, todoName, done }}
    <li>
      <a href={`/todos/${id}`}>{todoName}</a><input
        type="checkbox"
        bind:checked={done}
        on:change={todoDone({ id, done })}
      />
    </li>
  {/each}
</ul>
