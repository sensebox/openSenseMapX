import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { GridComponent, GridColumn, DataAdapter, Smart } from '@smart-webcomponents-angular/grid';
import { GetData } from './../../../../assets/data/data';
  
@Component({
    selector: 'osem-profile-followed-boxes',
    templateUrl: './profile-followed-boxes.component.html',
    styleUrls: ['./profile-followed-boxes.component.scss'],
})

export class ProfileFollowedBoxesComponent implements AfterViewInit, OnInit {
    @ViewChild('grid', { read: GridComponent, static: false }) grid: GridComponent;

    dataSource = new window.Smart.DataAdapter({
        dataSource: GetData(20),
        groupBy: ['boxName'],
        dataFields: [
            'boxName: string',
            'boxSensor: string',
            'boxExposure: string',
            'emailNotification: bool',
            'thresholdValue: number',
            'date: date',
            'actions: string'
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
        { freeze: true, label: 'Box Name', width: 200,  dataField: 'boxName'},
        { freeze: true, label: 'Sensor', dataField: 'boxSensor'},
        { label: 'Date', dataField: 'date',cellsFormat: 'dd/MM/yyyy'},
        { label: 'Exposure', dataField: 'boxExposure', validationRules: [{ type: 'required' }, { type: 'minLength', value: 5 }]},
        { label: 'Threshold action', dataField: 'actions', validationRules: [{ type: 'required' }, { type: 'minLength', value: 5 }] },
        { label: 'Value', dataField: 'thresholdValue', editor: 'numberInput', cellsFormat: 'd2', validationRules: [{ type: 'max', value: 20 }, { type: 'min', value: 1 }] },
        { label: 'Email notification', dataField: 'emailNotification', template: 'checkBox', editor: 'checkBox', validationRules: [{ type: 'requiredTrue' }] }
];

    ngOnInit(): void {
        // onInit code.
    }

    ngAfterViewInit(): void {
        // afterViewInit code.
        this.init();
    }

    init(): void {
        // init code.
    }
}