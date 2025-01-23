<script lang="ts">
    import { browser } from "$app/environment"
    let username: string =
        (browser && window.localStorage.getItem("username")) || ""
</script>

<div class="flex h-dvh flex-col items-center justify-evenly">
    <h1 class="text-center text-5xl font-bold text-white">
        Welcome, <br /><span class="text-yellow-400">{username}</span>
    </h1>
    <div class="flex flex-col gap-4 text-white">
        <a
            class="w-full rounded bg-gunmetal p-4 text-center text-2xl"
            href="/queue"
        >
            Scout
        </a>
        <a
            class="w-full rounded bg-gunmetal p-4 text-center text-2xl"
            href="/manual_scout"
        >
            Manual Scout
        </a>
    </div>
</div>
