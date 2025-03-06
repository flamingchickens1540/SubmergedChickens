<script lang="ts">
    let { value = $bindable() }: { name: string; value: number } = $props()
</script>

<span class="font-heading text-xl font-semibold">Driver Skill</span>
<div class="grid grid-flow-col items-center justify-center py-2">
    {#each Array(value) as _, i}
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <!-- svelte-ignore event_directive_deprecated -->
        <button on:click={() => (value = i + 1)}>
            <svg
                width="80%"
                height="60"
                viewBox="0 0 45 45"
                class="m-auto shrink-0 fill-xanthous"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M22.3743 0.5L27.5381 16.3926H44.2486L30.7295 26.2148L35.8933 42.1074L22.3743 32.2852L8.85521 42.1074L14.019 26.2148L0.499968 16.3926H17.2104L22.3743 0.5Z"
                />
            </svg>
        </button>
    {/each}
    {#each Array(5 - value) as _, i}
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <!-- svelte-ignore event_directive_deprecated -->
        <button on:click={() => (value += i + 1)}>
            <svg
                width="80%"
                height="60"
                viewBox="0 0 45 45"
                class="m-auto shrink-0 fill-gunmetal"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M22.3743 0.5L27.5381 16.3926H44.2486L30.7295 26.2148L35.8933 42.1074L22.3743 32.2852L8.85521 42.1074L14.019 26.2148L0.499968 16.3926H17.2104L22.3743 0.5Z"
                />
            </svg>
        </button>
    {/each}
</div>
