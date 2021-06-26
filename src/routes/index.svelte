<script>
  let text = ''

  async function addTodo(params) {
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
        text = ''
      } catch (error) {}
    }
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
