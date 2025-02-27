<script lang="ts">
    import * as DropdownMenu from "@/components/ui/dropdown-menu"

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

    let search = $state("")

    const event_keys = $derived(tba_event_keys.filter(key => key.match(search)))

    const disabled = $derived(
        selection == "Event Key" ? "opacity-30 pointer-events-none" : ""
    )
</script>

<div class="grid gap-2 rounded bg-gunmetal p-2">
    <button
        onclick={load_event}
        class="pointer rounded bg-eerie_black {disabled}">Load Event</button
    >
    <!-- <Combobox options={tba_event_keys} bind:selection /> -->
    <DropdownMenu.Root>
        <DropdownMenu.Trigger class="rounded bg-eerie_black"
            >{selection}</DropdownMenu.Trigger
        >
        <DropdownMenu.Content class="bg-gunmetal text-white">
            <DropdownMenu.Group class="h-80 overflow-y-scroll">
                <DropdownMenu.GroupHeading
                    class="select-none"
                    onclick={() => {
                        selection = "Event Key"
                    }}
                    ><input
                        class="h-full w-full rounded bg-gunmetal text-center outline-none"
                        bind:value={search}
                    /></DropdownMenu.GroupHeading
                >
                <DropdownMenu.Separator />
                {#each event_keys as event}
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
