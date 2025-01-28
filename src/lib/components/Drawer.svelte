<script lang="ts">
    let {
        children,
        displaying = $bindable(),
        bg = "bg-eerie_black",
    }: {
        displaying: boolean
        bg: String
    } = $props()
</script>

<div
    class="fixed inset-0 transition-all will-change-transform {displaying
        ? 'backdrop-blur'
        : 'translate-y-full'}"
    onclick={(e: Event) => {
        if (e.target === e.currentTarget) {
            displaying = false
        }
    }}
>
    <div
        class="no-scrollbar absolute inset-x-0 bottom-0 flex max-h-[80svh] min-h-[40svh] w-dvw flex-col items-center gap-2 overflow-y-scroll rounded-t-lg {bg} p-2 text-white"
    >
        {#if children}
            {@render children()}
        {:else}
            <p>Nothing here :3</p>
        {/if}
    </div>
</div>
