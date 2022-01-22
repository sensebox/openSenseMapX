import { Component, ViewChild, OnInit, AfterViewInit, Input } from '@angular/core';
import { GridComponent, GridAppearance } from '@smart-webcomponents-angular/grid';
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
        groupBy: ['boxName'],
        dataFields: [
            { name: 'name', type: 'string' },
            { name: 'boxName', type: 'string' },
            { name: 'sensorName', type: 'string' },
            { name: 'boxDate', type: 'date' },
            { name: 'boxExposure', type: 'string' },
            { name: 'activationOperator', type: 'string' },
            { name: 'activationThreshold', type: 'string' },
            


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
        allowRowHeaderSelection: false,
        allowColumnHeaderSelection: true,
        mode: 'extended'
    };
    sorting = {
		enabled: false
	};

	behavior = {
		allowColumnReorder: false,
        columnResizeMode: 'growAndShrink',
	};

    grouping = {
		enabled: true,
		renderMode: 'compact',
		groupBar: {
			visible: false
		}
	};

    public layout = {
        rowHeight: 'auto',
        allowCellsWrap: true
    };

    columns = [
        //{ label: 'Rule Name', width: 200,  dataField: 'name'},
        { freeze: true, label: 'Box Name', width: 200,  dataField: 'boxName'},
        { freeze: true, label: 'Sensor', width: 150, dataField: 'sensorName'},
        { label: 'Date activated', width: 120, dataField: 'boxDate',cellsFormat: 'dd/MM/yyyy'},
        { label: 'Exposure', dataField: 'boxExposure'},
        { label: 'Action',showDescriptionButton: true, description: 'Threshold condition', dataField: 'activationOperator'},
        { label: 'Value',showDescriptionButton: true, description: 'Threshold value', dataField: 'activationThreshold',  editor: 'numberInput', cellsFormat: 'd2'},
        { label: 'Email', dataField: 'emailNotification', template: 'checkBox', editor: 'checkBox'}   
];
    appearance: GridAppearance = {
        
        showRowHeader: true,
        showRowHeaderSelectIcon: true,
        showRowHeaderFocusIcon: true
    };

    @Input() user;

    constructor(private notificationsQuery: NotificationsQuery, private notificationsService: NotificationsService) { }

    ngOnInit() {
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