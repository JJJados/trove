<script lang="ts">
	import TabGroups from './TabGroups.svelte';
	let tabGroups: any;
</script>

<div class="bg-gradient-to-r from-group-purple via-group-blue to-group-green p-[2px]">
	<div class="flex flex-col w-64 h-auto bg-white text-slate-900 dark:bg-dark dark:text-white py-2">
		<div class="flex flex-row justify-between px-4">
			<h1 class="text-xl">trove</h1>
			<div>
				<button
					on:click={() => {
						tabGroups.saveTabGroups();
					}}
					title="Save groups"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
						/>
					</svg>
				</button>
				<button
					on:click={() => {
						tabGroups.clearTabGroups();
					}}
					title="Clear groups"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
			</div>
		</div>
		<TabGroups bind:this={tabGroups} />
	</div>
</div>
