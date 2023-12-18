<script lang="ts">
	import { slide } from 'svelte/transition';
	import groupBy from '../lib/groupBy';
	import { type Tab, type TabGroup, TabGroupColours, Colours } from '../types/tabs.type';

	let groups: TabGroup[] = [];
	let numExpandedGroups: number = 0;
	$: expandedGroups = () => numExpandedGroups;

	chrome.storage.onChanged.addListener((changes, namespace) => {
		if (changes.trove.newValue) {
			groups = changes.trove.newValue.groups;
		} else {
			groups = [];
		}
	});

	function getGroupsFromStorage() {
		chrome.storage.sync.get('trove', (res) => {
			if (res.trove) {
				groups = res.trove.groups;
			}
		});
	}

	function expandTabGroup(group: TabGroup) {
		if (group.expanded) {
			numExpandedGroups--;
		} else {
			numExpandedGroups++;
		}
		group.expanded = !group.expanded;
	}

	function setActiveLink(tab: Tab) {
		chrome.tabs.update(tab.id, { active: true });
	}

	export async function saveTabGroups() {
		let tabs = await chrome.tabs.query({});
		let groupedTabs = groupBy(tabs, (t) => t.groupId);
		let newGroups: TabGroup[] = [];
		for (let groupId in groupedTabs) {
			if (groupId === '-1') {
				continue;
			}
			let group = await chrome.tabGroups.get(Number(groupId));
			let tabGroup: TabGroup = {
				id: group.id,
				collapsed: group.collapsed,
				name: group.title as string,
				colour: TabGroupColours[group.color],
				expanded: false,
				tabs: groupedTabs[groupId].map((t) => {
					return {
						id: t.id as number,
						active: t.active,
						title: t.title as string,
						url: t.url as string,
						faviconUrl: t.favIconUrl as string
					};
				})
			};
			newGroups.push(tabGroup);
		}

		groups = newGroups;
		chrome.storage.sync.set({
			trove: {
				groups: newGroups
			}
		});
	}

	export function clearTabGroups() {
		chrome.storage.sync.clear();
	}

	getGroupsFromStorage();
</script>

<div class="my-4 px-4">
	{#if groups.length === 0}
		<h1>No groups saved.</h1>
	{/if}
	{#each groups as group}
		<div>
			<button
				on:click={() => expandTabGroup(group)}
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
