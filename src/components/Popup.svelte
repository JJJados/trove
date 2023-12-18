<script lang="ts">
	import TabGroups from './TabGroups.svelte';
	let tabGroups: any;
</script>

<div class="flex flex-col w-64 h-auto bg-white text-slate-900 dark:bg-dark dark:text-white">
	<div class="flex flex-row justify-between px-4 py-2 border-b-2 border-white border-opacity-5">
		<h1 class="text-xl">trove</h1>
	</div>
	<TabGroups bind:this={tabGroups} />
	<div class="flex flex-row py-2 px-4 gap-1 border-t-2 border-white border-opacity-5">
		<button
			on:click={() => {
				tabGroups.saveTabGroups();
			}}
			title="Save Groups"
		>
			<img src="../save-white.svg" alt="save" class="w-6 h-6" />
		</button>
		<button
			on:click={() => {
				tabGroups.clearTabGroups();
			}}
			title="Clear Groups"
		>
			<img src="../delete-white.svg" alt="save" class="w-6 h-6" />
		</button>
	</div>
</div>
