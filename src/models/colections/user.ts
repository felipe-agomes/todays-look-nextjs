import mongoose, { Schema } from 'mongoose';
export const UserSchema = new Schema(
	{
		name: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		image: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true },
);

let User: mongoose.Model<
	{
		createdAt: NativeDate;
		updatedAt: NativeDate;
	} & {
		name?: string;
		email?: string;
		password?: string;
		image?: string;
	}
>;

if (!mongoose.modelNames().includes('User')) {
	User = mongoose.model('User', UserSchema);
} else {
	User = mongoose.model('User');
}

export default User;
