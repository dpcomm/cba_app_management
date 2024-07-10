export type StringSetter = (newLabel: string | ((prevLabel: string) => string)) => void;
export type BooleanSetter = (newValue: boolean | ((prevValue: boolean) => boolean)) => void;

export type Paging = {
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
};

export type NavInfo = {
  page: string;
  history: string[];
};

export enum Page {
  login = "login",
  home = "home",
  maintenance = "maintenance",
  notLogin = "not-login",
}

export type RadioItem = {
  value: number;
  text: string;
}
