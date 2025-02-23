<script>
	export let dialog
</script>
<dialog class="bg-gunmetal border border-solid border-white p-2 drop-shadow-xl content-center justify-center" bind:this={dialog} on:close>
	<slot/>
</dialog>
