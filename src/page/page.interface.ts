export interface Page {
  id: number;
  html: string;
  url: string[];
  name: string;
  condition: string;
  fragments: Record<string, FragmentConfig>;
}

export enum FragmentConfig {
  STATIC,
  CLIENT_ASYNC,
  WAITED,
  PRIMARY,
}
