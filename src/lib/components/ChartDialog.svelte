<script lang="ts">
    let { dialog = $bindable(), children}: { dialog:any, children: any} = $props()
</script>
<dialog class="bg-gunmetal border border-solid border-white p-2 drop-shadow-xl content-center justify-center" bind:this={dialog} onclose={()=>{}}>
    {@render children?.()}
</dialog>
