import AddType from './add-type';

export default interface AddSalary {
	ASID: number;
	ASName: string;
	AddPercent: number;
	AddDay: number;
	AddTypeID: number;
	AddHour: number;
	SalaryTypeID: number;
	AddType: AddType;
	SalaryType: any;
}
