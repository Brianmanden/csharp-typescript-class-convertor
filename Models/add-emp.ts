import Account from './account';
import AddType from './add-type';

export default interface AddEmp {
	ADID: number;
	Adddate: Account;
	AddType: number;
	EmplyeeID: number;
	AddNot: string;
	AddMony: number;
	PaidDate: Date;
	PaidID: number;
	AddTypeNavigation: AddType;
	Emplyee: any;
}
