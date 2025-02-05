<script lang="ts">
    const robot_one = "2910"
    const robot_two = "1540"

    const category = "defense"

    let one_is_better = $state(false)
</script>

<div class="m-2 grid grid-cols-2 gap-2 text-center text-white">
    <div class="col-span-2">
        Please select the robot better at {category}
    </div>
    <button
        class="{one_is_better ? 'bg-green-500' : 'bg-gunmetal'} h-96 rounded"
        onclick={() => (one_is_better = true)}>{robot_one}</button
    >
    <button
        class="{one_is_better ? 'bg-gunmetal' : 'bg-green-500'} rounded"
        onclick={() => (one_is_better = false)}>{robot_two}</button
    >
    <button class="col-span-2 h-24 rounded bg-gunmetal">Submit</button>
</div>
