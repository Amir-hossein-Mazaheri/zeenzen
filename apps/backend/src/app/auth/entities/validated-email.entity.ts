import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ValidatedEmail {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'validated email id.' })
  id: number;

  @Column({ length: 100 })
  @Field(() => String, { description: 'validated email.' })
  email: string;

  @Column()
  code: string;

  @Column('timestamp')
  @Field(() => Date, { description: 'validation expiration date.' })
  expiresAt: Date;
}
