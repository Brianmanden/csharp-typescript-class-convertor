import Account from './account';
import AddEmp from './add-emp';

export default interface AthGroup {
	AGID: number;
	AGName: string;
	ComID: number;
	Employee: Array<Account>;
	PageAuth: Array<AddEmp>;
}
