<script lang="ts">
    import "../app.css"
    let { children } = $props()
</script>

{@render children()}

<style lang="postcss">
    :global(body) {
        @apply bg-eerie_black font-sans text-white accent-xanthous;
    }
</style>
