import { UnprocessableEntityException, UseInterceptors } from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { v4 as genUuid } from 'uuid';
import { diskStorage } from 'multer';
import {
  MulterField,
  MulterOptions,
} from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

// a decorator to adjust file upload options
export const File = (
  name: string,
  prefix = '',
  multipleFiles = false,
  uploadFiles: MulterField[] = [], // useful when using multiple files
  randomizedName = true,
) => {
  const multerConfig: MulterOptions = {
    fileFilter(_, file, cb) {
      const fileType = file.mimetype.split('/').at(-1);
      const whiteList = /((jpe?|sv|pn)g)|webp/i;
      const isValidType = whiteList.test(fileType);
      if (isValidType) {
        cb(null, isValidType);
      } else {
        cb(
          new UnprocessableEntityException(
            'Unsupported file type. only jpg, jpeg, png, svg, and webp are allowed.',
          ),
          isValidType,
        );
      }
    },
    limits: {
      fileSize: 500 * 10000, // 5mb
    },
    storage: diskStorage({
      destination: `./public/uploads/${prefix}`,
      filename(_, file, cb) {
        const [fileName, fileType] = file.originalname.split('.');
        let finalFileName = fileName;
        if (randomizedName) {
          finalFileName += '-' + genUuid();
        }
        finalFileName += '.' + fileType;
        cb(null, finalFileName);
      },
    }),
  };

  if (multipleFiles) {
    return UseInterceptors(FileFieldsInterceptor(uploadFiles, multerConfig));
  }

  return UseInterceptors(FileInterceptor(name, multerConfig));
};
