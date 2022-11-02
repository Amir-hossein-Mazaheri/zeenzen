import {
  BadRequestException,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export class ImageValidationPipe extends ParseFilePipe {
  constructor() {
    const KB = 1000;

    super({
      validators: [
        new FileTypeValidator({ fileType: /((jpe?|sv|pn)g)|webp/i }), // jpg or jpeg or png or webp
        new MaxFileSizeValidator({ maxSize: 600 * KB }),
      ],
      exceptionFactory(error) {
        console.log(error);
        throw new BadRequestException(error);
      },
    });
  }

  async transform(value: any) {
    return super.transform(value);
  }
}
