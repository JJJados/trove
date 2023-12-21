<script lang="ts">
	import groupBy from '../lib/groupBy';
	import { getStorageData, saveGroupsToStorage } from '../lib/storage';
	import { type Tab, type TabGroup, TabGroupColours, Colours } from '../types/tabs.type';

	let groups: TabGroup[] = [];
	let numExpandedGroups: number = 0;
	$: expandedGroups = () => numExpandedGroups;

	let setupGroups: Promise<void> = setGroups();

	chrome.storage.onChanged.addListener((changes, namespace) => {
		if (changes.trove.newValue) {
			groups = changes.trove.newValue.groups;
		} else {
			groups = [];
		}
	});

	async function setGroups() {
		let data = await getStorageData();
		if (data) {
			groups = data.groups;
			if (data.resync) {
				groups = await saveTabGroups();
			}
		}
	}

	async function setActiveLink(tab: Tab) {
		await chrome.tabs.update(tab.id, { active: true });
	}

	function expandTabGroup(group: TabGroup) {
		if (group.expanded) {
			numExpandedGroups--;
		} else {
			numExpandedGroups++;
		}
		group.expanded = !group.expanded;
	}

	export async function saveTabGroups(): Promise<TabGroup[]> {
		let tabs = await chrome.tabs.query({});
		let tabsGroupedByGroupId = groupBy(tabs, (t) => t.groupId);
		let tabGroups: TabGroup[] = [];

		for (let groupId in tabsGroupedByGroupId) {
			if (groupId === '-1') {
				continue;
			}

			let group = await chrome.tabGroups.get(Number(groupId));
			let tabGroup: TabGroup = {
				id: group.id,
				collapsed: group.collapsed,
				name: group.title as string,
				colour: TabGroupColours[group.color],
				expanded: true,
				tabs: tabsGroupedByGroupId[groupId].map((t) => {
					return {
						id: t.id as number,
						active: t.active,
						title: t.title as string,
						url: t.url as string,
						faviconUrl: t.favIconUrl as string
					};
				})
			};

			tabGroups.push(tabGroup);
		}

		await saveGroupsToStorage(tabGroups, false);
		return tabGroups;
	}

	export function clearTabGroups() {
		chrome.storage.sync.set({
			trove: {
				groups: [],
				resync: false
			}
		});
	}
</script>

<div class="my-2 px-3 rounded py-2 mx-1">
	{#await setupGroups}
		<h1>Loading...</h1>
	{/await}
	{#if groups.length === 0}
		<h1>No groups saved.</h1>
	{/if}
	{#each groups as group}
		<div class="flex flex-col">
			<button
				on:click={() => expandTabGroup(group)}
				title="{group.name} - {group.tabs.length} tab(s)"
				class="flex flex-row justify-between {Colours[
					group.colour
				]} w-full border rounded-lg border-slate-900 shadow-slate-900 shadow transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300"
			>
				<h2 class="mx-2 font-bold text-slate-900">{group.name}</h2>
				<h3 class="mx-2 font-bold text-slate-900">{group.tabs.length}</h3>
			</button>
			{#key numExpandedGroups}
				<ul class="gap-2 mx-4 my-1">
					{#if group.expanded}
						<ul class="gap-2 my-2">
							{#each group.tabs as tab}
								<a
									href="#{tab.title}"
									on:click={() => setActiveLink(tab)}
									title="Set as active tab"
								>
									<li class="flex flex-row mb-2 gap-2 hover:underline underline-offset-4">
										<img src={tab.faviconUrl} alt="tab favicon" class="w-4 h-4" />
										<p id={tab.title}>{tab.title}</p>
									</li>
								</a>
							{/each}
						</ul>
					{/if}
				</ul>
			{/key}
		</div>
	{/each}
</div>
