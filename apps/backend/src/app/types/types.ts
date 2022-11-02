import { registerEnumType } from '@nestjs/graphql';

import { Category } from '../category/entities/category.entity';
import { Instructor } from '../instructor/entities/instructor.entity';
import { PreRequirement } from '../pre-requirement/entities/pre-requirement.entity';
import { Section } from '../section/entities/section.entity';

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

export enum SocialType {
  INSTAGRAM = 'INSTAGRAM',
  GITHUB = 'GITHUB',
  GITLAB = 'GITLAB',
  EMAIL = 'EMAIL',
  LINKEDIN = 'LINKEDIN',
  TELEGRAM = 'TELEGRAM',
  TWEETER = 'TWEETER',
  FACEBOOK = 'FACEBOOK',
  WHATSAPP = 'WHATSAPP',
  OTHER = 'OTHER',
}

registerEnumType(SocialType, {
  name: 'SocialType',
});

export enum ExpertiseLevel {
  LOW = 'LOW',
  JUNIOR = 'JUNIOR',
  MEDIUM = 'MEDIUM',
  MID_SENIOR = 'MID_SENIOR',
  SENIOR = 'SENIOR',
  EXPERT = 'EXPERT',
}

registerEnumType(ExpertiseLevel, {
  name: 'ExpertiseLevel',
});

export enum CourseLevel {
  ELEMENTARY = 'ELEMENTARY',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  MIXED = 'MIXED',
}

registerEnumType(CourseLevel, {
  name: 'CourseLevel',
});

export enum OrderStatus {
  FAILED = 'FAILED',
  FULFILLED = 'FULFILLED',
  PENDING = 'PENDING',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});

export enum UserLogStatus {
  LOGGED_IN = 'LOGGED_IN',
  LOGGED_OUT = 'LOGGED_OUT',
}

registerEnumType(UserLogStatus, {
  name: 'UserLogStatus',
});

export enum TicketPriority {
  HIGHT = 'HIGHT',
  MODERATE = 'MODERATE',
  LOW = 'LOW',
}

registerEnumType(TicketPriority, {
  name: 'TicketPriority',
});

export enum TicketTopic {
  COURSE = 'COURSE',
  PAYMENT = 'PAYMENT',
  IMPROVEMENT = 'IMPROVEMENT',
  OTHER = 'OTHER',
}

registerEnumType(TicketTopic, {
  name: 'TicketTopic',
});

export enum PaymentStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  FULFILLED = 'FULFILLED',
  FAILED = 'FAILED',
}

registerEnumType(PaymentStatus, {
  name: 'PaymentStatus',
});

export enum PreRequirementLevel {
  BASIC = 'BASIC',
  MEDIUM = 'MEDIUM',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

registerEnumType(PreRequirementLevel, {
  name: 'PreRequirementLevel',
});

export type ID = string | number;

export type Session = Record<string, any>;

// callback error
export type ErrorCallBack = (err: Error) => void;

// common type for some node passed callbacks
export type CallBackWithError = (cb: ErrorCallBack) => void;

export type RequestUser = { sub: number; email: string; role: UserRole };

export type RequestInstructor = RequestUser & { instructorId: number };

// these two types or helper types for dynamic property assignment on objects
export type KeyValue<T> = {
  [key: string]: T;
};

export type MixedKeyValue = {
  [key: string]: any;
};

export type CourseGatheredData = [
  Category[],
  PreRequirement[],
  Instructor[],
  Section[]
];

export type TFile = Express.Multer.File;

export type CourseImagesFiles = {
  courseImage?: Express.Multer.File[];
  courseCover?: Express.Multer.File[];
};

// export interface CreatePayPingPayment {
//   amount: number;
//   payerIdentity?: string;
//   payerName?: string;
//   description?: string;
//   returnUrl: string;
//   clientRefId?: string;
// }

// export interface CreateIDPayPayment {
//   order_id: string;
//   amount: number;
//   name?: string;
//   phone?: string;
//   mail?: string;
//   desc?: string;
//   callback: string;
// }

// export interface CreateZarinPalPayment {
//   merchant_id: string;
//   amount: number;
//   description: string;
//   callback_url: string;
//   mobile?: string;
//   email?: string;
// }

export enum PaymentStatusCode {
  NOT_FULFILLED = 1,
  FAILED,
  ERROR,
  BLOCKED,
  RETURNED,
  SYSTEM_RETURNED,
  REJECT,
  REDIRECTED_TO_GATE,
  WAITING_FOR_VERIFICATION = 10,
  VERIFIED = 100,
  VERIFIED_EARLIER,
  TRANSFERRED = 200,
}

export interface CreateLicenseWaterMark {
  texts: { text: string }[];
}

export interface CreateLicense {
  coursesIds: number[]; //list of courses in out website
  name: string;
  waterMark: CreateLicenseWaterMark;
}
