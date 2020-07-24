import Account from './account';

export default class Alarm {
	constructor() {
		this.AGetDate = new Date();
		this.ADate = new Date();
	}

	public AID: number;
	public AName: string;
	public ADescription: string;
	public CustomerID: number;
	public CallID: number;
	public AGetDate: Date;
	public ADate: Date;
	public EmployeeID: number;
	public ISdone: boolean;
	public Call: Account;
	public Customer: any;
	public Employee: any;
}
