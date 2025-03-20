<script lang="ts">
    import { ClipboardList } from "lucide-svelte"
    import { Camera } from "lucide-svelte"

    import { goto } from "$app/navigation"
    import type { PageProps } from "./$types"
    let { data }: PageProps = $props()
</script>

<header
    class="font-heading flex flex-row justify-between border-b-2 border-white/10 p-2 text-lg font-semibold"
>
    <button class="rounded bg-gunmetal p-2" onclick={() => goto("/home")}
        >Return Home</button
    >
    <span class="self-center">Manual Scouting</span>
</header>

<div class="flex flex-col gap-1 p-2">
    {#each data.teams as team}
        <div
            class="flex w-full flex-row items-center justify-between rounded bg-gunmetal p-4 text-xl"
        >
            <span>{team.number}</span>
            <div class="flex flex-row gap-4">
                <button
                    class="flex items-center gap-2 p-1"
                    onclick={() => goto(`/pit-scout/image?team=${team.number}`)}
                >
                    <Camera
                        class="h-8 w-8 {team.images
                            ? 'text-xanthous'
                            : 'text-white'}"
                    />
                </button>
                <button
                    class="flex items-center space-x-2 px-1 py-1"
                    onclick={() =>
                        goto(`/pit-scout/collect?team=${team.number}`)}
                >
                    <ClipboardList
                        class="size-8 {team.data
                            ? 'text-xanthous'
                            : 'text-white'}"
                    />
                </button>
            </div>
        </div>
    {/each}
</div>
