import { Component, OnInit } from '@angular/core';
import { FormDesign } from 'src/app/form';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { PhenomenaService } from '../services/phenomena.service';
import { CampaignQuery } from 'src/app/models/campaign/campaign.query';
import { CampaignService } from 'src/app/models/campaign/campaign.service';
import { MapService } from 'src/app/modules/explore/services/map.service';

@Component({
  selector: 'osem-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  phenomena
  showMe:boolean = false;
  showMeTRY:string = "Funciona";
  model = new FormDesign();

  submitted = false;
  allCampaigns$ = this.campaignQuery.selectAll();

  onSubmit() {
              this.submitted = true;
            }

  constructor(private campaignQuery: CampaignQuery, private campaignservice: CampaignService, private phenomenaService: PhenomenaService, private uiService: UiService,
    private mapService: MapService) {}

  ngOnInit() {
     this.phenomena = this.phenomenaService.getPhenomena();
     this.campaignservice.get().subscribe();
     this.uiService.setFilterVisible(false);
     this.mapService.DrawControlMap();
     //this.uiService.setdrawmode(true);

    }

    ngOnDestroy(){
      //this.uiService.setdrawmode(false);
    }

  toogleTag(){
    this.showMe=!this.showMe;
    if(this.showMe == true){
      this.showMeTRY = "Point data";
      this.mapService.DrawControlMap();

    } else {
      this.showMeTRY = "";
     //this.mapService.generateMap('map');
      console.log("false", false)
    }
  }


}
