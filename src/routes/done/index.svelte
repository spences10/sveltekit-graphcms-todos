<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/done.json')
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

  async function todoDone(id, done) {
    try {
      await fetch('/done', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(id, done),
      })
      fetchdone()
    } catch (error) {}
  }

  async function fetchdone() {
    const res = await fetch('/done.json')
    const jsonRes = await res.json()
    todos = jsonRes.todos
  }
</script>

<ul>
  {#each todos as { id, todoName, done }}
    <div class="p-4 my-4 card bordered">
      <div class="form-control">
        <label for={id} class="label">
          <a href={`/todos/${id}`} class="text-2xl">{todoName}</a>
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
