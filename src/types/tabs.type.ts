export type Tab = {
  active: boolean;
  url: string;
};

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

export type TabGroup = {
  collapsed: boolean;
  name: string;
  colour: TabGroupColours;
  tabs: Tab[];
};
