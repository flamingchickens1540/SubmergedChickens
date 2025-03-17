<script lang="ts">
    import RadioGroup from "@/components/RadioGroup.svelte"
    import type { PageProps } from "./$types"
    import { goto } from "$app/navigation"

    let { data }: PageProps = $props()

    let l1 = $state(data.coralScoreL1 || false)
    let l2 = $state(data.coralScoreL2 || false)
    let l3 = $state(data.coralScoreL3 || false)
    let l4 = $state(data.coralScoreL4 || false)
    let cleanl2 = $state(data.cleanScoreL2 || false)
    let cleanl3 = $state(data.cleanScoreL3 || false)
    let processor = $state(data.algaeScoreProcessor || false)
    let net = $state(data.algaeScoreNet || false)
    let source = $state(data.coralIntakeSource || false)
    let ground = $state(data.coralIntakeGround || false)
    let lollipop = $state(data.algaeIntakeLollipop || false)
    let algaeground = $state(data.algaeIntakeGround || false)
    let algaereefl3 = $state(data.algaeIntakeL3 || false)
    let algaereefl2 = $state(data.algaeIntakeL2 || false)
    let shallow = $state(data.shallowClimb || false)
    let deep = $state(data.deepClimb || false)
    let drivetrain = $state(data.drivetrain || "Swerve")
    let summary = $state(data.summary || "")

    let team_key = $state(data.team_key)

    function submit() {
        // TODO Submit data to endpoint here
        fetch("/api/submitTeamEvent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                team_key,
                event_key: data.event_key,
                l1,
                l2,
                l3,
                l4,
                cleanl2,
                cleanl3,
                processor,
                net,
                source,
                ground,
                lollipop,
                algaeground,
                algaereefl3,
                algaereefl2,
                shallow,
                deep,
                drivetrain,
                summary,
            }),
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    goto("/pit-scout/teamlist")
                } else {
                    console.error("Submission failed")
                }
            })
            .catch(error => {
                console.error("Error:", error)
            })

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
</div>

<div class="p-2">
    <button
        class="w-full rounded bg-gunmetal p-5 text-lg font-semibold"
        onclick={submit}>Submit</button
    >
</div>
