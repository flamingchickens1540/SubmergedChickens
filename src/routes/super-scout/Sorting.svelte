<script lang="ts">
    import Sortable from "sortablejs"
    import { onMount } from "svelte"

    let { alliance }: { alliance: string } = $props()

    let lowEl: HTMLDivElement
    let midEl: HTMLDivElement
    let topEl: HTMLDivElement
    let teamsEl: HTMLDivElement

    onMount(() => {
        ;[lowEl, midEl, topEl, teamsEl].forEach(el => {
            new Sortable(el, {
                group: "shared",
                animation: 150,
                fallbackOnBody: true,
                forceFallback: true,
                swapThreshold: 1,
            })
        })
    })

    function limitTeams(el: HTMLDivElement) {
        el.addEventListener("add", (event: any) => {
            if (el.children.length > 2) {
                event.from.insertBefore(
                    event.item,
                    event.from.children[event.oldIndex]
                )
            }
        })
    }

    onMount(() => {
        ;[lowEl, midEl, topEl, teamsEl].forEach(el => {
            const sortable = new Sortable(el, {
                group: "shared",
                animation: 150,
                fallbackOnBody: true,
                forceFallback: true,
                swapThreshold: 1,
            })

            if (el !== teamsEl) {
                limitTeams(el)
            }
        })
    })
</script>

<div class="flex h-[62px] w-full gap-2">
    <div
        id="low"
        bind:this={lowEl}
        class="flex h-[16] flex-1 flex-row space-x-2 bg-gunmetal p-2"
    ></div>
    <div
        id="mid"
        bind:this={midEl}
        class="flex h-[16] flex-1 flex-row space-x-2 bg-gunmetal p-2"
    ></div>
    <div
        id="top"
        bind:this={topEl}
        class="flex h-[16] flex-1 flex-row space-x-2 bg-gunmetal p-2"
    ></div>
</div>

<div
    id="teams"
    bind:this={teamsEl}
    class="mt-2 flex h-[58px] w-full gap-2 bg-gunmetal"
>
    <div
        id="team1"
        class="flex h-12 flex-1 items-center justify-center bg-xanthous text-lg font-semibold"
    >
        <span>Team 1</span>
    </div>
    <div
        id="team2"
        class="flex h-12 flex-1 items-center justify-center bg-xanthous text-lg font-semibold"
    >
        <span>Team 2</span>
    </div>
    <div
        id="team3"
        class="flex h-12 flex-1 items-center justify-center bg-xanthous text-lg font-semibold"
    >
        <span>Team 3</span>
    </div>
</div>
