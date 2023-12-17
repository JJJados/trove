<script lang="ts">
    import groupBy from "../lib/groupBy";
    import { type Tab, type TabGroup, TabGroupColours, Colours } from "../types/tabs.type";

    let groups: TabGroup[] = [];

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (changes.trove.newValue) {
            groups = changes.trove.newValue.groups;
        } else {
            groups = [];
        }
    });

    function getGroupsFromStorage() {
        chrome.storage.sync.get("trove", (res) => {
            if (res.trove) {
                groups = res.trove.groups;
            } else {
                // Should handle this better ie. banner displaying restart Chrome
                throw new Error("No trove storage found");
            }
        })
    }

    export async function saveTabGroups() {
        let tabs = await chrome.tabs.query({});
        let groupedTabs = groupBy(tabs, t => t.groupId);
        let newGroups: TabGroup[] = [];
        for (let groupId in groupedTabs) {
            if (groupId === "-1") {
                continue;
            }
            let group = await chrome.tabGroups.get(Number(groupId));
            let tabGroup: TabGroup = {
                collapsed: group.collapsed,
                name: group.title as string,
                colour: TabGroupColours[group.color],
                tabs: groupedTabs[groupId].map(t => {
                    console.log(t)
                    return {
                        active: t.active,
                        title: t.title as string,
                        url: t.url as string,
                        faviconUrl: t.favIconUrl as string,
                    }
                })
            }
            newGroups.push(tabGroup);
        }
        
        let groups = newGroups;
        chrome.storage.sync.set({
            trove: {
                groups: newGroups,
            }
        })
    }

    export function clearTabGroups() {
        chrome.storage.sync.clear();
    }

    getGroupsFromStorage();
</script>

<div class="my-2">
    {#each groups as group}
    <div class="px-4 py-1">
        <div class="flex flex-row justify-between {Colours[group.colour]} w-9/12 border rounded-lg border-slate-900 shadow-slate-900 shadow">
            <h2 class="mx-2 font-bold text-slate-900">{group.name}</h2>
            <h3 class="mx-2 font-bold text-slate-900">{group.tabs.length} tabs</h3>
        </div>
        <ul class="gap-2 mx-4 my-2">
            {#each group.tabs as tab}
                <li class="flex flex-row mb-2 gap-2 underline underline-offset-4">
                    <img src={tab.faviconUrl} alt="tab favicon" class="w-4 h-4"/>
                    <p>{tab.title}</p>
                </li>
            {/each}
        </ul>
    </div>
    {/each}
</div>