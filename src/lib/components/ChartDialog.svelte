<script lang="ts">
    let { dialog = $bindable(), children }: { dialog: any; children: any } =
        $props()
</script>

<dialog
    class="border border-solid border-white bg-gunmetal p-2 drop-shadow-xl"
    bind:this={dialog}
    onclose={() => {}}
>
    {@render children?.()}
</dialog>
