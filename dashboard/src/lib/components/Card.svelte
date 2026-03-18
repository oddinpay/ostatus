<script lang="ts">
  import * as Item from "$lib/components/ui/item/index.js";
  import ShieldAlertIcon from "@lucide/svelte/icons/shield-alert";
  import Menu from "$lib/components/Menu.svelte";

  export let title: string;
  export let description: string;

</script>

<div class="flex w-full max-w-lg flex-col gap-6">
  <Item.Root class="bg-zinc-800 border-zinc-700" variant="outline">
    <Item.Media variant="icon">
      <ShieldAlertIcon />
    </Item.Media>
    <Item.Content>
      <Item.Title class="text-white">{title}</Item.Title>
      <Item.Description class="text-gray-400">
        {description}
      </Item.Description>
    </Item.Content>
    <Item.Actions>
      <Menu />
    </Item.Actions>
  </Item.Root>
</div>
