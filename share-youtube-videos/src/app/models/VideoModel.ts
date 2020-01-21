export class VideoModel
{
	title: string;
	url: string;
	category: string;
	user_id: string;
	user_email: string;
	description: string;

	constructor(obj: any = null)
	{
		if(obj != null)
		{
			Object.assign(this, obj);
		}
	}
}