import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class HttpController {
	@Get('health')
	@HttpCode(200)
	public health() {
		return 'OK';
	}
}
