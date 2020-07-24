import AddEmp from './add-emp';
import AddSalary from './add-salary';

export default class AddType {
	constructor() {
		this.AddEmp = new Array<AddEmp>();
		this.AddSalary = new Array<AddSalary>();
		this.OverTimeDay = new Array<any>();
		this.OverTimeHour = new Array<any>();
		this.SettingOverDayNavigation = new Array<any>();
		this.SettingOverHourNavigation = new Array<any>();
	}

	public ATID: number;
	public ADName: string;
	public AddMony: number;
	public ComID: number;
	public istax: boolean;
	public Com: any;
	public AddEmp: Array<AddEmp>;
	public AddSalary: Array<AddSalary>;
	public OverTimeDay: Array<any>;
	public OverTimeHour: Array<any>;
	public SettingOverDayNavigation: Array<any>;
	public SettingOverHourNavigation: Array<any>;
}
