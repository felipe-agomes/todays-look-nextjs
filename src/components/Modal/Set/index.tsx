import RowChangeCategory from '../Row/RowChangeCategory';
import RowDelete from '../Row/RowDelete';
import RowFavorite from '../Row/RowFavorite';
import RowRoot from '../Row/RowRoot';
import ContentImage from './ContentImage';
import ContentRoot from './ContentRoot';
import SetRoot from './SetRoot';

export const SetModal = {
	Root: SetRoot,
	Content: {
		Root: ContentRoot,
		Image: ContentImage,
		Row: {
			Root: RowRoot,
			ChangeCategory: RowChangeCategory,
			Delete: RowDelete,
			Favorite: RowFavorite,
		},
	},
};
