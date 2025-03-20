<script>
    import { goto } from "$app/navigation"
    import { localStore } from "@/localStore.svelte"

    let team_key = $state("")
    let match = $state("")
    let event = $state(localStore("event_key", ""))
    let color = $state("")

    let disabled = $derived(
        team_key === "" || match === "" || event.value === "" || color === ""
            ? "pointer-events-none opacity-30"
            : ""
    )
</script>

<header
    class="font-heading flex flex-row justify-between border-b-2 border-white/10 p-2 text-lg font-semibold"
>
    <button class="rounded bg-gunmetal p-2" onclick={() => goto("/home")}
        >Return Home</button
    >
    <span class="self-center">Manual Scouting</span>
</header>

<div class="m-2 flex flex-col gap-2">
    <textarea
        class="w-full rounded bg-gunmetal p-4"
        placeholder="Team Number"
        bind:value={team_key}
    ></textarea>

    <textarea
        class="w-full rounded bg-gunmetal p-4"
        placeholder="Match Key"
        bind:value={match}
    ></textarea>

    <textarea
        class="w-full rounded bg-gunmetal p-4"
        placeholder="Event Key"
        bind:value={event.value}
    ></textarea>

    <select
        name="color"
        bind:value={color}
        class="col-span-2 block w-full rounded bg-gunmetal p-4"
    >
        <option selected value="">Select a color</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
    </select>

    <button
        class="w-full rounded bg-gunmetal p-4 text-lg font-semibold {disabled}"
        onclick={() =>
            goto(
                `/match-scout/prematch?match=${match}&team=${team_key}&color=${color}`
            )}>Scout</button
    >
</div>
