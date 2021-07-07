<script context="module">
  export async function load({ page, session }) {
    if (page.path.includes('/todos') && session.user === '') {
      return {
        status: 302,
        redirect: '/',
      }
    }
    return { props: { user: session.user } }
  }
</script>

<script>
  import Header from '$lib/header.svelte'
  import ThemeSelect from '$lib/theme-select.svelte'
  import { onMount } from 'svelte'
  import { themeChange } from 'theme-change'
  import '../app.postcss'

  export let user

  onMount(async () => {
    themeChange(false)
  })
</script>

<main class="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
  <div class="flex justify-between mt-8 mb-12">
    <Header />
    <ThemeSelect />
  </div>
  <div>
    {#if user}
      <ul class="flex mb-4 space-x-5">
        <li>
          <a href="/todos">Active</a>
        </li>
        <li>
          <a href="/todos/done">Done</a>
        </li>
        <li>
          <a href="/logout">Logout</a>
        </li>
      </ul>
    {/if}
  </div>
  <slot />
</main>
