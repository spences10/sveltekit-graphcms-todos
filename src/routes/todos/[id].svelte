<script context="module">
  export async function load({ fetch, page }) {
    const res = await fetch(`/todos/${page.params.id}.json`)

    if (res.ok) {
      const { todo } = await res.json()
      return {
        props: { todo },
      }
    }

    const { message } = await res.json()

    return {
      error: new Error(message),
    }
  }
</script>

<script>
  export let todo
</script>

<div class="p-4 my-4 card bordered">
  <div class="form-control">
    <label for={todo.id} class="label">
      <div class="text-2xl">{todo.todoName}</div>
      <div>
        <input
          id={todo.id}
          type="checkbox"
          bind:checked={todo.done}
          class="checkbox checkbox-primary"
        />
        <span class="checkbox-mark" />
      </div>
    </label>
  </div>
</div>
