export type Tab = {
  active: boolean;
  url: string;
};

export type TabGroup = {
  collapsed: boolean;
  name: string;
  colour: TabGroupColours;
  tabs: Tab[];
};

export enum Colours {
  grey = "bg-group-grey",
  blue = "#1a73e8",
  green = "#0f9d58",
  red = "#db4437",
  yellow = "#f4b400",
  orange = "#fbbc04",
  purple = "#ab47bc",
  pink = "#e91e63",
  cyan = "#00acc1",
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
