export type Tab = {
  active: boolean;
  title: string;
  url: string;
  faviconUrl: string;
};

export type TabGroup = {
  collapsed: boolean;
  name: string;
  colour: TabGroupColours;
  tabs: Tab[];
};

export enum Colours {
  grey = "bg-group-grey",
  blue = "bg-group-blue",
  green = "bg-group-green",
  red = "bg-group-red",
  yellow = "bg-group-yellow",
  orange = "bg-group-orange",
  purple = "bg-group-purple",
  pink = "bg-group-pink",
  cyan = "bg-group-cyan",
}

export enum TabGroupColours {
  grey = "grey",
  blue = "blue",
  green = "green",
  red = "red",
  yellow = "yellow",
  orange = "orange",
  purple = "purple",
  pink = "pink",
  cyan = "cyan",
}
