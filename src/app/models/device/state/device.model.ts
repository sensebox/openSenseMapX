import { ID } from '@datorama/akita';

export interface Device {
    uri?: string;
    id?: string;
    label: string;
    image?: string;
    sensors?: String[];
  }
  