import mongoose, { Schema } from 'mongoose';
import { ClotheSchemaProps } from '@/@types';

const SetSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			require: true,
		},
		category: {
			type: String,
			require: true,
		},
		favorite: {
			type: Boolean,
			require: true,
			default: false,
		},
		sets: {
			type: [
				{
					ClotheSchemacategory: {
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
					x: {
						type: Number,
						required: true,
					},
					y: {
						type: Number,
						required: true,
					},
				},
			],
		},
	},
	{ timestamps: true }
);

type SetType = {
	createdAt: NativeDate;
	updatedAt: NativeDate;
} & {
	userId?: mongoose.Types.ObjectId;
	sets?: ClotheSchemaProps[];
};

let Set: mongoose.Model<SetType>;

if (mongoose.modelNames().includes('Sets')) {
	Set = mongoose.model('Sets');
} else {
	Set = mongoose.model<SetType>('Sets', SetSchema);
}

export default Set;
