import User from './user';

export default class AddEmp {
	constructor() {
		this.userProfile = new User();
		this.streamTest = {};
		this.date = new Date();
	}

	public name: string | undefined;
	public userProfile: User;
	public streamTest: any;
	public addEmpProfile!: AddEmp;
	public id: number | undefined;
	public number: number | undefined;
	public date: Date;
}
