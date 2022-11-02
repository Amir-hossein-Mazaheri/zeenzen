import { ObjectType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class ErrorLog {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'error log id.' })
  id: string;

  @Column()
  @Field(() => String, { description: 'action that caused error.' })
  action: string;

  @Column('jsonb')
  @Field(() => GraphQLJSON, { description: 'error object.' })
  error: JSON;

  @Column('text', { default: '' })
  @Field(() => String, {
    description: 'comment about why error happened or how to fix it.',
  })
  comment: string;

  @CreateDateColumn()
  @Field(() => Date, { description: 'time that log is created.' })
  time: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column('jsonb')
  @Field(() => GraphQLJSON, { description: 'status of server cpu and memory.' })
  serverPerformanceStatus: JSON;
}
