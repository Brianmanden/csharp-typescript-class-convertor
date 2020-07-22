import AddEmp from './add-emp';
import AddSalary from './add-salary';

export default interface AddType {
	ATID: number;
	ADName: string;
	AddMony: number;
	ComID: number;
	istax: boolean;
	Com: any;
	AddEmp: Array<AddEmp>;
	AddSalary: Array<AddSalary>;
	OverTimeDay: Array<any>;
	OverTimeHour: Array<any>;
	SettingOverDayNavigation: Array<any>;
	SettingOverHourNavigation: Array<any>;
}
