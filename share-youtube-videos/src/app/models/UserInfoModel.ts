export class UserInfoModel
{
	name: string;
	gender: string;
	email: string;
	phone: string;
	password: string;

	constructor(obj: any = null)
	{
		if(obj != null)
		{
			Object.assign(this, obj);
		}
	}
}