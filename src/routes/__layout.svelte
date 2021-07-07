<script context="module">
  export async function load({ page, session }) {
    if (page.path.includes('/todos') && session.user === '') {
      return {
        status: 302,
        redirect: '/',
      }
    }
    return { props: {} }
  }
</script>

<script>
  import Header from '$lib/header.svelte'
  import ThemeSelect from '$lib/theme-select.svelte'
  import { onMount } from 'svelte'
  import { themeChange } from 'theme-change'
  import '../app.postcss'

  onMount(async () => {
    themeChange(false)
  })
</script>

<main class="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
  <div class="flex justify-between mt-8 mb-12">
    <Header />
    <ThemeSelect />
  </div>
  <slot />
</main>
