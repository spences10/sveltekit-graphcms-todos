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

<h1>SvelteKit GraphCMS Todos</h1>

<div class="form-control">
  <input
    type="text"
    placeholder="Enter a todo!"
    bind:value={text}
    class="input input-bordered mb-4"
  />
  <button on:click={addTodo} class="btn btn-primary mb-6"
    >Add todo</button
  >
</div>

<ul>
  {#each todos as { id, todoName, done }}
    <div class="p-6 my-4 card bordered">
      <div class="form-control">
        <label for={id} class="label">
          <a href={`/todos/${id}`}>{todoName}</a>
          <div>
            <input
              {id}
              type="checkbox"
              bind:checked={done}
              on:change={todoDone({ id, done })}
              class="checkbox checkbox-primary"
            />
            <span class="checkbox-mark" />
          </div>
        </label>
      </div>
    </div>
  {/each}
</ul>
