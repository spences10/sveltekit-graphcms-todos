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

<p>
  {todo.todoName}
</p>
<p>
  {todo.done}
</p>
