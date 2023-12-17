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
                throw new Error("No trove storage found");
            }
        })
    }

    export async function saveGroups() {
        let tabs = await chrome.tabs.query({});
        let groupedTabs = groupBy(tabs, t => t.groupId);
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
                    return {
                        active: t.active,
                        url: t.url as string
                    }
                })
            }
            groups.push(tabGroup);
        }
        chrome.storage.sync.set({
            trove: {
                groups: groups,
            }
        })
    }

    export function clearGroups() {
        chrome.storage.sync.clear();
    }

    getGroupsFromStorage();
</script>

<div class="h-48">
    {#each groups as group}
    <div class="px-2 py-2">
        <div class="{Colours[group.colour]} w-2/3 border rounded">
            <h2 class="text-xl mx-2">{group.name}</h2>
        </div>
        <div class="gap-4 mx-8 my-2">
            {#each group.tabs as tab}
                <div>
                    <p>{tab.url}</p>
                </div>
            {/each}
        </div>
    </div>
    {/each}
</div>