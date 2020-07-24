import Account from './account';
import AddType from './add-type';

export default class AddEmp {
	constructor() {
		this.PaidDate = new Date();
	}

	public ADID: number;
	public Adddate: Account;
	public AddType: number;
	public EmplyeeID: number;
	public AddNot: string;
	public AddMony: number;
	public PaidDate: Date;
	public PaidID: number;
	public AddTypeNavigation: AddType;
	public Emplyee: any;
}
