<script lang="ts">
    import { X } from "lucide-svelte"
    let avatar: string
    let fileinput: HTMLInputElement
    let images: string[] = $state([])
    let team_number = $state("1540")

    const onFileSelected = (e: any) => {
        const files = e.target.files
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader()
            reader.readAsDataURL(files[i])
            reader.onload = () => {
                avatar = reader.result as string
                images = [...images, avatar]
            }
        }
    }

    function removeImage(index: number) {
        images = images.filter((_, i) => i !== index)
    }
</script>

<header
    class="font-heading flex flex-row justify-between border-b-2 border-white/10 p-2 text-lg font-semibold"
>
    <span>
        {team_number}
    </span>
    <span class="text-left"> Image Collection </span>
</header>

<div class="p-2">
    {#if images.length !== 0}
        {#each images as image, n}
            <div class="relative p-2">
                <div class="flex justify-center">
                    <img class="avatar" src={image} alt="upload" />
                </div>
                <button
                    onclick={() => removeImage(n)}
                    class="absolute right-0 top-0"
                >
                    <div class="rounded-full bg-red-500 p-1">
                        <X class="text-white" />
                    </div>
                </button>
            </div>
        {/each}
    {/if}
    <button
        onclick={() => fileinput.click()}
        class="w-full rounded bg-gunmetal p-5 text-lg font-semibold"
    >
        Upload Image
    </button>

    <input
        class="hidden"
        type="file"
        accept=".jpg, .jpeg, .png"
        multiple
        onchange={e => onFileSelected(e)}
        bind:this={fileinput}
    />

    <button class="mt-2 w-full rounded bg-gunmetal p-5 text-lg font-semibold">
        Submit
    </button>
</div>
