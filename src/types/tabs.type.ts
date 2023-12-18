export type Tab = {
	id: number;
	active: boolean;
	title: string;
	url: string;
	faviconUrl: string;
};

export type TabGroup = {
	id: number;
	collapsed: boolean;
	name: string;
	colour: TabGroupColours;
	tabs: Tab[];
	// Flags the list of tabs in the popout
	expanded: boolean;
};

export enum Colours {
	grey = 'bg-group-grey',
	blue = 'bg-group-blue',
	green = 'bg-group-green',
	red = 'bg-group-red',
	yellow = 'bg-group-yellow',
	orange = 'bg-group-orange',
	purple = 'bg-group-purple',
	pink = 'bg-group-pink',
	cyan = 'bg-group-cyan'
}

export enum TabGroupColours {
	grey = 'grey',
	blue = 'blue',
	green = 'green',
	red = 'red',
	yellow = 'yellow',
	orange = 'orange',
	purple = 'purple',
	pink = 'pink',
	cyan = 'cyan'
}
