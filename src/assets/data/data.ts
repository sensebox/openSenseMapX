interface IRowGenerateData {
	
	emailNotification: boolean | null;
	boxName: string;
	boxSensor: string;
	boxExposure: string;
	thresholdValue: string | number;
	date: Date;
	actions: string;
}




export function GetData(rowscount?: number, last?: number, hasNullValues?: boolean): IRowGenerateData[] {
	const data: IRowGenerateData[] = new Array();

	if (rowscount === undefined) {
		rowscount = 100;
	}

	let startIndex = 0;

	if (last) {
		startIndex = rowscount;
		rowscount = last - rowscount;
	}

	const boxNames =
		[
			'PGKN FS02 - Rumphorst', 'BalkonBox Mindener Str.', 'BalkonBox Mindener Str.', 'Hoersterstr. 17', 'SteffenDroste', 'OC-WETTER', 'Fühlerbüchse', 'PGKN FS01 - Schule', 'KiTa Glühwürmchen', 'Westfälisches Pferdemuseum Münster', 'Hawerkamp 31', 'Martin', 'Botanischer Garten', 'Noise Sensor', 'CYBER Box', 'fancyBox3000', 'wullewup', 'Deipen4_A'
		];

	const boxSensors =
		[
			'Temperatur', 'rel. Luftfeuchte', 'Luftdruck', 'Beleuchtungsstärke', 'UV-Intensität', 'PM10', 'PM2.5'
		];

	const exposure =
		[
			'outdoor', 'indoor'
		];

	const actions =
		[
			'more than', 'less than'
		];

	const thresholdValues =
		[
			'2.25', '1.5', '3.0', '3.3', '4.5', '3.6', '3.8', '2.5', '5.0', '1.75', '3.25', '4.0'
		];

	for (let i = 0; i < rowscount; i++) {
		const row = {} as IRowGenerateData;

		const exposureindex = Math.floor(Math.random() * 2);
		const actionindex = Math.floor(Math.random() * actions.length);
		const thresholdValue = parseFloat(thresholdValues[exposureindex]);
		
		
		row.emailNotification = exposureindex % 2 === 0;

		if (hasNullValues === true) {
			if (exposureindex % 2 !== 0) {
				const random = Math.floor(Math.random() * rowscount);
				row.emailNotification = i % random === 0 ? null : false;
			}
		}

		row.boxName = boxNames[Math.floor(Math.random() * boxNames.length)];
		row.boxSensor = boxSensors[Math.floor(Math.random() * boxSensors.length)];
		row.boxExposure = exposure[exposureindex];
		row.actions = actions[actionindex];
		row.thresholdValue = thresholdValue;
		
		const date = new Date();
		date.setFullYear(2016, Math.floor(Math.random() * 11), Math.floor(Math.random() * 27));
		date.setHours(0, 0, 0, 0);
		row.date = date;

		data[i] = row;
	}

	return data;
}