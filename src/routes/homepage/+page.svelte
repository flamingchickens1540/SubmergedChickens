<script lang="ts">
    import { browser } from "$app/environment"
    let username: string =
        (browser && window.localStorage.getItem("username")) || ""
</script>

<div class="flex h-dvh flex-col items-center justify-evenly">
    <h1 class="text-center text-5xl font-bold">
        Welcome, <br /><span class="text-yellow-400">{username}</span>
    </h1>
    <div class="flex flex-col gap-4">
        <a
            class="bg-gunmetal w-full rounded p-4 text-center text-2xl"
            href="/queue"
        >
            Scout
        </a>
        <a
            class="bg-gunmetal w-full rounded p-4 text-center text-2xl"
            href="/manual_scout"
        >
            Manual Scout
        </a>
    </div>
</div>
