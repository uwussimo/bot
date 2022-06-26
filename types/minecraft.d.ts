export interface User {
  id: string;
  name: string;
}

export interface Content {
  version: {
    name: string;
    protocol: number;
  };
  players: {
    online: number;
    max: number;
    sample: User[] | null;
  };
  motd: {
    raw: string;
    clean: string;
    html: string;
  };
  favicon: string;
  srcRecord: string | null;
  roundTripLatency: number;
}

export interface Response {
  status: boolean;
  content: Content;
}
