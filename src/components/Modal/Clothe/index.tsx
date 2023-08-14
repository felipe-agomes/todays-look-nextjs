import RowAddToWorkbench from '../Row/RowAddToWorkbench';
import RowChangeCategory from '../Row/RowChangeCategory';
import RowDelete from '../Row/RowDelete';
import RowFavorite from '../Row/RowFavorite';
import RowRoot from '../Row/RowRoot';
import ClotheRoot from './ClotheRoot';
import ContentImage from './ContentImage';
import ContentRoot from './ContentRoot';

export const ClotheModal = {
	Root: ClotheRoot,
	Content: {
		Root: ContentRoot,
		Image: ContentImage,
		Row: {
			Root: RowRoot,
			AddToWorkbench: RowAddToWorkbench,
			ChangeCategory: RowChangeCategory,
			Delete: RowDelete,
			Favorite: RowFavorite,
		},
	},
};
