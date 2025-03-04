<script lang="ts">
    import { base } from "$service-worker"
    import RadioGroup from "@/components/RadioGroup.svelte"
    import type { PageProps } from "./$types"
    import { goto } from "$app/navigation"

    let { data }: PageProps = $props()

    let l1 = $state(false)
    let l2 = $state(false)
    let l3 = $state(false)
    let l4 = $state(false)
    let cleanl2 = $state(false)
    let cleanl3 = $state(false)
    let processor = $state(false)
    let net = $state(false)
    let source = $state(false)
    let ground = $state(false)
    let lollipop = $state(false)
    let algaeground = $state(false)
    let algaereefl3 = $state(false)
    let algaereefl2 = $state(false)
    let shallow = $state(false)
    let deep = $state(false)
    let drivetrain = $state("Swerve")
    let summary = $state("")

    let team_key = $state(data.team_key)

    let team_number = $state("3636") // TODO: make this changeable
    let event = "bb-2024" // TODO: get actual event

    let image_base64_strings = []
    function onFileSelected(e: any) {
        const image = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            const base64string = reader.result
                ?.toString()
                .replace("data:", "")
                .replace(/^.+,/, "")
            image_base64_strings.push(base64string)
        }
        reader.readAsDataURL(image)
    }

    function submit() {
        console.log("uwu owo uwu")
    function submit() {
        // TODO Submit data to endpoint here

        goto("/pit-scout/teamlist")
    }
</script>

<header
    class="font-heading flex flex-row justify-between border-b-2 border-white/10 p-2 text-lg font-semibold"
>
    <span>
        {team_key}
    </span>
    <span class="text-left"> Data Collection </span>
</header>
<<<<<<< HEAD
<div class="flex flex-col gap-4 p-4">
    <label
        class="w-full rounded bg-gunmetal p-4 text-center text-lg font-semibold"
    >
        <input class="hidden" onchange={onFileSelected} />
        Upload Images
    </label>
</div>
=======
>>>>>>> 64ea6caf12cd770d86f145ca67f53114f047fc8d

<div class="flex flex-col gap-2 p-2">
    <span class="font-heading text-xl font-semibold">DriveTrain</span>
    <RadioGroup labels={["Swerve", "Tank", "Other"]} bind:value={drivetrain} />
</div>

<span class="font-heading p-2 text-xl font-semibold">Coral Intaking</span>
<div class="m-2 grid grid-cols-2 gap-2 text-center text-white">
    <button
        class="flex h-56 items-center justify-center gap-1 p-2 text-2xl {source
            ? 'bg-xanthous'
            : 'bg-gunmetal'} rounded"
        onclick={() => {
            source = !source
        }}>Source</button
    >
    <button
        class="flex h-56 items-center justify-center gap-1 p-2 text-2xl {ground
            ? 'bg-xanthous'
            : 'bg-gunmetal'} rounded"
        onclick={() => {
            ground = !ground
        }}>Ground</button
    >
</div>

<span class="font-heading p-2 text-xl font-semibold">Coral Scoring</span>
<div class="m-2 grid grid-cols-2 gap-2 text-center text-white">
    <button
        class="flex h-56 items-center justify-center gap-1 p-2 text-2xl {l1
            ? 'bg-xanthous'
            : 'bg-gunmetal'} rounded"
        onclick={() => {
            l1 = !l1
        }}>L1</button
    >
    <button
        class="flex h-56 items-center justify-center gap-1 p-2 text-2xl {l2
            ? 'bg-xanthous'
            : 'bg-gunmetal'} rounded"
        onclick={() => {
            l2 = !l2
        }}>L2</button
    >
    <button
        class="flex h-56 items-center justify-center gap-1 p-2 text-2xl {l3
            ? 'bg-xanthous'
            : 'bg-gunmetal'} rounded"
        onclick={() => {
            l3 = !l3
        }}>L3</button
    >
    <button
        class="flex h-56 items-center justify-center gap-1 p-2 text-2xl {l4
            ? 'bg-xanthous'
            : 'bg-gunmetal'} rounded"
        onclick={() => {
            l4 = !l4
        }}>L4</button
    >
</div>

<span class="font-heading p-2 text-xl font-semibold">Algae Intaking</span>
<div class="m-2 grid grid-cols-2 gap-2 text-center text-white">
    <button
        class="flex h-56 items-center justify-center gap-1 p-2 text-2xl {algaereefl2
            ? 'bg-xanthous'
            : 'bg-gunmetal'} rounded"
        onclick={() => {
            algaereefl2 = !algaereefl2
        }}>L2</button
    >
    <button
        class="flex h-56 items-center justify-center gap-1 p-2 text-2xl {algaereefl3
            ? 'bg-xanthous'
            : 'bg-gunmetal'} rounded"
        onclick={() => {
            algaereefl3 = !algaereefl3
        }}>L3</button
    >
    <button
        class="flex h-56 items-center justify-center gap-1 p-2 text-2xl {algaeground
            ? 'bg-xanthous'
            : 'bg-gunmetal'} rounded"
        onclick={() => {
            algaeground = !algaeground
        }}>Ground</button
    >
    <button
        class="flex h-56 items-center justify-center gap-1 p-2 text-2xl {lollipop
            ? 'bg-xanthous'
            : 'bg-gunmetal'} rounded"
        onclick={() => {
            lollipop = !lollipop
        }}>Lollipop</button
    >
</div>

<span class="font-heading p-2 text-xl font-semibold">Algae Scoring</span>
<div class="m-2 grid grid-cols-2 gap-2 text-center text-white">
    <button
        class="flex h-56 items-center justify-center gap-1 p-2 text-2xl {cleanl2
            ? 'bg-xanthous'
            : 'bg-gunmetal'} rounded"
        onclick={() => {
            cleanl2 = !cleanl2
        }}>Clean L2</button
    >
    <button
        class="flex h-56 items-center justify-center gap-1 p-2 text-2xl {cleanl3
            ? 'bg-xanthous'
            : 'bg-gunmetal'} rounded"
        onclick={() => {
            cleanl3 = !cleanl3
        }}>Clean L3</button
    >
    <button
        class="flex h-56 items-center justify-center gap-1 p-2 text-2xl {processor
            ? 'bg-xanthous'
            : 'bg-gunmetal'} rounded"
        onclick={() => {
            processor = !processor
        }}>Processor</button
    >
    <button
        class="flex h-56 items-center justify-center gap-1 p-2 text-2xl {net
            ? 'bg-xanthous'
            : 'bg-gunmetal'} rounded"
        onclick={() => {
            net = !net
        }}>Net</button
    >
</div>

<span class="font-heading p-2 text-xl font-semibold">Climbing</span>
<div class="m-2 grid grid-cols-2 gap-2 text-center text-white">
    <button
        class="flex h-56 items-center justify-center gap-1 p-2 text-2xl {shallow
            ? 'bg-xanthous'
            : 'bg-gunmetal'} rounded"
        onclick={() => {
            shallow = !shallow
        }}>Shallow</button
    >
    <button
        class="flex h-56 items-center justify-center gap-1 p-2 text-2xl {deep
            ? 'bg-xanthous'
            : 'bg-gunmetal'} rounded"
        onclick={() => {
            deep = !deep
        }}
    >
        Deep
    </button>
</div>

<span class="font-heading p-2 text-xl font-semibold">Summary</span>
<div class="p-2">
    <textarea
        class="w-full flex-grow rounded bg-gunmetal p-2"
        placeholder="Single sentence summary here..."
        bind:value={summary}
    ></textarea>
<<<<<<< HEAD

    <button class="w-full rounded bg-gunmetal p-2 font-bold" onclick={submit}
        >Submit</button
=======
</div>

<div class="p-2">
    <button
        class="w-full rounded bg-gunmetal p-5 text-lg font-semibold"
        onclick={submit}>Submit</button
>>>>>>> 64ea6caf12cd770d86f145ca67f53114f047fc8d
    >
</div>
