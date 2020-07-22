import Account from './account';

export default interface Alarm {
	AID: number;
	AName: string;
	ADescription: string;
	CustomerID: number;
	CallID: number;
	AGetDate: Date;
	ADate: Date;
	EmployeeID: number;
	ISdone: boolean;
	Call: Account;
	Customer: any;
	Employee: any;
}
