import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'osem-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  dummyCampaigns = [
    {
    "_id": "ajiodsdakjsdajkhdskjhad",
        "title": "Camp",
        "owner": "testowner",
        "aboutMe": "test",
        "campaignGoals": "goals",
        "campaignDetails": "details",
        "phenomena": "PM10"
    },
    {
    "_id": "ajiodsdakjsdajkhdskjhad",
        "title": "Camp",
        "owner": "owner",
        "aboutMe": "test",
        "campaignGoals": "goals",
        "campaignDetails": "details",
        "phenomena": "PM10"
    },
    {
    "_id": "ajiodsdakjsdajkhdskjhad",
        "title": "Camp",
        "owner": "owner",
        "aboutMe": "test",
        "campaignGoals": "goals",
        "campaignDetails": "details",
        "phenomena": "PM10"
    },
    {
      "_id": "ajiodsdakjsdajkhdskjhad",
          "title": "Camp",
          "owner": "owner",
          "aboutMe": "test",
          "campaignGoals": "goals",
          "campaignDetails": "details",
          "phenomena": "PM10"
    },
    {
      "_id": "ajiodsdakjsdajkhdskjhad",
          "title": "Camp",
          "owner": "owner",
          "aboutMe": "test",
          "campaignGoals": "goals",
          "campaignDetails": "details",
          "phenomena": "PM10"
    },
    {
      "_id": "ajiodsdakjsdajkhdskjhad",
          "title": "Camp",
          "owner": "owner",
          "aboutMe": "test",
          "campaignGoals": "goals",
          "campaignDetails": "details",
          "phenomena": "PM10"
    }]

  constructor() { }

  ngOnInit() {
  }

}
