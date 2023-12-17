import { type Tab, type TabGroup, TabGroupColours } from "../types/tabs.type";

chrome.runtime.onStartup.addListener(async () => {
  let groups: TabGroup[] = await setupStorage();
  // need to figure out a way to display these correctly, this works for creating the group
  // await createDefaultTabGroup();
  await createTabGroups(groups);
});

function setupStorage(): Promise<TabGroup[]> {
  return new Promise((resolve) => {
    chrome.storage.sync.get("trove", (res) => {
      let groups: TabGroup[] = [];
      if (res.trove) {
        groups = res.trove.groups;
      } else {
        chrome.storage.sync.set({
          trove: {
            groups: [],
          },
        });
      }
      resolve(groups);
    });
  });
}

// Handles the creation of a new tab group for chrome startup pages
async function createDefaultTabGroup() {
  let tabs = await chrome.tabs.query({});
  let tabIds: number[] = tabs.map((tab) => tab.id as number);
  let groupId: number = await chrome.tabs.group({ tabIds: tabIds });

  chrome.tabGroups.update(groupId, {
    collapsed: false,
    title: "Default",
    color: TabGroupColours.grey,
  });
}

async function createTabGroups(groups: TabGroup[]) {
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
