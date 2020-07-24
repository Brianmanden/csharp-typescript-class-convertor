import Account from './account';
import AddEmp from './add-emp';

export default class AthGroup {
	constructor() {
		this.Employee = new Array<Account>();
		this.PageAuth = new Array<AddEmp>();
	}

	public AGID: number;
	public AGName: string;
	public ComID: number;
	public Employee: Array<Account>;
	public PageAuth: Array<AddEmp>;
}
