<script lang="ts">
    let { show_modal = $bindable(), header, children } = $props()

    let dialog: HTMLDialogElement | undefined = $state()

    $effect(() => {
        if (show_modal) dialog!.showModal()
        else dialog!.close()
    })
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
    bind:this={dialog}
    onclose={() => (show_modal = false)}
    onclick={e => {
        if (e.target === dialog) dialog!.close()
    }}
>
    <div class="h-full w-full rounded bg-eerie_black">
        {@render header?.()}
        {@render children?.()}
    </div>
</dialog>

<style>
    dialog {
        max-width: 36rem;
        border-radius: 0.25rem;
        border: none;
        padding: none;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    button {
        display: block;
    }
</style>
