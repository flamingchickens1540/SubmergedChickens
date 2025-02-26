<script>
    import { goto } from "$app/navigation"

    let team_key = $state("")
    let match = $state("")
    let color = $state("")
</script>

<header
    class="font-heading grid place-items-center border-b-2 border-white/10 p-2 text-lg font-semibold"
>
    <span>Manual Scout</span>
</header>

<div class="m-2 flex flex-col gap-2">
    <textarea
        class="w-full rounded bg-gunmetal p-4"
        placeholder="Team Number"
        bind:value={team_key}
    ></textarea>

    <textarea
        class="w-full rounded bg-gunmetal p-4"
        placeholder="Event Key"
        bind:value={match}
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
        class="w-full rounded bg-gunmetal p-4 text-lg font-semibold"
        onclick={() =>
            goto(
                `/match-scout/prematch?match=${match}&team=${team_key}&color=${color}`
            )}>Scout</button
    >
</div>
