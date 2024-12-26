<script lang="ts">
    const { data } = $props()
</script>

{#each data.posts as post}
    <article>
        <h1 class="text-3xl">{post.title}</h1>
        <p class="text-gray-800">{post.content}</p>
        <br />
    </article>
{/each}
