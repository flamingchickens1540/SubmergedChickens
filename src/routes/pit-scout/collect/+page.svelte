<script>
    let l1 = $state(false)
    let l2 = $state(false)
    let l3 = $state(false)
    let l4 = $state(false)
    let clean = $state(false)
    let processor = $state(false)
    let net = $state(false)
    let source = $state(false)
    let ground = $state(false)
    let reef = $state(false)
    let shallow = $state(false)
    let deep = $state(false)

    let drivetrain = $state("None")
    let drivetrainTypes = ["Swerve", "Tank", "Other"]

    let team_number = $state("3636") // TODO: make this changeable
    let event = "bb-2024" // TODO: get actual event
</script>

<header
    class="font-heading flex flex-row justify-between border-b-2 border-white/10 p-2 text-lg font-semibold"
>
    <span>
        {team_number}
    </span>
    <span class="align-right">
        {event}
    </span>

</header>
<div class="flex flex-grow flex-col gap-4 p-4">
    <button class="mt-auto rounded bg-gunmetal p-2 text-lg font-semibold">
        Upload Image
    </button>
</div>

<div class="flex flex-col gap-2 p-2">
    <span class="font-heading text-xl font-semibold">DriveTrain</span>
    {#each drivetrainTypes as drivetrainType}
        <label class="mx-1">
            <input
                type="radio"
                name="end action"
                value={drivetrainType}
                bind:group={drivetrain}
            />
            {drivetrainType.replace(/([A-Z])/g, " $1").trim()}
        </label>
    {/each}
</div>

<div class="flex flex-col gap-2 p-2">
    <span class="font-heading text-xl font-semibold">Capablilites</span>
    <label class="flex gap-1 p-2">
        <input type="checkbox" bind:checked={l1} />
        <span class="font-heading text-lg font-semibold">L1</span>
    </label>
    <label class="flex gap-1 p-2">
        <input type="checkbox" bind:checked={l2} />
        <span class="font-heading text-lg font-semibold">L2</span>
    </label>
    <label class="flex gap-1 p-2">
        <input type="checkbox" bind:checked={l3} />
        <span class="font-heading text-lg font-semibold">L3</span>
    </label>
    <label class="flex gap-1 p-2">
        <input type="checkbox" bind:checked={l4} />
        <span class="font-heading text-lg font-semibold">L4</span>
    </label>
    <label class="flex gap-1 p-2">
        <input type="checkbox" bind:checked={clean} />
        <span class="font-heading text-lg font-semibold">Clean</span>
    </label>
    <label class="flex gap-1 p-2">
        <input type="checkbox" bind:checked={processor} />
        <span class="font-heading text-lg font-semibold">Processor</span>
    </label>
    <label class="flex gap-1 p-2">
        <input type="checkbox" bind:checked={net} />
        <span class="font-heading text-lg font-semibold">Net</span>
    </label>
    <label class="flex gap-1 p-2">
        <input type="checkbox" bind:checked={source} />
        <span class="font-heading text-lg font-semibold">Source</span>
    </label>
    <label class="flex gap-1 p-2">
        <input type="checkbox" bind:checked={ground} />
        <span class="font-heading text-lg font-semibold">Ground</span>
    </label>
    <label class="flex gap-1 p-2">
        <input type="checkbox" bind:checked={reef} />
        <span class="font-heading text-lg font-semibold">Reef</span>
    </label>
    <label class="flex gap-1 p-2">
        <input type="checkbox" bind:checked={shallow} />
        <span class="font-heading text-lg font-semibold">Shallow</span>
    </label>
    <label class="flex gap-1 p-2">
        <input type="checkbox" bind:checked={deep} />
        <span class="font-heading text-lg font-semibold">Deep</span>
    </label>
</div>

<!-- TODO: notes section here -->

<!-- TODO: submit button here -->
