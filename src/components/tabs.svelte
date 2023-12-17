<script lang="ts">
    import { type Tab, type TabGroup, TabGroupColours, Colours } from "../types/tabs.type";
    let groups: TabGroup[] = [];
    let newGroupName: string = "";
    let newGroupColour: TabGroupColours = TabGroupColours.grey;
    let newTabUrl: string = "";

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (changes.trove.newValue) {
            groups = changes.trove.newValue.groups;
        } else {
            groups = [];
        }
    });

    function newTabGroup () {

        let newGroup: TabGroup = {
            collapsed: false,
            name: newGroupName,
            colour: newGroupColour,
            tabs: [{active: false, url: newTabUrl}]
        }
        groups.push(newGroup);
        chrome.storage.sync.set({
            trove: {
                groups: groups,
            }
        })
    }

    function getTroveStorage() {
        chrome.storage.sync.get("trove", (res) => {
            if (res.trove) {
                groups = res.trove.groups;
            } else {
                throw new Error("No trove storage found");
            }
        })
    }

    async function createTroveGroups(groups: TabGroup[]) {
        for (let group of groups) {
            let tabIds: number[] = [];
            for (let tab of group.tabs) {
            let t = await chrome.tabs.create({ active: tab.active, url: tab.url });
            tabIds.push(t.id as number);
            }
            let groupId: number = await chrome.tabs.group({ tabIds: tabIds });
            chrome.tabGroups.update(groupId, {
            collapsed: false,
            title: group.name,
            color: group.colour,
            });
        }
    }

    function clearTroveStorage() {
        chrome.storage.sync.clear();
    }

    getTroveStorage();
</script>

<div class="flex flex-col">
    <h1>trove</h1>
    <input type="text" placeholder="New Group Name" bind:value={newGroupName} />
    <div>
        <input type="radio" id="redGroup" bind:value={newGroupColour}/>
        <label for="redGroup">Grey</label>
    </div>
    <input type="text" placeholder="New Tab URL" bind:value={newTabUrl}/>
    <button on:click={newTabGroup} class="border-red-800 border">Add a new tab group</button>
    <button on:click={getTroveStorage} class="border-red-800 border">Get trove storage</button>
    <button on:click={async () => createTroveGroups(groups)} class="border-red-800 border">create trove storage</button>
    <button on:click={clearTroveStorage} class="border-red-800 border">Clear trove storage</button>
    {#each groups as group}
        <div class="{Colours[group.colour]}">
            <h2>{group.name}</h2>
            <h2>{Colours[group.colour]}</h2>
            <div>
                {#each group.tabs as tab}
                    <div>
                        <p>{tab.url}</p>
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>