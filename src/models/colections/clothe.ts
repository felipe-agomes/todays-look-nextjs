import mongoose, { Schema } from 'mongoose';

const clotheSchema = new Schema(
	{
		category: {
			type: String,
			require: true,
		},
		favorite: {
			type: Boolean,
			require: true,
			default: false,
		},
		key: {
			type: String,
			require: true,
		},
		image: {
			type: String,
			require: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			require: true,
		},
	},
	{ timestamps: true }
);

let Clothe: mongoose.Model<
	{
		createdAt: NativeDate;
		updatedAt: NativeDate;
	} & {
		favorite: boolean;
		category?: string | undefined;
		key?: string | undefined;
		image?: string | undefined;
		userId?: mongoose.Types.ObjectId | undefined;
	}
>;

clotheSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

if (mongoose.modelNames().includes('Clothes')) {
	Clothe = mongoose.model('Clothes');
} else {
	Clothe = mongoose.model('Clothes', clotheSchema);
}

export default Clothe;
