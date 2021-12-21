import { Component, OnInit } from '@angular/core';
import { FormDesign } from 'src/app/form';
import { CampaignQuery } from 'src/app/models/campaign/campaign.query';
import { CampaignService } from 'src/app/models/campaign/campaign.service';
@Component({
  selector: 'osem-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  phenomena = ['Air temperature',
               'Noise level',
               'PM10',
               'PM2.5'
              ];

  startDate: Date = new Date("2019-05-27");
  endDate: Date = new Date("2019-05-28");

  model = new FormDesign(1,
                          'Sound measurement campaign',
                          'I am retired and new in this neighbourhood.',
                          'My campaign goals are sound levels in my street.',
                          'I do not have speific details about my campaign.',
                          this.startDate,
                          this.endDate,
                          this.phenomena[0],
                          )

  submitted = false;
  allCampaigns$ = this.campaignQuery.selectAll();

  onSubmit() {
              this.submitted = true;
            }

  constructor(private campaignQuery: CampaignQuery, private campaignservice: CampaignService) {

   }

  ngOnInit() {
     this.campaignservice.get().subscribe(); 

  }

}
