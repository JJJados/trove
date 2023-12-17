chrome.runtime.onStartup.addListener(async () => {
  let tabs = await chrome.tabs.query({});
  let tabIds: number[] = tabs.map((tab) => tab.id as number);
  let groupId: number = await chrome.tabs.group({ tabIds: tabIds });
  chrome.tabGroups.update(groupId, {
    collapsed: false,
    title: "this was made from trove",
    color: "blue",
  });
});
