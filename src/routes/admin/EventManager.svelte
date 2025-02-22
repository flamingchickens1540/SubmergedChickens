<script lang="ts">
    import * as DropdownMenu from "@/components/ui/dropdown-menu/index"
    let {
        selection = $bindable(),
        tba_event_keys,
    }: { selection: string; tba_event_keys: string[] } = $props()

    async function load_event() {
        const res = await fetch("/api/eventKey/", {
            method: "POST",
            body: JSON.stringify({ event_key: selection }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        selection = "Event Key"

        const verify = await fetch("/api/eventKey", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async res => await res.json())
        console.log(verify)
    }

    const disabled = $derived(
        selection == "Event Key" ? "opacity-30 pointer-events-none" : ""
    )
</script>

<div class="grid gap-2 rounded bg-gunmetal p-2">
    <button
        onclick={load_event}
        class="pointer rounded bg-eerie_black {disabled}">Load Event</button
    >
    <DropdownMenu.Root>
        <DropdownMenu.Trigger class="rounded bg-eerie_black"
            >{selection}</DropdownMenu.Trigger
        >
        <DropdownMenu.Content class="bg-gunmetal text-white">
            <DropdownMenu.Group>
                <DropdownMenu.GroupHeading
                    class="select-none"
                    onclick={() => {
                        selection = "Event Key"
                    }}>Event Key</DropdownMenu.GroupHeading
                >
                <DropdownMenu.Separator />
                {#each tba_event_keys as event}
                    <DropdownMenu.Item
                        onclick={() => {
                            selection = event
                        }}>{event}</DropdownMenu.Item
                    >
                {/each}
            </DropdownMenu.Group>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</div>
