import {
	FormLoginErrorValues,
	FormLoginValues,
	FormRegisterErrorValues,
	FormRegisterValues,
	FormSendImageValues,
	FormSendImageErrorValues,
} from '@/@types';

export function registerValidate(value: FormRegisterValues) {
	const error: FormRegisterErrorValues = {};
	if (!value.username) {
		error.username = 'Usuário é necessário';
	} else if (value.username.length < 3 || value.username.length >= 15) {
		error.username =
			'Nome de usuário deve ter mais que 2 e menos de 15 caracteres';
	} else if (value.username.includes(' ')) {
		error.username = 'Nome de usuário inválido';
	}

	if (!value.email) {
		error.email = 'Email é necessário';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
		error.email = 'Email inválido';
	}

	if (!value.password) {
		error.password = 'Senha é necessária';
	} else if (value.password.length <= 8 || value.password.length >= 20) {
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

export function sendImageValidate(values: FormSendImageValues) {
	const error: FormSendImageErrorValues = {};
	if (!values.category) {
		error.category = 'Categoria deve ser informada';
	} else if (values.category.length < 2) {
		error.category = 'Categoria não pode ser menor que 2 caracteres';
	} else if (values.category.length > 10) {
		error.category = 'Categoria deve ter menos que 10 caracteres';
	}

	if (!values.file) {
		error.file = 'Uma imagem precisa ser selecionada';
	} else if (!values.file.type.startsWith('image/')) {
		error.file = 'Deve ser enviado uma imagem';
	}

	return error;
}

export function validateNewCategory(value: { category: string }) {
	const error: { category?: String } = {};
	if (!value.category) {
		error.category = 'Categoria deve ser informada';
	} else if (value.category.length < 2) {
		error.category = 'Categoria não pode ser menor que 2 caracteres';
	} else if (value.category.length > 10) {
		error.category = 'Categoria deve ter menos que 10 caracteres';
	}

	return error;
}

export function validateExistingCategory(value: { existingCategory: String }) {
	const error: { existingCategory?: String } = {};
	if (!value.existingCategory) {
		error.existingCategory = 'Uma categoria deve ser selecionada';
	}

	return error;
}
