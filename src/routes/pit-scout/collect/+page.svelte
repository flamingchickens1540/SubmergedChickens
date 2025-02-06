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
<div class="flex flex-col gap-4 p-4">
    <label
        class="w-full rounded bg-gunmetal p-4 text-center text-lg font-semibold"
    >
        <input class="hidden" />
        Upload Images
    </label>
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

<span class="font-heading text-xl font-semibold">Capablilites</span>
<div class="m-2 grid grid-cols-2 gap-2 text-center text-white">
    <button
        class="flex h-56 gap-1 p-2 {l1 ? 'bg-green-500' : ''} rounded"
        onclick={() => {
            l1 = !l1
        }}>L1</button
    >
    <button
        class="flex h-56 gap-1 p-2 {l2 ? 'bg-green-500' : ''} rounded"
        onclick={() => {
            l2 = !l2
        }}>L2</button
    >
    <button
        class="flex h-56 gap-1 p-2 {l3 ? 'bg-green-500' : ''} rounded"
        onclick={() => {
            l3 = !l3
        }}>L3</button
    >
    <button
        class="flex h-56 gap-1 p-2 {l4 ? 'bg-green-500' : ''} rounded"
        onclick={() => {
            l4 = !l4
        }}>L4</button
    >
    <button
        class="flex h-56 gap-1 p-2 {clean ? 'bg-green-500' : ''} rounded"
        onclick={() => {
            clean = !clean
        }}>Clean</button
    >
    <button
        class="flex h-56 gap-1 p-2 {processor ? 'bg-green-500' : ''} rounded"
        onclick={() => {
            processor = !processor
        }}>Processor</button
    >
    <button
        class="flex h-56 gap-1 p-2 {net ? 'bg-green-500' : ''} rounded"
        onclick={() => {
            net = !net
        }}>Net</button
    >
    <button
        class="flex h-56 gap-1 p-2 {source ? 'bg-green-500' : ''} rounded"
        onclick={() => {
            source = !source
        }}>Source</button
    >
    <button
        class="flex h-56 gap-1 p-2 {ground ? 'bg-green-500' : ''} rounded"
        onclick={() => {
            ground = !ground
        }}>Ground</button
    >
    <button
        class="flex h-56 gap-1 p-2 {reef ? 'bg-green-500' : ''} rounded"
        onclick={() => {
            reef = !reef
        }}>Reef</button
    >
    <button
        class="flex h-56 gap-1 p-2 {shallow ? 'bg-green-500' : ''} rounded"
        onclick={() => {
            shallow = !shallow
        }}>Shallow</button
    >
    <button
        class="flex h-56 gap-1 p-2 {deep ? 'bg-green-500' : ''} rounded"
        onclick={() => {
            deep = !deep
        }}
    >
        Deep
    </button>
</div>

<div class="p-2">
    <textarea
        class="border-red w-full flex-grow rounded bg-eerie_black p-2"
        placeholder="bug description"
    ></textarea>

    <button class="w-full rounded bg-gunmetal p-2 font-bold">Submit</button>
</div>
