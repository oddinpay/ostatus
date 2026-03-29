<script lang="ts">
  import "../app.css";
  import "@fontsource-variable/inter";
  import { PUBLIC_CONVEX_URL } from "$env/static/public";
  import { setupConvex } from "convex-svelte";
  let { children } = $props();
  setupConvex(PUBLIC_CONVEX_URL);
  import { Toaster } from "svelte-sonner";
</script>

<Toaster closeButton position="top-center" />

{@render children?.()}
