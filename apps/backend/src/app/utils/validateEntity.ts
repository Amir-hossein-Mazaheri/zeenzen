import { NotFoundException } from '@nestjs/common';

export default function (entity: any, entityName: string, condition = !entity) {
  if (condition) {
    throw new NotFoundException(`Invalid ${entity} id.`);
  }

  return entity;
}
