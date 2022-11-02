import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
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

import { CartItem } from '../../cart/entities/cart-item.entity';
import { Category } from '../../category/entities/category.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Coupon } from '../../coupon/entities/coupon.entity';
import { Instructor } from '../../instructor/entities/instructor.entity';
import { License } from '../../license/entities/license.entity';
import { OrderItem } from '../../order/entities/order-item.entity';
import { PreRequirement } from '../../pre-requirement/entities/pre-requirement.entity';
import { Question } from '../../question/entities/question.entity';
import { Section } from '../../section/entities/section.entity';
import { CourseLevel } from '../../types';
import { CourseImage } from '../../uploads/entities/course-image.entity';
import { User } from '../../user/entities/user.entity';
import getPriceConfig from '../../utils/getPriceConfig';

@Entity()
@ObjectType()
export class Course {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'course id.' })
  id: number;

  @Column()
  @Field(() => String, { description: 'spot player created course code.' })
  spotPlayerCourseId: string;

  @Column()
  @Field(() => String, { description: 'course title.' })
  title: string;

  @Column()
  @Field(() => String, {
    description: 'short description that is shown in courses list.',
  })
  shortDescription: string;

  @Column({ nullable: true })
  @Field(() => String, {
    nullable: true,
    description: 'description for pre requirements in markup',
  })
  preRequirementsDescription: string;

  @Column()
  @Field(() => String, { description: 'course description in markup.' })
  description: string;

  @Column({ type: 'enum', enum: CourseLevel, default: CourseLevel.MIXED })
  @Field(() => CourseLevel, { description: 'course level which is an enum.' })
  level: CourseLevel;

  @Column('int', { default: 0 })
  @Field(() => Int, { description: 'total participants of course.' })
  participantsCount?: number;

  @Column('int', { default: 0 })
  @Field(() => Int, { description: 'total lectures of course.' })
  lecturesCount: number;

  @Column('int', { default: 0 })
  @Field(() => Int, { description: 'total hours of course.' })
  hoursCount?: number;

  @Column(getPriceConfig({ default: 0 }))
  @Field(() => Float, { description: 'price of course.' })
  price: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  @Field(() => Float, { description: 'progress that made for course.' })
  progress?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  @Field(() => String, {
    description: 'amount of discount that is applied to course price.',
  })
  discountPercent?: string;

  @Column({ default: true })
  isDraft: boolean;

  @CreateDateColumn()
  @Field(() => Date, { description: 'course creation date.' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'course update date.' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => CourseImage, (courseImage) => courseImage.image, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  @Field(() => CourseImage, {
    description: 'course images which includes the image and cover image.',
  })
  image: CourseImage;

  @OneToMany(() => PreRequirement, (preRequirement) => preRequirement.course)
  preRequirements: PreRequirement[];

  @OneToMany(() => Comment, (comment) => comment.course)
  comments: Comment[];

  @ManyToMany(() => Category, (category) => category.courses)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.course)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.course)
  orderItems: OrderItem[];

  @ManyToMany(() => Instructor, (instructor) => instructor.courses)
  @JoinTable()
  @Field(() => [Instructor], { description: 'instructors of course.' })
  instructors: Instructor[];

  @OneToMany(() => Section, (section) => section.course)
  sections: Section[];

  @ManyToMany(() => User, (user) => user.courses)
  participants: User[];

  @OneToMany(() => Question, (question) => question.course)
  questions: Question[];

  @ManyToMany(() => Coupon, (coupon) => coupon.courses)
  @JoinTable()
  coupons: Coupon[];

  @ManyToMany(() => License, (license) => license.courses)
  @JoinTable()
  licenses: License[];
}
