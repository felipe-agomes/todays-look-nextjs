import { Request } from 'express';
import { ClotheData } from './models';

export type UserId = string;

export type FetcherOptions = {
	method?: string;
	body?: string;
	update?: boolean;
};
