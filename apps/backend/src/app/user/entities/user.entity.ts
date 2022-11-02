import { Field, ObjectType, Float, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AskAmirhossein } from '../../ask-amirhossein/entities/ask-amirhossein.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { Category } from '../../category/entities/category.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Course } from '../../course/entities/course.entity';
import { Instructor } from '../../instructor/entities/instructor.entity';
import { License } from '../../license/entities/license.entity';
import { UserLog } from '../../logs/entities/user-log.entity';
import { Order } from '../../order/entities/order.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { Question } from '../../question/entities/question.entity';
import { Report } from '../../report/entities/report.entity';
import { TicketMessage } from '../../tickets/entities/ticket-message.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { UserRole } from '../../types';
import { Avatar } from '../../uploads/entities/avatar.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'user id.' })
  id: number;

  @Column({ length: 100, nullable: true })
  @Field(() => String, { nullable: true, description: 'user firstname.' })
  firstname?: string;

  @Column({ length: 100, nullable: true })
  @Field(() => String, { nullable: true, description: 'user lastname.' })
  lastname?: string;

  @Column({ length: 100, unique: true })
  @Field(() => String, {
    description: 'user email which is unique and must for sign up.',
  })
  email: string;

  @Column({ length: 20, unique: true, nullable: true })
  @Field(() => String, {
    nullable: true,
    description: 'user phone number which is unique.',
  })
  phoneNumber?: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  @Field(() => UserRole, { description: 'user role which is enum.' })
  role: UserRole;

  @Column()
  password: string;

  @Column({ type: 'decimal', precision: 8, scale: 2, default: 0 })
  @Field(() => Float, { description: 'total scores gained by user.' })
  scores: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, default: 1 })
  @Field(() => Float, {
    description: 'user score gain rate which depends on user activity.',
  })
  scoreGainRate: string;

  @CreateDateColumn()
  @Field(() => Date, { description: 'user creation date.' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'user update date.' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Avatar, (avatar) => avatar.user, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  avatar?: Avatar;

  @OneToOne(() => Cart, (cart) => cart.user, { cascade: ['insert'] })
  @JoinColumn()
  @Field(() => Cart, { nullable: true, description: 'user cart.' })
  cart?: Cart;

  @OneToMany(() => Comment, (comment) => comment.author)
  @Field(() => [Comment], { nullable: true, description: 'all user comments.' })
  comments?: Comment[];

  @OneToOne(() => Instructor, (instructor) => instructor.user)
  @JoinColumn()
  @Field(() => Instructor, {
    nullable: true,
    description: 'if user is an instructor this field relates to.',
  })
  instructor?: Instructor;

  @OneToMany(() => Order, (order) => order.user)
  @Field(() => [Order], { nullable: true, description: 'all of user orders.' })
  orders?: Order[];

  @OneToMany(() => Question, (question) => question.whoAsked)
  @Field(() => [Question], {
    nullable: true,
    description: 'all of user asked questions.',
  })
  askedQuestions: Question[];

  @OneToMany(() => Question, (question) => question.whoAnswered)
  @Field(() => [Question], {
    nullable: true,
    description: 'all of user answered question.',
  })
  answeredQuestions: Question[];

  @ManyToMany(() => Course, (course) => course.participants)
  @JoinTable()
  @Field(() => [Course], {
    nullable: true,
    description: 'all of user bought courses.',
  })
  courses: Course[];

  @OneToMany(() => Category, (category) => category.createdBy)
  @Field(() => [Category], {
    nullable: true,
    description:
      'user created category, its useful when user is admin or instructor.',
  })
  createdCategories: Category[];

  @OneToMany(() => UserLog, (userLog) => userLog.user)
  logs: UserLog[];

  @OneToMany(() => Ticket, (ticket) => ticket.whoAsked)
  tickets: Ticket[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => TicketMessage, (ticketMessage) => ticketMessage.user)
  ticketMessages: TicketMessage[];

  @OneToMany(() => License, (license) => license.user)
  licenses: License[];

  @OneToMany(() => AskAmirhossein, (askAmirhossein) => askAmirhossein.user)
  askAmirhosseins: AskAmirhossein[];

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
