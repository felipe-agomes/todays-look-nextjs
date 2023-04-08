import {
	FormLoginErrorValues,
	FormLoginValues,
	FormRegisterErrorValues,
	FormRegisterValues,
} from '@/@types';

export function registerValidate(value: FormRegisterValues) {
	const error: FormRegisterErrorValues = {};
	if (!value.username) {
		error.username = 'Usuário é necessário';
	} else if (value.username.length < 3 || value.username.length > 15) {
		error.username =
			'Nome de usuário deve ter mais que 2 e menos que 15 caracteres';
	} else if (value.username.includes(' ')) {
		error.username = 'Nome de usuário inválido';
	}

	if (!value.email) {
		error.email = 'Email é necessário';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
		error.email = 'Endereço de email inválido';
	}

	if (!value.password) {
		error.password = 'Senha é necessária';
	} else if (value.password.length < 8 || value.password.length > 20) {
		error.password = 'A senha deve ser maior que 8 e menor que 20 digitos';
	} else if (value.password.includes(' ')) {
		error.password = 'Senha inválida';
	}

	if (!value.cpassword) {
		error.cpassword = 'Confirme a senha';
	} else if (value.cpassword !== value.password) {
		error.cpassword = 'As senhas não conferem';
	}

	return error;
}

export function loginValidate(value: FormLoginValues) {
	const error: FormLoginErrorValues = {};
	if (!value.email) {
		error.email = 'Email é necessário';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
		error.email = 'Email inválido';
	}

	if (!value.password) {
		error.password = 'Senha é necessária';
	} else if (value.password.includes(' ')) {
		error.password = 'Senha inválida';
	}

	return error;
}
