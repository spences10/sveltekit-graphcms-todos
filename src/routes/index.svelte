<script context="module">
  export async function load({ session }) {
    return {
      props: { user: session.user },
    }
  }
</script>

<script>
  export let user
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
