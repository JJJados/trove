import type { TabGroup } from './tabs.type';

export type StorageStructure = {
	groups: TabGroup[];
	resync: boolean;
	cleared: boolean;
};
