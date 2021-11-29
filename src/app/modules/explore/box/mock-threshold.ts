import { Threshold } from "./threshold"

export const THRESHOLDS: Threshold[] = [
      {
        "id": 1,
        "sensor": "Temperature",
        "action": "more than",
        "value": 30,
        "email": true
      },
      {
        "id": 1,
        "sensor": "Rain",
        "action": "less than",
        "value": 200,
        "email": true
      },
      {
        "id": 1,
        "sensor": "UV",
        "action": "more than",
        "value": 8,
        "email": false
      }
    ]