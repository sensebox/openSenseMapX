import { Component, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import { GridComponent, GridColumn, DataAdapter, Smart } from '@smart-webcomponents-angular/grid';
import { GetData } from './../../../../assets/data/data';
import { NotificationsQuery } from 'src/app/models/notifications/state/notifications.query';
import { NotificationsService } from 'src/app/models/notifications/state/notifications.service';
  
@Component({
    selector: 'osem-profile-followed-boxes',
    templateUrl: './profile-followed-boxes.component.html',
    styleUrls: ['./profile-followed-boxes.component.scss'],
})

export class ProfileFollowedBoxesComponent implements AfterViewInit, OnInit {
    
    @Input() notificationRules;

    @ViewChild('grid', { read: GridComponent, static: false }) grid: GridComponent;
    dataSource = new window.Smart.DataAdapter({
        dataSource: [],
        dataFields: [
            { name: 'name', type: 'string' },
            { name: 'boxName', type: 'string' },

        ]
    });

    editing = {
        enabled: true,
        action: 'none',
        mode: 'row',
        commandColumn: {
            visible: true,
            displayMode: 'icon',
            dataSource: {
                'commandColumnDelete': { visible: false },
                'commandColumnCustom': { icon: 'smart-icon-ellipsis-vert', command: 'commandColumnCustomCommand', visible: true, label: 'Text' }
            }
        }
    };
    selection = {
        enabled: true,
        allowCellSelection: true,
        allowRowHeaderSelection: true,
        allowColumnHeaderSelection: true,
        mode: 'extended'
    };
    sorting = {
		enabled: false
	};

	behavior = {
		allowColumnReorder: false
	};

    grouping = {
		enabled: true,
		renderMode: 'compact',
		groupBar: {
			visible: false
		}
	};

    layout = {
        rowHeight: 'auto',
        allowCellsWrap: true
    };

    columns = [
        { label: 'Rule Name', width: 200,  dataField: 'name'},
        { label: 'Box Name', width: 200,  dataField: 'boxName'}
];

    constructor(private notificationsQuery: NotificationsQuery, private notificationsService: NotificationsService) { }

    async ngOnInit() {
        this.dataSource.dataSource = this.notificationRules;
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    ngAfterViewInit(): void {
        // afterViewInit code.
        this.init();
    }

    init(): void {
        // init code.
    }
}