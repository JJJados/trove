import type { StorageStructure } from '../types/storage.type';
import type { TabGroup } from '../types/tabs.type';

export async function getStorageData(): Promise<StorageStructure> {
	return new Promise((resolve) => {
		chrome.storage.sync.get('trove', (res) => {
			resolve(res.trove);
		});
	});
}

export async function saveGroupsToStorage(
	tabGroups: TabGroup[],
	resync: boolean,
	cleared: boolean
): Promise<void> {
	await chrome.storage.sync.set({
		trove: {
			groups: tabGroups,
			resync: resync,
			cleared: cleared
		}
	});
}
