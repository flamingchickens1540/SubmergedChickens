<script lang="ts">
    import { goto } from "$app/navigation"
</script>

<div class="flex min-h-dvh flex-col items-center justify-center gap-4 p-6">
    <div class="font-heading p-2 text-4xl font-bold text-yellow-400">
        No available teams yet
    </div>
    <button
        class="rounded bg-gunmetal px-4 py-2 text-center text-xl"
        onclick={() => goto("/home")}>Return Home</button
    >
</div>
