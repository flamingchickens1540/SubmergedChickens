<script lang="ts">
    import { goto } from "$app/navigation"
    let username = $state("")

    $effect(() => {
        localStorage.setItem("username", username)
    })
</script>

<div class="mt-2 grid place-items-center gap-4">
    <input
        bind:value={username}
        placeholder="Username"
        class="rounded p-2 outline"
    />

    <button onclick={() => goto("/queue")} class="rounded p-2 outline"
        >Match Scout</button
    >
</div>
