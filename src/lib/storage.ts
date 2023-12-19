import type { StorageStructure } from '../types/storage.type';
import type { TabGroup } from '../types/tabs.type';

export async function getStorageData(): Promise<StorageStructure> {
	return new Promise((resolve) => {
		chrome.storage.sync.get('trove', (res) => {
			resolve(res.trove);
		});
	});
}

export async function saveGroupsToStorage(tabGroups: TabGroup[], resync: boolean): Promise<void> {
	await chrome.storage.sync.set({
		trove: {
			groups: tabGroups.sort((a, b) => (a.tabs.length > b.tabs.length ? -1 : 1)),
			resync: resync
		}
	});
}
