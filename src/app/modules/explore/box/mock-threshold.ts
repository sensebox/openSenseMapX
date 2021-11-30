import { Threshold } from "./threshold"

export const THRESHOLDS: Threshold[] = [
      {
        "id": 1,
        "box": "aaaaaa",
        "sensor": "Temperature",
        "action": "over",
        "value": 30,
        "email": true
      },
      {
        "id": 1,
        "box": "aaaaaa",
        "sensor": "Rain",
        "action": "bellow",
        "value": 200,
        "email": true
      },
      {
        "id": 1,
        "box": "aaaaaa",
        "sensor": "UV",
        "action": "over",
        "value": 8,
        "email": false
      }
    ]