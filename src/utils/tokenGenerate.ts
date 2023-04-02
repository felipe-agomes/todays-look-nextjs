import JWT from 'jsonwebtoken';

export default function tokenGenerate(userId: number): string {
	const token = JWT.sign({ id: userId }, process.env.JWT_SECRETKEY!, {
		expiresIn: '7d',
	});

	return token;
}
