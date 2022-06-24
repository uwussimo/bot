export interface Response {
  "ip": string;
  "port": number;
  "debug": {
    "ping": boolean;
    "query": boolean;
    "srv": boolean;
    "querymismatch": boolean;
    "ipinsrv": boolean;
    "cnameinsrv": boolean;
    "animatedmotd": boolean;
    "cachetime": number;
    "apiversion": number;
  };
  "motd": {
    "raw": string[];
    "clean": string[];
    "html": string[];
  };
  "players": {
    "online": number;
    "max": number;
  };
  "version": string;
  "online": boolean;
  "protocol": number;
  "hostname": string;
  "icon": string;
  "software": string;
  "map": string;
}
