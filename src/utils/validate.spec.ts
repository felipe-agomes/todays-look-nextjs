import { FormRegisterValues, FormSendImageValues } from '@/@types';
import { JSDOM } from 'jsdom';
import {
	loginValidate,
	registerValidate,
	sendImageValidate,
	validateExistingCategory,
	validateNewCategory,
} from './validate';

describe('loginValidate', () => {
	it('should return error object with email and password errors', () => {
		const value = { email: '', password: '' };
		const result = loginValidate(value);
		expect(result.email).toBe('Email é necessário');
		expect(result.password).toBe('Senha é necessária');
	});

	it('should return error object with invalid password error', () => {
		const values = { email: 'email@example.com', password: 'pass word' };
		const result = loginValidate(values);
		expect(result.password).toBe('Senha inválida');
	});

	it('should return empty error object for valid values', () => {
		const values = { email: 'email@example.com', password: 'password' };
		const result = loginValidate(values);
		expect(result).toEqual({});
	});

	it('should return error object with invalid email error', () => {
		const values = { email: 'invalidEmail', password: 'password' };
		const result = loginValidate(values);
		expect(result.email).toBe('Email inválido');
	});
});

describe('registerValidate', () => {
	it('should return error object with all property inválid', () => {
		const values: FormRegisterValues = {
			email: '',
			username: '',
			password: '',
			cpassword: '',
		};
		const result = registerValidate(values);
		expect(result.email).toBe('Email é necessário');
		expect(result.username).toBe('Usuário é necessário');
		expect(result.password).toBe('Senha é necessária');
		expect(result.cpassword).toBe('Confirme a senha');
	});

	it('should return error object with email inválid', () => {
		const values: FormRegisterValues = {
			email: 'invalidEmail',
			username: 'username',
			password: 'password',
			cpassword: 'cpassword',
		};
		const result = registerValidate(values);
		expect(result.email).toBe('Email inválido');
	});

	it('should return error object with smalle user', () => {
		const values: FormRegisterValues = {
			email: 'email@example.com',
			username: 'us',
			password: 'password',
			cpassword: 'cpassword',
		};
		const result = registerValidate(values);
		expect(result.username).toBe(
			'Nome de usuário deve ter mais que 2 e menos de 15 caracteres',
		);
	});

	it('should return error object with space into usarname', () => {
		const values: FormRegisterValues = {
			email: 'email@example.com',
			username: 'user name',
			password: 'passwordMoreLarger12',
			cpassword: 'passwordMoreLarger12',
		};
		const result = registerValidate(values);
		expect(result.username).toBe('Nome de usuário inválido');
	});

	it('should return error object with larger user', () => {
		const values: FormRegisterValues = {
			email: 'email@example.com',
			username: 'usernameLarger1',
			password: 'password',
			cpassword: 'cpassword',
		};
		const result = registerValidate(values);
		expect(result.username).toBe(
			'Nome de usuário deve ter mais que 2 e menos de 15 caracteres',
		);
	});

	it('should return error object with smalle password', () => {
		const values: FormRegisterValues = {
			email: 'email@example.com',
			username: 'username',
			password: 'password',
			cpassword: 'password',
		};
		const result = registerValidate(values);
		expect(result.password).toBe(
			'A senha deve ser maior que 8 e menor que 20 digitos',
		);
	});

	it('should return error object with smalle password', () => {
		const values: FormRegisterValues = {
			email: 'email@example.com',
			username: 'username',
			password: 'pass word',
			cpassword: 'pass word',
		};
		const result = registerValidate(values);
		expect(result.password).toBe('Senha inválida');
	});

	it('should return error object with different password and cpassword', () => {
		const values: FormRegisterValues = {
			email: 'email@example.com',
			username: 'username',
			password: 'correctPassword',
			cpassword: 'invalidCPassword',
		};
		const result = registerValidate(values);
		expect(result.cpassword).toBe('As senhas não conferem');
	});

	it('should return error object with larger password', () => {
		const values: FormRegisterValues = {
			email: 'email@example.com',
			username: 'username',
			password: 'passwordMoreLarger12',
			cpassword: 'passwordMoreLarger12',
		};
		const result = registerValidate(values);
		expect(result.password).toBe(
			'A senha deve ser maior que 8 e menor que 20 digitos',
		);
	});

	it('should return empty error object for valid values', () => {
		const values: FormRegisterValues = {
			email: 'email@example.com',
			username: 'username',
			password: 'passwordMoreLarger1',
			cpassword: 'passwordMoreLarger1',
		};
		const result = registerValidate(values);
		expect(result).toEqual({});
	});
});

describe('sendImageValidate', () => {
	it('should return error object with category and file errors', () => {
		const values = { category: '', file: null };
		const result = sendImageValidate(values);
		expect(result.category).toBe('Categoria deve ser informada');
		expect(result.file).toBe('Uma imagem precisa ser selecionada');
	});

	it('should return error object with category length error', () => {
		const dom = new JSDOM();
		const file = new dom.window.File([], 'image.png', { type: 'image/png' });
		const values = { category: 'A', file };
		const result = sendImageValidate(values);
		expect(result.category).toBe('Categoria não pode ser menor que 2 caracteres');
	});

	it('should return error object with category max length error', () => {
		const dom = new JSDOM();
		const file = new dom.window.File([], 'image.png', { type: 'image/png' });
		const values = { category: 'ABCDEFGHIJK', file };
		const result = sendImageValidate(values);
		expect(result.category).toBe('Categoria deve ter menos que 10 caracteres');
	});

	it('should return error object with invalid file type error', () => {
		const dom = new JSDOM();
		const file = new dom.window.File([], 'document.pdf', {
			type: 'application/pdf',
		});
		const values = { category: 'ABC', file };
		const result = sendImageValidate(values);
		expect(result.file).toBe('Deve ser enviado uma imagem');
	});

	it('should return empty error object for valid values', () => {
		const dom = new JSDOM();
		const file = new dom.window.File([], 'image.png', { type: 'image/png' });
		const values = { category: 'ABC', file };
		const result = sendImageValidate(values);
		expect(result).toEqual({});
	});
});

describe('validateExistingCategory', () => {
	it('should return error object with existingCategory error', () => {
		const values = { existingCategory: '' };
		const result = validateExistingCategory(values);
		expect(result.existingCategory).toBe('Uma categoria deve ser selecionada');
	});

	it('should return empty error object for valid values', () => {
		const values = { existingCategory: 'ABC' };
		const result = validateExistingCategory(values);
		expect(result).toEqual({});
	});
});
describe('validateNewCategory', () => {
	it('should return error object with category error', () => {
		const values = { category: '' };
		const result = validateNewCategory(values);
		expect(result.category).toBe('Categoria deve ser informada');
	});

	it('should return error object with category length error', () => {
		const values = { category: 'A' };
		const result = validateNewCategory(values);
		expect(result.category).toBe('Categoria não pode ser menor que 2 caracteres');
	});

	it('should return error object with category max length error', () => {
		const values = { category: 'ABCDEFGHIJK' };
		const result = validateNewCategory(values);
		expect(result.category).toBe('Categoria deve ter menos que 10 caracteres');
	});

	it('should return empty error object for valid values', () => {
		const values = { category: 'ABC' };
		const result = validateNewCategory(values);
		expect(result).toEqual({});
	});
});
