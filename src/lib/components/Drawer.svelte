<script lang="ts">
    import type { Snippet } from "svelte"

    let {
        children,
        displaying = $bindable(),
        bg = "bg-eerie_black",
        gap = "gap-2",
        p = "p-2",
        text = "text-white",
        max_h = "max-h-[80svh]",
        // NOTE I don't like there being empty space
        min_h = "min-h-[0svh]",
        scrollbar = false,
    }: {
        children?: Snippet<[]>
        displaying: boolean
        bg?: string
        gap?: string
        p?: string
        text?: string
        max_h?: string
        min_h?: string
        scrollbar?: boolean
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
        class="{!scrollbar
            ? 'no-scrollbar'
            : ''} absolute inset-x-0 bottom-0 flex {min_h} {max_h} w-dvw flex-col items-center {gap} overflow-y-scroll rounded-t-lg {bg} {p} {text}"
    >
        {#if children}
            {@render children()}
        {:else}
            <p>Nothing here :3</p>
        {/if}
    </div>
</div>
