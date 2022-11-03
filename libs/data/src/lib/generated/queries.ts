import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AddCartItemInput = {
  /** target cart id which is uuid. */
  cartId: Scalars['ID'];
  /** course that is meant to be added to cart. */
  courseId: Scalars['ID'];
  quantity?: InputMaybe<Scalars['Int']>;
};

export type AnswerAskAmirhosseinInput = {
  /** answer to the question which is sent via email. */
  answer: Scalars['String'];
  /** question that is being answered. */
  id: Scalars['ID'];
};

export type ApplyCouponInput = {
  /** target cart that coupon should apply on. */
  cartId: Scalars['String'];
  /** a valid coupon code. */
  couponCode: Scalars['String'];
};

export type AskAmirhossein = {
  __typename?: 'AskAmirhossein';
  /** answer body. */
  answer?: Maybe<Scalars['String']>;
  /** answer time of question. */
  answeredAt?: Maybe<Scalars['DateTime']>;
  /** creation time of question. */
  createdAt: Scalars['DateTime'];
  /** person who asked question email, if user is logged in its not needed. */
  email: Scalars['String'];
  /** ask amirhossein id. */
  id: Scalars['ID'];
  /** question body. */
  question: Scalars['String'];
  /** if user is logged in this will be assigned. */
  user: User;
};

export type Avatar = {
  __typename?: 'Avatar';
  /** avatar creation data. */
  createdAt: Scalars['DateTime'];
  /** full url to avatar image. */
  fullPath: Scalars['String'];
  /** avatar id which is uuid. */
  id: Scalars['ID'];
  /** avatar saved file name. */
  name: Scalars['String'];
  /** avatar original file name. */
  originalName: Scalars['String'];
};

export type Cart = {
  __typename?: 'Cart';
  /** resolve cart items field. */
  cartItems?: Maybe<Array<CartItem>>;
  /** cart creation data. */
  createdAt: Scalars['DateTime'];
  /** cart id which is an uuid. */
  id: Scalars['String'];
  /** aggregated unit price. */
  totalPrice: Scalars['String'];
  /** aggregated unit price with discount. */
  totalPriceWithDiscount: Scalars['String'];
};

export type CartItem = {
  __typename?: 'CartItem';
  course: Course;
  /** cart item id. */
  id: Scalars['ID'];
  /** quantity of course in the cart item. */
  quantity: Scalars['Int'];
  /** cart item unit price. */
  unitPrice: Scalars['String'];
  /** total price with discount of cart item. */
  unitPriceWithDiscount: Scalars['Float'];
};

export type Category = {
  __typename?: 'Category';
  /** person who created the category. */
  createdBy: User;
  /** category id. */
  id: Scalars['ID'];
  /** category label. */
  label: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  /** comment content or body. */
  content: Scalars['String'];
  /** comment creation date. */
  createdAt: Scalars['DateTime'];
  /** comment id. */
  id: Scalars['ID'];
  /** is published to public or not. */
  isPublished: Scalars['Boolean'];
  replies?: Maybe<Array<Comment>>;
  /** update data of comment. */
  updatedAt: Scalars['DateTime'];
};

export type Coupon = {
  __typename?: 'Coupon';
  /** if this is set to true it can affect all courses. */
  applyToEveryThing: Scalars['Boolean'];
  /** coupon creation date. */
  createdAt: Scalars['DateTime'];
  /** coupon description or reason of existence. */
  description: Scalars['String'];
  /** expiration date. */
  expiresAt: Scalars['DateTime'];
  /** coupon id. */
  id: Scalars['ID'];
  /** maximum effect that coupon has. */
  maxEffect: Scalars['Float'];
  /** reduction percent. */
  percent: Scalars['Float'];
  /** coupon update date. */
  updatedAt: Scalars['DateTime'];
};

export type Course = {
  __typename?: 'Course';
  /** course creation date. */
  createdAt: Scalars['DateTime'];
  /** course description in markup. */
  description: Scalars['String'];
  /** amount of discount that is applied to course price. */
  discountPercent: Scalars['String'];
  /** total hours of course. */
  hoursCount: Scalars['Int'];
  /** course id. */
  id: Scalars['ID'];
  /** resolve image field. */
  image: CourseImage;
  instructors: Array<Instructor>;
  /** total lectures of course. */
  lecturesCount: Scalars['Int'];
  /** course level which is an enum. */
  level: CourseLevel;
  /** total participants of course. */
  participantsCount: Scalars['Int'];
  /** description for pre requirements in markup */
  preRequirementsDescription?: Maybe<Scalars['String']>;
  /** price of course. */
  price: Scalars['Float'];
  /** progress that made for course. */
  progress: Scalars['Float'];
  /** short description that is shown in courses list. */
  shortDescription: Scalars['String'];
  /** spot player created course code. */
  spotPlayerCourseId: Scalars['String'];
  /** course title. */
  title: Scalars['String'];
  /** course update date. */
  updatedAt: Scalars['DateTime'];
};

export type CourseImage = {
  __typename?: 'CourseImage';
  /** related course. */
  course: Course;
  /** course cover image that is only shown in single course pages. */
  coverImage: Scalars['String'];
  id: Scalars['ID'];
  /** course image, image which is course main image. */
  image: Scalars['String'];
};

export enum CourseLevel {
  Advanced = 'ADVANCED',
  Elementary = 'ELEMENTARY',
  Intermediate = 'INTERMEDIATE',
  Mixed = 'MIXED'
}

export type CreateAskAmirhosseinInput = {
  /** Example field (placeholder) */
  email?: InputMaybe<Scalars['String']>;
  /** Example field (placeholder) */
  question: Scalars['String'];
};

export type CreateCategoryInput = {
  /** category label/tag */
  label: Scalars['String'];
};

export type CreateCommentInput = {
  /** comment content or body. */
  content: Scalars['String'];
  /** target course id. */
  courseId: Scalars['ID'];
};

export type CreateCouponInput = {
  /** make coupon that applies to all courses, makes a conflict whit coursesId field. */
  applyToEveryThing?: InputMaybe<Scalars['Boolean']>;
  /** a unique coupon code. */
  code: Scalars['String'];
  /** courses that coupon has effect on. */
  coursesId?: InputMaybe<Array<Scalars['ID']>>;
  /** coupon description or reason of it. */
  description: Scalars['String'];
  /** expiration date of coupon which should be utc */
  expiresAt: Scalars['DateTime'];
  /** maximum effect or reduction that coupon can apply. */
  maxEffect?: InputMaybe<Scalars['String']>;
  /** amount of effect that coupon has. */
  percent: Scalars['String'];
};

export type CreateCourseInput = {
  /** list of categories ids. */
  categoriesId: Array<Scalars['ID']>;
  /** course description. */
  description: Scalars['String'];
  /** amount of course discount(in percent). */
  discountPercent?: InputMaybe<Scalars['String']>;
  /** list of instructors ids. */
  instructorsId: Array<Scalars['ID']>;
  /** course level which is a enum. */
  level?: InputMaybe<CourseLevel>;
  /** pre requirements description. */
  preRequirementsDescription?: InputMaybe<Scalars['String']>;
  /** list of pre requirements ids. */
  preRequirementsId: Array<Scalars['ID']>;
  /** course price. */
  price?: InputMaybe<Scalars['String']>;
  /** amount of course progress(in percent) */
  progress?: InputMaybe<Scalars['String']>;
  /** list of sections ids. */
  sectionsId: Array<Scalars['ID']>;
  /** course short description. */
  shortDescription: Scalars['String'];
  /** spot player course id. */
  spotPlayerCourseId: Scalars['ID'];
  /** course title. */
  title: Scalars['String'];
};

export type CreateExpertiseInput = {
  /** expertise title/label. */
  label: Scalars['String'];
  /** expertise level based on junior, senior, mid-level and so on. */
  level: ExpertiseLevel;
};

export type CreateInstructorInput = {
  /** a short description about instructor. */
  about: Scalars['String'];
  /** the user that want to be promoted into instructor. */
  userId: Scalars['ID'];
};

export type CreateLectureInput = {
  /** total duration of lecture. */
  duration?: InputMaybe<Scalars['Int']>;
  /** lecture label/title. */
  label: Scalars['String'];
  /** section id that lecture gonna belongs to. */
  sectionId: Scalars['ID'];
};

export type CreatePreRequirementInput = {
  /** pre requirement description. */
  description: Scalars['String'];
  /** related image to pre requirement. */
  image: Scalars['String'];
  /** pre requirement label/title. */
  label: Scalars['String'];
  /** pre requirement level. */
  level: PreRequirementLevel;
};

export type CreateQuestionInput = {
  /** actual question. */
  question: Scalars['String'];
};

export type CreateReportInput = {
  /** content which should contain reason and some description about report. */
  content: Scalars['String'];
  /** report title which should contain the section that is reported. */
  title: Scalars['String'];
};

export type CreateSectionInput = {
  /** section description. */
  description: Scalars['String'];
  /** total section duration. */
  duration?: InputMaybe<Scalars['Int']>;
  /** section label/title. */
  label: Scalars['String'];
};

export type CreateSocialInput = {
  /** link to social media account/page. */
  link: Scalars['String'];
  /** social type which is an enum like GITHUB. */
  type: SocialType;
};

export type CreateTicketInput = {
  /** ticket description. */
  description: Scalars['String'];
  /** ticket priority which is an enum. */
  priority: Scalars['String'];
  /** ticket title. */
  title: Scalars['String'];
  /** ticket topic which is an enum. */
  topic: Scalars['String'];
};

export type CreateTodoInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type DecrementCartItemInput = {
  /** target cart id which is uuid. */
  cartId: Scalars['ID'];
  /** course that is meant to be added to cart. */
  courseId: Scalars['ID'];
  quantity?: InputMaybe<Scalars['Int']>;
};

export type EmailSubscription = {
  __typename?: 'EmailSubscription';
  /** subscription email. */
  email: Scalars['String'];
  /** subscription id. */
  id: Scalars['ID'];
  /** time of start subscription. */
  subscriptedAt: Scalars['DateTime'];
};

export type ErrorLog = {
  __typename?: 'ErrorLog';
  /** action that caused error. */
  action: Scalars['String'];
  /** comment about why error happened or how to fix it. */
  comment: Scalars['String'];
  /** error object. */
  error: Scalars['JSON'];
  /** error log id. */
  id: Scalars['String'];
  /** status of server cpu and memory. */
  serverPerformanceStatus: Scalars['JSON'];
  /** time that log is created. */
  time: Scalars['DateTime'];
};

export type Expertise = {
  __typename?: 'Expertise';
  /** expertise id. */
  id: Scalars['ID'];
  /** instructor that expertise relates to. */
  instructor: Instructor;
  /** determine wether an expertise is instructor's primary or not. */
  isPrimary: Scalars['Boolean'];
  /** expertise label/title. */
  label: Scalars['String'];
  /** expertise level which is an enum. */
  level: ExpertiseLevel;
  /** determine wether expertise is validated by admin or not. */
  validated: Scalars['Boolean'];
};

export enum ExpertiseLevel {
  Expert = 'EXPERT',
  Junior = 'JUNIOR',
  Low = 'LOW',
  Medium = 'MEDIUM',
  MidSenior = 'MID_SENIOR',
  Senior = 'SENIOR'
}

export type FindAllAskAmirhosseinInput = {
  email: Scalars['String'];
};

export type FindAllSectionInput = {
  /** target course id which sections are needed. */
  courseId: Scalars['ID'];
};

export type FindOneAskAmirhosseinInput = {
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type IncrementCartItemInput = {
  /** target cart id which is uuid. */
  cartId: Scalars['ID'];
  /** course that is meant to be added to cart. */
  courseId: Scalars['ID'];
  quantity?: InputMaybe<Scalars['Int']>;
};

export type Instructor = {
  __typename?: 'Instructor';
  /** a short description about instructor. */
  about: Scalars['String'];
  /** courses that instructor is the instructor of them. */
  courses?: Maybe<Array<Course>>;
  /** instructor creation date. */
  createdAt: Scalars['DateTime'];
  expertises: Array<Expertise>;
  /** instructor id. */
  id: Scalars['ID'];
  /** list of instructor social medias. */
  socials?: Maybe<Array<Expertise>>;
  /** instructor update date. */
  updatedAt: Scalars['DateTime'];
  /** returns logged in user credentials. */
  user: User;
};

export type Lecture = {
  __typename?: 'Lecture';
  /** lecture creation date. */
  createdAt: Scalars['DateTime'];
  /** total duration of lecture. */
  duration: Scalars['Int'];
  /** lecture id. */
  id: Scalars['ID'];
  /** lecture label/title. */
  label: Scalars['String'];
  /** update lecture date. */
  updatedAt: Scalars['DateTime'];
};

export type License = {
  __typename?: 'License';
  /** courses that this license works for. */
  courses: Array<Course>;
  /** creation time of license code. */
  createdAt: Scalars['DateTime'];
  /** license id. */
  id: Scalars['ID'];
  /** generated license code. */
  licenseCode: Scalars['String'];
  /** generated license id. */
  licenseId: Scalars['String'];
  /** generated license url. */
  licenseUrl: Scalars['String'];
  /** consumer of license code. */
  user: User;
};

export type LimitedUpdateUserInput = {
  /** user email. */
  email?: InputMaybe<Scalars['String']>;
  /** user firstname. */
  firstname?: InputMaybe<Scalars['String']>;
  /** user lastname. */
  lastname?: InputMaybe<Scalars['String']>;
  newPassword?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  /** user phone number. */
  phoneNumber?: InputMaybe<Scalars['String']>;
  repeatNewPassword?: InputMaybe<Scalars['String']>;
};

export type LogoutMessage = {
  __typename?: 'LogoutMessage';
  /** tells the status of logging out. */
  message: Scalars['String'];
  /** logged out user email. */
  userEmail: Scalars['String'];
  /** logged out user id. */
  userId: Scalars['ID'];
  /** logged out user role. */
  userRole: UserRole;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** adds item to cart. */
  addCartItem: CartItem;
  answerAskAmirhossein: AskAmirhossein;
  /** applies coupon to all courses in cart which are in list of coupon courses and then updates the total price with discount of cart. */
  applyCoupon: Coupon;
  closeTicket: Ticket;
  createAskAmirhossein: AskAmirhossein;
  /** creates an empty cart for user. */
  createCart: Cart;
  /** creates a category(only for admins). */
  createCategory: Category;
  /** creates a comment. */
  createComment: Comment;
  /** creates a coupon. */
  createCoupon: Coupon;
  /** creates a course in draft mode(only for admins). */
  createCourse: Course;
  /** creates an expertise(only for instructors). */
  createExpertise: Expertise;
  /** creates an instructor(only for admins). */
  createInstructor: Instructor;
  /** creates a lecture(only instructors). */
  createLecture: Lecture;
  /** creates a pre requirement. */
  createPreRequirement: PreRequirement;
  /** creates a question. */
  createQuestion: Question;
  /** creates and returns report. */
  createReport: Report;
  /** creates a section(only for instructors). */
  createSection: Section;
  /** creates a social(only for instructors). */
  createSocial: Social;
  createTicket: Ticket;
  createTodo: Todo;
  decrementCartItem: CartItem;
  incrementCartItem: CartItem;
  /** updates a user(limited and its should be used for customers). */
  limitedUpdateUser: User;
  /** logs user out by clearing session and cookie and log it into database. */
  logout: LogoutMessage;
  /** mark target expertise as primary and set others instructor's expertise isPrimary to false. */
  markExpertiseAsPrimary: Expertise;
  /** creates an order in pending status. */
  placeOrder: Order;
  preSignUp: ValidatedEmail;
  /** publish a draft course(only for admins). */
  publishCourse: Course;
  /** soft deletes a comment(only for admins). */
  removeComment: Comment;
  /** removes coupon. */
  removeCoupon: Coupon;
  /** soft deletes course(only for admins). */
  removeCourse: Course;
  /** removes an error log. */
  removeErrorLog: ErrorLog;
  /** removes an expertise that belongs to instructor. */
  removeExpertise: Expertise;
  /** removes a lecture that belongs to instructor. */
  removeLecture: Lecture;
  /** soft delete a pre requirement. */
  removePreRequirement: PreRequirement;
  removePreSignUpCode: ValidatedEmail;
  /** soft delete a question(only for admins). */
  removeQuestion: Question;
  /** removes an instructor section or if user is admin any other section. */
  removeSection: Section;
  /** removes an instructor social(only for instructors). */
  removeSocial: Social;
  removeTodo: Todo;
  /** soft deletes a user(only for admins). */
  removeUser: User;
  /** removes a user log. */
  removeUserLog: UserLog;
  /** adds a reply to target comment. */
  replyComment: Comment;
  /** restores a soft deleted comment(only for admins). */
  restoreComment: Comment;
  /** restore a deleted course(only for admins). */
  restoreCourse: Course;
  /** restore a lecture that belongs to instructor and has been removed.. */
  restoreLecture: Lecture;
  /** restore a soft deleted pre requirement. */
  restorePreRequirement: PreRequirement;
  /** restore a soft deleted question. */
  restoreQuestion: Question;
  /** restore a soft deleted instructor section or if user is admin any other section. */
  restoreSection: Section;
  /** restores a soft deleted user(only for admins). */
  restoreUser: User;
  sendTicketMessage: TicketMessage;
  /** sign user in with session and log it into database. */
  signIn: User;
  /** easy user sign up with email and password. */
  signUp: User;
  /** add email to subscribers list. */
  subscribe: EmailSubscription;
  updateAskAmirhosseinAnswer: AskAmirhossein;
  /** updates and returns old category. */
  updateCategory: Category;
  /** updates a comment body */
  updateComment: Comment;
  /** updates and returns updated coupon. */
  updateCoupon: Coupon;
  /** updates course that belongs to instructor or any course if the user is admin. */
  updateCourse: Course;
  /** updates an error log comment. */
  updateErrorLogComment: ErrorLog;
  /** updates an expertise that belongs to instructor. */
  updateExpertise: Expertise;
  /** updates an instructor(only for admins). */
  updateInstructor: Instructor;
  /** updates a lecture that belongs to instructor. */
  updateLecture: Lecture;
  /** updates a pre requirement. */
  updatePreRequirement: PreRequirement;
  /** updates a question, question body. */
  updateQuestion: Question;
  /** updates a question, answer(only for instructors). */
  updateQuestionAnswer: Question;
  /** updates an instructor section or if user is admin any other section. */
  updateSection: Section;
  /** updates an instructor social(only for instructors). */
  updateSocial: Social;
  updateTodo: Todo;
  /** updates a user(only for admins). */
  updateUser: User;
  /** validate expertise as validated(only for admins). */
  validateExpertise: Expertise;
};


export type MutationAddCartItemArgs = {
  addCartItemInput: AddCartItemInput;
};


export type MutationAnswerAskAmirhosseinArgs = {
  answerAskAmirhosseinInput: AnswerAskAmirhosseinInput;
};


export type MutationApplyCouponArgs = {
  applyCouponInput: ApplyCouponInput;
};


export type MutationCloseTicketArgs = {
  id: Scalars['Float'];
};


export type MutationCreateAskAmirhosseinArgs = {
  createAskAmirhosseinInput: CreateAskAmirhosseinInput;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationCreateCouponArgs = {
  createCouponInput: CreateCouponInput;
};


export type MutationCreateCourseArgs = {
  createCourseInput: CreateCourseInput;
};


export type MutationCreateExpertiseArgs = {
  createExpertiseInput: CreateExpertiseInput;
};


export type MutationCreateInstructorArgs = {
  createInstructorInput: CreateInstructorInput;
};


export type MutationCreateLectureArgs = {
  createLectureInput: CreateLectureInput;
};


export type MutationCreatePreRequirementArgs = {
  createPreRequirementInput: CreatePreRequirementInput;
};


export type MutationCreateQuestionArgs = {
  createQuestionInput: CreateQuestionInput;
};


export type MutationCreateReportArgs = {
  createReportInput: CreateReportInput;
};


export type MutationCreateSectionArgs = {
  createSectionInput: CreateSectionInput;
};


export type MutationCreateSocialArgs = {
  createSocialInput: CreateSocialInput;
};


export type MutationCreateTicketArgs = {
  createTicketInput: CreateTicketInput;
};


export type MutationCreateTodoArgs = {
  createTodoInput: CreateTodoInput;
};


export type MutationDecrementCartItemArgs = {
  decrementCartItem: DecrementCartItemInput;
};


export type MutationIncrementCartItemArgs = {
  incrementCartItem: IncrementCartItemInput;
};


export type MutationLimitedUpdateUserArgs = {
  limitedUpdateUserInput: LimitedUpdateUserInput;
};


export type MutationMarkExpertiseAsPrimaryArgs = {
  id: Scalars['Int'];
};


export type MutationPlaceOrderArgs = {
  placeOrderInput: PlaceOrderInput;
};


export type MutationPreSignUpArgs = {
  preSignUpInput: PreSignUpInput;
};


export type MutationPublishCourseArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveCommentArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveCouponArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveCourseArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveErrorLogArgs = {
  id: Scalars['String'];
};


export type MutationRemoveExpertiseArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveLectureArgs = {
  id: Scalars['Int'];
};


export type MutationRemovePreRequirementArgs = {
  id: Scalars['Int'];
};


export type MutationRemovePreSignUpCodeArgs = {
  removePreSignUpInput: RemovePreSignUpInput;
};


export type MutationRemoveQuestionArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveSectionArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveSocialArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveTodoArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserLogArgs = {
  id: Scalars['String'];
};


export type MutationReplyCommentArgs = {
  replyCommentInput: ReplyCommentInput;
};


export type MutationRestoreCommentArgs = {
  id: Scalars['ID'];
};


export type MutationRestoreCourseArgs = {
  id: Scalars['Int'];
};


export type MutationRestoreLectureArgs = {
  id: Scalars['Int'];
};


export type MutationRestorePreRequirementArgs = {
  id: Scalars['Int'];
};


export type MutationRestoreQuestionArgs = {
  id: Scalars['Int'];
};


export type MutationRestoreSectionArgs = {
  id: Scalars['Int'];
};


export type MutationRestoreUserArgs = {
  id: Scalars['Int'];
};


export type MutationSendTicketMessageArgs = {
  sendTicketMessageInput: SendTicketMessageInput;
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};


export type MutationSubscribeArgs = {
  subscribeInput: SubscribeInput;
};


export type MutationUpdateAskAmirhosseinAnswerArgs = {
  updateAskAmirhosseinInput: UpdateAskAmirhosseinInput;
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateCommentArgs = {
  updateCommentInput: UpdateCommentInput;
};


export type MutationUpdateCouponArgs = {
  updateCouponInput: UpdateCouponInput;
};


export type MutationUpdateCourseArgs = {
  updateCourseInput: UpdateCourseInput;
};


export type MutationUpdateErrorLogCommentArgs = {
  updateErrorLogComment: UpdateErrorLogComment;
};


export type MutationUpdateExpertiseArgs = {
  updateExpertiseInput: UpdateExpertiseInput;
};


export type MutationUpdateInstructorArgs = {
  updateInstructorInput: UpdateInstructorInput;
};


export type MutationUpdateLectureArgs = {
  updateLectureInput: UpdateLectureInput;
};


export type MutationUpdatePreRequirementArgs = {
  updatePreRequirementInput: UpdatePreRequirementInput;
};


export type MutationUpdateQuestionArgs = {
  updateQuestionInput: UpdateQuestionInput;
};


export type MutationUpdateQuestionAnswerArgs = {
  updateQuestionAnswerInput: UpdateQuestionAnswerInput;
};


export type MutationUpdateSectionArgs = {
  updateSectionInput: UpdateSectionInput;
};


export type MutationUpdateSocialArgs = {
  updateSocialInput: UpdateSocialInput;
};


export type MutationUpdateTodoArgs = {
  updateTodoInput: UpdateTodoInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationValidateExpertiseArgs = {
  id: Scalars['Int'];
};

export type Order = {
  __typename?: 'Order';
  /** creation date of order. */
  createdAt: Scalars['DateTime'];
  /** shows that order has discount or not. */
  hasDiscount: Scalars['Boolean'];
  /** order id. */
  id: Scalars['ID'];
  /** order items. */
  orderItems: Array<OrderItem>;
  /** payment method/gate. */
  paymentMethod: Scalars['String'];
  /** status of order which is enum. */
  status: OrderStatus;
  /** total price which is decimal. */
  totalPrice: Scalars['Float'];
  /** total price with discount which is decimal. */
  totalPriceWithDiscount: Scalars['Float'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  /** order item course. */
  course: Course;
  /** order item id. */
  id: Scalars['ID'];
  /** quantity of courses. */
  quantity: Scalars['Int'];
  /** unit price of order item which is decimal. */
  unitPrice: Scalars['Float'];
  /** unit price with discount of order item which is decimal. */
  unitPriceWithDiscount: Scalars['Float'];
};

export enum OrderStatus {
  Failed = 'FAILED',
  Fulfilled = 'FULFILLED',
  Pending = 'PENDING'
}

export type PaginatedCourses = {
  __typename?: 'PaginatedCourses';
  courses: Array<Course>;
  hasNext: Scalars['Boolean'];
  hasPrev: Scalars['Boolean'];
  page: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type PaginatedCoursesFilterInput = {
  /** course category id(s). */
  categories?: InputMaybe<Array<Scalars['ID']>>;
  /** course level which is an enum. */
  levels?: InputMaybe<Array<CourseLevel>>;
  /** page index(starts from 1). */
  page?: InputMaybe<Scalars['Int']>;
};

export type PlaceOrderInput = {
  /** target cart id which is uuid. */
  cartId: Scalars['String'];
};

export type PreRequirement = {
  __typename?: 'PreRequirement';
  /** pre requirement description in markup. */
  description: Scalars['String'];
  /** pre requirement id. */
  id: Scalars['ID'];
  /** an image or logo that relates to pre requirement. */
  image: Scalars['String'];
  /** pre requirement label/title. */
  label: Scalars['String'];
  /** level that pre requirement, require. */
  level: PreRequirementLevel;
};

export enum PreRequirementLevel {
  Advanced = 'ADVANCED',
  Basic = 'BASIC',
  Expert = 'EXPERT',
  Medium = 'MEDIUM'
}

export type PreSignUpInput = {
  /** an email to login. */
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  askAmirhossein: AskAmirhossein;
  askAmirhosseins: Array<AskAmirhossein>;
  /** returns a single cart that belongs to user or if the user is admin it can returns any of them. */
  cart: Cart;
  /** returns all of cart(only for admins). */
  carts: Array<Cart>;
  /** returns all categories. */
  categories: Array<Category>;
  /** returns a single category. */
  category: Category;
  /** returns a single course's comment. */
  comment: Comment;
  /** returns all course's comments. */
  comments: Array<Comment>;
  /** returns a single coupon. */
  coupon: Coupon;
  /** returns all coupons. */
  coupons: Array<Coupon>;
  /** returns a single published course. */
  course: Course;
  /** returns a single error log. */
  errorLog: ErrorLog;
  /** returns all error logs. */
  errorLogs: Array<ErrorLog>;
  /** returns a single expertise. */
  expertise: Expertise;
  /** returns all expertises. */
  expertises: Array<Expertise>;
  /** returns a single instructors. */
  instructor: Instructor;
  /** returns a single instructors course(only for instructors). */
  instructorCourse: Course;
  /** returns all instructors courses(only for instructors). */
  instructorCourses: Array<Course>;
  /** returns all instructors. */
  instructors: Array<Instructor>;
  /** returns a single lecture. */
  lecture: Lecture;
  /** returns all lectures. */
  lectures: Array<Lecture>;
  /** returns one of created licenses. */
  license: License;
  /** returns all of created licenses. */
  licenses: License;
  /** returns logged in user credentials. */
  me: User;
  /** returns a single user order or any other order if user is admin. */
  order: Order;
  /** returns all user orders or all orders if user is admin. */
  orders: Array<Order>;
  /** returns all published courses. */
  paginatedCourses: PaginatedCourses;
  /** returns a single pre requirement. */
  preRequirement: PreRequirement;
  /** returns all pre requirements. */
  preRequirements: Array<PreRequirement>;
  /** returns a single question. */
  question: Question;
  /** returns all questions. */
  questions: Array<Question>;
  /** returns one of reports(only for admins). */
  report: Report;
  /** returns all of reports(only for admins). */
  reports: Array<Report>;
  /** return a single section. */
  section: Section;
  /** returns all sections. */
  sections: Array<Section>;
  /** return a single social. */
  social: Social;
  /** returns all socials. */
  socials: Array<Social>;
  ticket: Ticket;
  tickets: Array<Ticket>;
  todo: Todo;
  /** returns a single user(only for admins). */
  user: User;
  /** returns a single user log. */
  userLog: ErrorLog;
  /** returns all users logs. */
  userLogs: Array<ErrorLog>;
  /** returns all users(only for admins). */
  users: Array<User>;
};


export type QueryAskAmirhosseinArgs = {
  findOneAskAmirhossein: FindOneAskAmirhosseinInput;
};


export type QueryAskAmirhosseinsArgs = {
  findAllAskAmirhosseinInput?: InputMaybe<FindAllAskAmirhosseinInput>;
};


export type QueryCartArgs = {
  id: Scalars['String'];
};


export type QueryCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryCommentArgs = {
  id: Scalars['ID'];
};


export type QueryCommentsArgs = {
  courseId: Scalars['ID'];
};


export type QueryCouponArgs = {
  id: Scalars['Int'];
};


export type QueryCourseArgs = {
  id: Scalars['Int'];
};


export type QueryErrorLogArgs = {
  id: Scalars['String'];
};


export type QueryExpertiseArgs = {
  id: Scalars['Int'];
};


export type QueryInstructorArgs = {
  id: Scalars['ID'];
};


export type QueryInstructorCourseArgs = {
  id: Scalars['Int'];
};


export type QueryLectureArgs = {
  id: Scalars['Int'];
};


export type QueryLicenseArgs = {
  id: Scalars['ID'];
};


export type QueryOrderArgs = {
  id: Scalars['Int'];
};


export type QueryPaginatedCoursesArgs = {
  paginatedCoursesFilterInput?: InputMaybe<PaginatedCoursesFilterInput>;
};


export type QueryPreRequirementArgs = {
  id: Scalars['Int'];
};


export type QueryPreRequirementsArgs = {
  id: Scalars['ID'];
};


export type QueryQuestionArgs = {
  id: Scalars['Int'];
};


export type QueryReportArgs = {
  id: Scalars['Int'];
};


export type QuerySectionArgs = {
  id: Scalars['Int'];
};


export type QuerySectionsArgs = {
  findAllSectionInput?: InputMaybe<FindAllSectionInput>;
};


export type QuerySocialArgs = {
  id: Scalars['Int'];
};


export type QueryTicketArgs = {
  id: Scalars['ID'];
};


export type QueryTodoArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUserLogArgs = {
  id: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  /** answer of question. */
  answer: Scalars['String'];
  /** course which question is related to. */
  course: Course;
  /** question creation date. */
  createdAt: Scalars['DateTime'];
  /** question id. */
  id: Scalars['ID'];
  /** state of question, if isClosed is true question and answer can't be modified. */
  isClosed: Scalars['Boolean'];
  /** body of question. */
  question: Scalars['String'];
  /** question update date. */
  updatedAt: Scalars['DateTime'];
  /** user that answered the question. */
  whoAnswered?: Maybe<User>;
  /** user that asked the question. */
  whoAsked: User;
};

export type RemovePreSignUpInput = {
  /** an email to login. */
  email: Scalars['String'];
};

export type ReplyCommentInput = {
  /** comment content or body. */
  content: Scalars['String'];
  /** parent comment id. */
  parentId: Scalars['ID'];
};

export type Report = {
  __typename?: 'Report';
  /** report content which should contain reason and a short description about report. */
  content: Scalars['String'];
  /** report id. */
  id: Scalars['ID'];
  /** time that report been captured. */
  reportedAt: Scalars['DateTime'];
  /** report title. */
  title: Scalars['String'];
  /** user who reported if the user is logged in. */
  user: User;
};

export type Section = {
  __typename?: 'Section';
  /** parent course of section. */
  course?: Maybe<Course>;
  /** section creation date. */
  createdAt: Scalars['DateTime'];
  /** section description in markup. */
  description: Scalars['String'];
  /** total section duration. */
  duration: Scalars['Int'];
  /** section. */
  id: Scalars['ID'];
  /** section label/title. */
  label: Scalars['String'];
  /** section related lectures. */
  lectures?: Maybe<Lecture>;
  /** section update date. */
  updatedAt: Scalars['DateTime'];
};

export type SendTicketMessageInput = {
  message: Scalars['String'];
  ticketId: Scalars['ID'];
};

export type SignInInput = {
  /** an email to login. */
  email: Scalars['String'];
  /** at least 8 character password. */
  password: Scalars['String'];
};

export type SignUpInput = {
  code: Scalars['String'];
  /** an email to login. */
  email: Scalars['String'];
  /** at least 8 character, one character, and one number password. */
  password: Scalars['String'];
};

export type Social = {
  __typename?: 'Social';
  /** social id. */
  id: Scalars['ID'];
  /** link to user social account/page. */
  link: Scalars['String'];
  /** social type which is description. */
  type: SocialType;
  /** social update date. */
  updatedAt: Scalars['DateTime'];
};

export enum SocialType {
  Email = 'EMAIL',
  Facebook = 'FACEBOOK',
  Github = 'GITHUB',
  Gitlab = 'GITLAB',
  Instagram = 'INSTAGRAM',
  Linkedin = 'LINKEDIN',
  Other = 'OTHER',
  Telegram = 'TELEGRAM',
  Tweeter = 'TWEETER',
  Whatsapp = 'WHATSAPP'
}

export type SubscribeInput = {
  email: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  ticketMessages: Array<TicketMessage>;
  tickets: Array<Ticket>;
};

export type Ticket = {
  __typename?: 'Ticket';
  /** time that ticket got closed. */
  closedAt?: Maybe<Scalars['DateTime']>;
  /** time of ticket creation. */
  createdAt: Scalars['DateTime'];
  /** ticket detailed description. */
  description: Scalars['String'];
  /** ticket id. */
  id: Scalars['ID'];
  /** determines that any new message can be assigned to ticket or not. */
  isClosed: Scalars['Boolean'];
  /** list of messages in ticket in chat kinda thing. */
  messages?: Maybe<Array<TicketMessage>>;
  /** ticket priority which is an enum. */
  priority: TicketPriority;
  /** ticket title. */
  title: Scalars['String'];
  /** ticket topic which is an enum. */
  topic: TicketTopic;
  /** user who sent the ticket. */
  whoAsked: User;
};

export type TicketMessage = {
  __typename?: 'TicketMessage';
  /** ticket message id. */
  id: Scalars['ID'];
  /** content of ticket message. */
  message: Scalars['String'];
  /** time that user sent the ticket message. */
  sentAt: Scalars['DateTime'];
  /** parent ticket of ticket message. */
  ticket: Ticket;
  /** user who sent this ticket message. */
  user: User;
};

export enum TicketPriority {
  Hight = 'HIGHT',
  Low = 'LOW',
  Moderate = 'MODERATE'
}

export enum TicketTopic {
  Course = 'COURSE',
  Improvement = 'IMPROVEMENT',
  Other = 'OTHER',
  Payment = 'PAYMENT'
}

export type Todo = {
  __typename?: 'Todo';
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type UpdateAskAmirhosseinInput = {
  answer: Scalars['String'];
  id: Scalars['ID'];
};

export type UpdateCategoryInput = {
  /** target category id. */
  id: Scalars['Int'];
  /** category label/tag */
  label?: InputMaybe<Scalars['String']>;
};

export type UpdateCommentInput = {
  /** comment content or body. */
  content: Scalars['String'];
  /** target comment id. */
  id: Scalars['ID'];
};

export type UpdateCouponInput = {
  /** make coupon that applies to all courses, makes a conflict whit coursesId field. */
  applyToEveryThing?: InputMaybe<Scalars['Boolean']>;
  /** a unique coupon code. */
  code?: InputMaybe<Scalars['String']>;
  /** courses that coupon has effect on. */
  coursesId?: InputMaybe<Array<Scalars['ID']>>;
  /** coupon description or reason of it. */
  description?: InputMaybe<Scalars['String']>;
  /** expiration date of coupon which should be utc */
  expiresAt?: InputMaybe<Scalars['DateTime']>;
  /** target coupon id. */
  id: Scalars['ID'];
  /** maximum effect or reduction that coupon can apply. */
  maxEffect?: InputMaybe<Scalars['String']>;
  /** amount of effect that coupon has. */
  percent?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseInput = {
  /** list of categories ids. */
  categoriesId?: InputMaybe<Array<Scalars['ID']>>;
  /** course description. */
  description?: InputMaybe<Scalars['String']>;
  /** amount of course discount(in percent). */
  discountPercent?: InputMaybe<Scalars['String']>;
  /** target course id. */
  id: Scalars['Int'];
  /** list of instructors ids. */
  instructorsId?: InputMaybe<Array<Scalars['ID']>>;
  /** course level which is a enum. */
  level?: InputMaybe<CourseLevel>;
  /** pre requirements description. */
  preRequirementsDescription?: InputMaybe<Scalars['String']>;
  /** list of pre requirements ids. */
  preRequirementsId?: InputMaybe<Array<Scalars['ID']>>;
  /** course price. */
  price?: InputMaybe<Scalars['String']>;
  /** amount of course progress(in percent) */
  progress?: InputMaybe<Scalars['String']>;
  /** list of sections ids. */
  sectionsId?: InputMaybe<Array<Scalars['ID']>>;
  /** course short description. */
  shortDescription?: InputMaybe<Scalars['String']>;
  /** spot player course id. */
  spotPlayerCourseId?: InputMaybe<Scalars['ID']>;
  /** course title. */
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateErrorLogComment = {
  /** error comment or description or any other note about fixing it. */
  comment: Scalars['String'];
  /** target error log id. */
  errorLogId: Scalars['String'];
};

export type UpdateExpertiseInput = {
  /** target expertise id. */
  id: Scalars['ID'];
  /** expertise title/label. */
  label?: InputMaybe<Scalars['String']>;
  /** expertise level based on junior, senior, mid-level and so on. */
  level?: InputMaybe<ExpertiseLevel>;
};

export type UpdateInstructorInput = {
  /** a short description about instructor. */
  about: Scalars['String'];
  /** target instructor id. */
  id: Scalars['ID'];
};

export type UpdateLectureInput = {
  /** total duration of lecture. */
  duration?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  /** lecture label/title. */
  label?: InputMaybe<Scalars['String']>;
  /** section id that lecture gonna belongs to. */
  sectionId?: InputMaybe<Scalars['ID']>;
};

export type UpdatePreRequirementInput = {
  /** pre requirement description. */
  description?: InputMaybe<Scalars['String']>;
  /** target pre requirement id. */
  id: Scalars['ID'];
  /** related image to pre requirement. */
  image?: InputMaybe<Scalars['String']>;
  /** pre requirement label/title. */
  label?: InputMaybe<Scalars['String']>;
  /** pre requirement level. */
  level?: InputMaybe<PreRequirementLevel>;
};

export type UpdateQuestionAnswerInput = {
  /** question answer. */
  answer: Scalars['String'];
  /** target question id. */
  id: Scalars['ID'];
};

export type UpdateQuestionInput = {
  /** target question id. */
  id: Scalars['ID'];
  /** actual question. */
  question?: InputMaybe<Scalars['String']>;
};

export type UpdateSectionInput = {
  /** section description. */
  description?: InputMaybe<Scalars['String']>;
  /** total section duration. */
  duration?: InputMaybe<Scalars['Int']>;
  /** target section id. */
  id: Scalars['ID'];
  /** section label/title. */
  label?: InputMaybe<Scalars['String']>;
};

export type UpdateSocialInput = {
  /** target social id. */
  id: Scalars['ID'];
  /** link to social media account/page. */
  link?: InputMaybe<Scalars['String']>;
  /** social type which is an enum like GITHUB. */
  type?: InputMaybe<SocialType>;
};

export type UpdateTodoInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateUserInput = {
  /** user email. */
  email?: InputMaybe<Scalars['String']>;
  /** user firstname. */
  firstname?: InputMaybe<Scalars['String']>;
  /** target user id. */
  id: Scalars['ID'];
  /** user lastname. */
  lastname?: InputMaybe<Scalars['String']>;
  /** user phone number. */
  phoneNumber?: InputMaybe<Scalars['String']>;
  /** user role which is an enum, like CUSTOMER, INSTRUCTOR, ADMIN. */
  role?: InputMaybe<UserRole>;
  /** user score gain rate. */
  scoreGainRate?: InputMaybe<Scalars['String']>;
  /** user scores. */
  scores?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  /** all of user answered question. */
  answeredQuestions?: Maybe<Array<Question>>;
  /** all of user asked questions. */
  askedQuestions?: Maybe<Array<Question>>;
  avatar?: Maybe<Avatar>;
  cart: Cart;
  /** all user comments. */
  comments?: Maybe<Array<Comment>>;
  /** all of user bought courses. */
  courses?: Maybe<Array<Course>>;
  /** user creation date. */
  createdAt: Scalars['DateTime'];
  /** user created category, its useful when user is admin or instructor. */
  createdCategories?: Maybe<Array<Category>>;
  /** user email which is unique and must for sign up. */
  email: Scalars['String'];
  /** user firstname. */
  firstname?: Maybe<Scalars['String']>;
  /** user id. */
  id: Scalars['ID'];
  /** if user is an instructor this field relates to. */
  instructor?: Maybe<Instructor>;
  /** user lastname. */
  lastname?: Maybe<Scalars['String']>;
  /** all of user orders. */
  orders?: Maybe<Array<Order>>;
  /** user phone number which is unique. */
  phoneNumber?: Maybe<Scalars['String']>;
  /** user role which is enum. */
  role: UserRole;
  /** user score gain rate which depends on user activity. */
  scoreGainRate: Scalars['Float'];
  /** total scores gained by user. */
  scores: Scalars['Float'];
  /** user update date. */
  updatedAt: Scalars['DateTime'];
};

export type UserLog = {
  __typename?: 'UserLog';
  /** user log id. */
  id: Scalars['String'];
  /** determine wether user is logged in or logged out. */
  status: UserLogStatus;
  /** time that log is created. */
  time: Scalars['DateTime'];
  /** user related. */
  user: User;
};

export enum UserLogStatus {
  LoggedIn = 'LOGGED_IN',
  LoggedOut = 'LOGGED_OUT'
}

export enum UserRole {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Instructor = 'INSTRUCTOR'
}

export type ValidatedEmail = {
  __typename?: 'ValidatedEmail';
  /** validated email. */
  email: Scalars['String'];
  /** validation expiration date. */
  expiresAt: Scalars['DateTime'];
  /** validated email id. */
  id: Scalars['ID'];
};

export type PreSignUpMutationVariables = Exact<{
  preSignUpInput: PreSignUpInput;
}>;


export type PreSignUpMutation = { __typename?: 'Mutation', preSignUp: { __typename?: 'ValidatedEmail', id: string, email: string, expiresAt: any } };

export type RemoveEmailValidationCodeMutationVariables = Exact<{
  removePreSignUpInput: RemovePreSignUpInput;
}>;


export type RemoveEmailValidationCodeMutation = { __typename?: 'Mutation', removePreSignUpCode: { __typename?: 'ValidatedEmail', id: string } };

export type SignUpMutationVariables = Exact<{
  signUpInput: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', id: string, email: string } };

export type SignInMutationVariables = Exact<{
  signInInput: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null, email: string, role: UserRole } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutMessage', message: string, userEmail: string, userId: string, userRole: UserRole } };

export type AddCartItemMutationVariables = Exact<{
  addCartItemInput: AddCartItemInput;
}>;


export type AddCartItemMutation = { __typename?: 'Mutation', addCartItem: { __typename?: 'CartItem', id: string } };

export type DecrementCartItemMutationVariables = Exact<{
  decrementCartItem: DecrementCartItemInput;
}>;


export type DecrementCartItemMutation = { __typename?: 'Mutation', decrementCartItem: { __typename?: 'CartItem', id: string } };

export type CartQueryVariables = Exact<{
  cartId: Scalars['String'];
}>;


export type CartQuery = { __typename?: 'Query', cart: { __typename?: 'Cart', id: string, createdAt: any, totalPrice: string, totalPriceWithDiscount: string, cartItems?: Array<{ __typename?: 'CartItem', id: string, unitPrice: string, unitPriceWithDiscount: number, course: { __typename?: 'Course', id: string, title: string, price: number, instructors: Array<{ __typename?: 'Instructor', user: { __typename?: 'User', firstname?: string | null, lastname?: string | null } }>, image: { __typename?: 'CourseImage', image: string } } }> | null } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, label: string }> };

export type PostCommentMutationVariables = Exact<{
  createCommentInput: CreateCommentInput;
}>;


export type PostCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, content: string, isPublished: boolean, createdAt: any } };

export type ReplyCommentMutationVariables = Exact<{
  replyCommentInput: ReplyCommentInput;
}>;


export type ReplyCommentMutation = { __typename?: 'Mutation', replyComment: { __typename?: 'Comment', id: string } };

export type CommentsQueryVariables = Exact<{
  courseId: Scalars['ID'];
}>;


export type CommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, updatedAt: any, replies?: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null, role: UserRole, avatar?: { __typename?: 'Avatar', id: string, fullPath: string } | null } }> | null, author: { __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null, role: UserRole, avatar?: { __typename?: 'Avatar', id: string, fullPath: string } | null } }> };

export type CourseQueryVariables = Exact<{
  courseId: Scalars['Int'];
}>;


export type CourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', id: string, title: string, description: string, preRequirementsDescription?: string | null, shortDescription: string, hoursCount: number, lecturesCount: number, level: CourseLevel, participantsCount: number, price: number, progress: number, createdAt: any, updatedAt: any, image: { __typename?: 'CourseImage', id: string, image: string, coverImage: string }, instructors: Array<{ __typename?: 'Instructor', id: string, user: { __typename?: 'User', firstname?: string | null, lastname?: string | null, avatar?: { __typename?: 'Avatar', id: string, fullPath: string } | null }, expertises: Array<{ __typename?: 'Expertise', id: string, label: string, level: ExpertiseLevel, isPrimary: boolean }> }> } };

export type PaginatedCoursesQueryVariables = Exact<{
  paginatedCoursesFilterInput?: InputMaybe<PaginatedCoursesFilterInput>;
}>;


export type PaginatedCoursesQuery = { __typename?: 'Query', paginatedCourses: { __typename?: 'PaginatedCourses', page: number, totalPages: number, hasNext: boolean, hasPrev: boolean, courses: Array<{ __typename?: 'Course', id: string, title: string, shortDescription: string, description: string, hoursCount: number, lecturesCount: number, level: CourseLevel, participantsCount: number, price: number, createdAt: any, updatedAt: any, image: { __typename?: 'CourseImage', image: string } }> } };

export type PreRequirementsQueryVariables = Exact<{
  courseId: Scalars['ID'];
}>;


export type PreRequirementsQuery = { __typename?: 'Query', preRequirements: Array<{ __typename?: 'PreRequirement', id: string, label: string, description: string, level: PreRequirementLevel, image: string }> };

export type LimitedUpdateUserMutationVariables = Exact<{
  limitedUpdateUserInput: LimitedUpdateUserInput;
}>;


export type LimitedUpdateUserMutation = { __typename?: 'Mutation', limitedUpdateUser: { __typename?: 'User', id: string, email: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null, email: string, phoneNumber?: string | null, createdAt: any, updatedAt: any, role: UserRole, avatar?: { __typename?: 'Avatar', id: string, fullPath: string } | null, cart: { __typename?: 'Cart', id: string } } };


export const PreSignUpDocument = `
    mutation PreSignUp($preSignUpInput: PreSignUpInput!) {
  preSignUp(preSignUpInput: $preSignUpInput) {
    id
    email
    expiresAt
  }
}
    `;
export const usePreSignUpMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<PreSignUpMutation, TError, PreSignUpMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<PreSignUpMutation, TError, PreSignUpMutationVariables, TContext>(
      ['PreSignUp'],
      (variables?: PreSignUpMutationVariables) => fetcher<PreSignUpMutation, PreSignUpMutationVariables>(client, PreSignUpDocument, variables, headers)(),
      options
    );
usePreSignUpMutation.fetcher = (client: GraphQLClient, variables: PreSignUpMutationVariables, headers?: RequestInit['headers']) => fetcher<PreSignUpMutation, PreSignUpMutationVariables>(client, PreSignUpDocument, variables, headers);
export const RemoveEmailValidationCodeDocument = `
    mutation RemoveEmailValidationCode($removePreSignUpInput: RemovePreSignUpInput!) {
  removePreSignUpCode(removePreSignUpInput: $removePreSignUpInput) {
    id
  }
}
    `;
export const useRemoveEmailValidationCodeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RemoveEmailValidationCodeMutation, TError, RemoveEmailValidationCodeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RemoveEmailValidationCodeMutation, TError, RemoveEmailValidationCodeMutationVariables, TContext>(
      ['RemoveEmailValidationCode'],
      (variables?: RemoveEmailValidationCodeMutationVariables) => fetcher<RemoveEmailValidationCodeMutation, RemoveEmailValidationCodeMutationVariables>(client, RemoveEmailValidationCodeDocument, variables, headers)(),
      options
    );
useRemoveEmailValidationCodeMutation.fetcher = (client: GraphQLClient, variables: RemoveEmailValidationCodeMutationVariables, headers?: RequestInit['headers']) => fetcher<RemoveEmailValidationCodeMutation, RemoveEmailValidationCodeMutationVariables>(client, RemoveEmailValidationCodeDocument, variables, headers);
export const SignUpDocument = `
    mutation SignUp($signUpInput: SignUpInput!) {
  signUp(signUpInput: $signUpInput) {
    id
    email
  }
}
    `;
export const useSignUpMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignUpMutation, TError, SignUpMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignUpMutation, TError, SignUpMutationVariables, TContext>(
      ['SignUp'],
      (variables?: SignUpMutationVariables) => fetcher<SignUpMutation, SignUpMutationVariables>(client, SignUpDocument, variables, headers)(),
      options
    );
useSignUpMutation.fetcher = (client: GraphQLClient, variables: SignUpMutationVariables, headers?: RequestInit['headers']) => fetcher<SignUpMutation, SignUpMutationVariables>(client, SignUpDocument, variables, headers);
export const SignInDocument = `
    mutation SignIn($signInInput: SignInInput!) {
  signIn(signInInput: $signInInput) {
    id
    firstname
    lastname
    email
    role
  }
}
    `;
export const useSignInMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignInMutation, TError, SignInMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignInMutation, TError, SignInMutationVariables, TContext>(
      ['SignIn'],
      (variables?: SignInMutationVariables) => fetcher<SignInMutation, SignInMutationVariables>(client, SignInDocument, variables, headers)(),
      options
    );
useSignInMutation.fetcher = (client: GraphQLClient, variables: SignInMutationVariables, headers?: RequestInit['headers']) => fetcher<SignInMutation, SignInMutationVariables>(client, SignInDocument, variables, headers);
export const LogoutDocument = `
    mutation Logout {
  logout {
    message
    userEmail
    userId
    userRole
  }
}
    `;
export const useLogoutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
      ['Logout'],
      (variables?: LogoutMutationVariables) => fetcher<LogoutMutation, LogoutMutationVariables>(client, LogoutDocument, variables, headers)(),
      options
    );
useLogoutMutation.fetcher = (client: GraphQLClient, variables?: LogoutMutationVariables, headers?: RequestInit['headers']) => fetcher<LogoutMutation, LogoutMutationVariables>(client, LogoutDocument, variables, headers);
export const AddCartItemDocument = `
    mutation AddCartItem($addCartItemInput: AddCartItemInput!) {
  addCartItem(addCartItemInput: $addCartItemInput) {
    id
  }
}
    `;
export const useAddCartItemMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddCartItemMutation, TError, AddCartItemMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddCartItemMutation, TError, AddCartItemMutationVariables, TContext>(
      ['AddCartItem'],
      (variables?: AddCartItemMutationVariables) => fetcher<AddCartItemMutation, AddCartItemMutationVariables>(client, AddCartItemDocument, variables, headers)(),
      options
    );
useAddCartItemMutation.fetcher = (client: GraphQLClient, variables: AddCartItemMutationVariables, headers?: RequestInit['headers']) => fetcher<AddCartItemMutation, AddCartItemMutationVariables>(client, AddCartItemDocument, variables, headers);
export const DecrementCartItemDocument = `
    mutation DecrementCartItem($decrementCartItem: DecrementCartItemInput!) {
  decrementCartItem(decrementCartItem: $decrementCartItem) {
    id
  }
}
    `;
export const useDecrementCartItemMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DecrementCartItemMutation, TError, DecrementCartItemMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DecrementCartItemMutation, TError, DecrementCartItemMutationVariables, TContext>(
      ['DecrementCartItem'],
      (variables?: DecrementCartItemMutationVariables) => fetcher<DecrementCartItemMutation, DecrementCartItemMutationVariables>(client, DecrementCartItemDocument, variables, headers)(),
      options
    );
useDecrementCartItemMutation.fetcher = (client: GraphQLClient, variables: DecrementCartItemMutationVariables, headers?: RequestInit['headers']) => fetcher<DecrementCartItemMutation, DecrementCartItemMutationVariables>(client, DecrementCartItemDocument, variables, headers);
export const CartDocument = `
    query Cart($cartId: String!) {
  cart(id: $cartId) {
    id
    createdAt
    totalPrice
    totalPriceWithDiscount
    cartItems {
      id
      unitPrice
      unitPriceWithDiscount
      course {
        id
        title
        price
        instructors {
          user {
            firstname
            lastname
          }
        }
        image {
          image
        }
      }
    }
  }
}
    `;
export const useCartQuery = <
      TData = CartQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: CartQueryVariables,
      options?: UseQueryOptions<CartQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CartQuery, TError, TData>(
      ['Cart', variables],
      fetcher<CartQuery, CartQueryVariables>(client, CartDocument, variables, headers),
      options
    );

useCartQuery.getKey = (variables: CartQueryVariables) => ['Cart', variables];
;

useCartQuery.fetcher = (client: GraphQLClient, variables: CartQueryVariables, headers?: RequestInit['headers']) => fetcher<CartQuery, CartQueryVariables>(client, CartDocument, variables, headers);
export const CategoriesDocument = `
    query Categories {
  categories {
    id
    label
  }
}
    `;
export const useCategoriesQuery = <
      TData = CategoriesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: CategoriesQueryVariables,
      options?: UseQueryOptions<CategoriesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CategoriesQuery, TError, TData>(
      variables === undefined ? ['Categories'] : ['Categories', variables],
      fetcher<CategoriesQuery, CategoriesQueryVariables>(client, CategoriesDocument, variables, headers),
      options
    );

useCategoriesQuery.getKey = (variables?: CategoriesQueryVariables) => variables === undefined ? ['Categories'] : ['Categories', variables];
;

useCategoriesQuery.fetcher = (client: GraphQLClient, variables?: CategoriesQueryVariables, headers?: RequestInit['headers']) => fetcher<CategoriesQuery, CategoriesQueryVariables>(client, CategoriesDocument, variables, headers);
export const PostCommentDocument = `
    mutation PostComment($createCommentInput: CreateCommentInput!) {
  createComment(createCommentInput: $createCommentInput) {
    id
    content
    isPublished
    createdAt
  }
}
    `;
export const usePostCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<PostCommentMutation, TError, PostCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<PostCommentMutation, TError, PostCommentMutationVariables, TContext>(
      ['PostComment'],
      (variables?: PostCommentMutationVariables) => fetcher<PostCommentMutation, PostCommentMutationVariables>(client, PostCommentDocument, variables, headers)(),
      options
    );
usePostCommentMutation.fetcher = (client: GraphQLClient, variables: PostCommentMutationVariables, headers?: RequestInit['headers']) => fetcher<PostCommentMutation, PostCommentMutationVariables>(client, PostCommentDocument, variables, headers);
export const ReplyCommentDocument = `
    mutation ReplyComment($replyCommentInput: ReplyCommentInput!) {
  replyComment(replyCommentInput: $replyCommentInput) {
    id
  }
}
    `;
export const useReplyCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ReplyCommentMutation, TError, ReplyCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ReplyCommentMutation, TError, ReplyCommentMutationVariables, TContext>(
      ['ReplyComment'],
      (variables?: ReplyCommentMutationVariables) => fetcher<ReplyCommentMutation, ReplyCommentMutationVariables>(client, ReplyCommentDocument, variables, headers)(),
      options
    );
useReplyCommentMutation.fetcher = (client: GraphQLClient, variables: ReplyCommentMutationVariables, headers?: RequestInit['headers']) => fetcher<ReplyCommentMutation, ReplyCommentMutationVariables>(client, ReplyCommentDocument, variables, headers);
export const CommentsDocument = `
    query Comments($courseId: ID!) {
  comments(courseId: $courseId) {
    id
    content
    createdAt
    updatedAt
    replies {
      id
      content
      createdAt
      author {
        id
        firstname
        lastname
        role
        avatar {
          id
          fullPath
        }
      }
    }
    author {
      id
      firstname
      lastname
      role
      avatar {
        id
        fullPath
      }
    }
  }
}
    `;
export const useCommentsQuery = <
      TData = CommentsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: CommentsQueryVariables,
      options?: UseQueryOptions<CommentsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CommentsQuery, TError, TData>(
      ['Comments', variables],
      fetcher<CommentsQuery, CommentsQueryVariables>(client, CommentsDocument, variables, headers),
      options
    );

useCommentsQuery.getKey = (variables: CommentsQueryVariables) => ['Comments', variables];
;

useCommentsQuery.fetcher = (client: GraphQLClient, variables: CommentsQueryVariables, headers?: RequestInit['headers']) => fetcher<CommentsQuery, CommentsQueryVariables>(client, CommentsDocument, variables, headers);
export const CourseDocument = `
    query Course($courseId: Int!) {
  course(id: $courseId) {
    id
    title
    description
    preRequirementsDescription
    shortDescription
    hoursCount
    lecturesCount
    level
    participantsCount
    price
    progress
    createdAt
    updatedAt
    image {
      id
      image
      coverImage
    }
    instructors {
      id
      user {
        firstname
        lastname
      }
      expertises {
        id
        label
        level
        isPrimary
      }
      user {
        avatar {
          id
          fullPath
        }
      }
    }
  }
}
    `;
export const useCourseQuery = <
      TData = CourseQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: CourseQueryVariables,
      options?: UseQueryOptions<CourseQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CourseQuery, TError, TData>(
      ['Course', variables],
      fetcher<CourseQuery, CourseQueryVariables>(client, CourseDocument, variables, headers),
      options
    );

useCourseQuery.getKey = (variables: CourseQueryVariables) => ['Course', variables];
;

useCourseQuery.fetcher = (client: GraphQLClient, variables: CourseQueryVariables, headers?: RequestInit['headers']) => fetcher<CourseQuery, CourseQueryVariables>(client, CourseDocument, variables, headers);
export const PaginatedCoursesDocument = `
    query PaginatedCourses($paginatedCoursesFilterInput: PaginatedCoursesFilterInput) {
  paginatedCourses(paginatedCoursesFilterInput: $paginatedCoursesFilterInput) {
    page
    totalPages
    hasNext
    hasPrev
    courses {
      id
      title
      shortDescription
      description
      hoursCount
      lecturesCount
      level
      participantsCount
      price
      createdAt
      updatedAt
      image {
        image
      }
    }
  }
}
    `;
export const usePaginatedCoursesQuery = <
      TData = PaginatedCoursesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PaginatedCoursesQueryVariables,
      options?: UseQueryOptions<PaginatedCoursesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PaginatedCoursesQuery, TError, TData>(
      variables === undefined ? ['PaginatedCourses'] : ['PaginatedCourses', variables],
      fetcher<PaginatedCoursesQuery, PaginatedCoursesQueryVariables>(client, PaginatedCoursesDocument, variables, headers),
      options
    );

usePaginatedCoursesQuery.getKey = (variables?: PaginatedCoursesQueryVariables) => variables === undefined ? ['PaginatedCourses'] : ['PaginatedCourses', variables];
;

usePaginatedCoursesQuery.fetcher = (client: GraphQLClient, variables?: PaginatedCoursesQueryVariables, headers?: RequestInit['headers']) => fetcher<PaginatedCoursesQuery, PaginatedCoursesQueryVariables>(client, PaginatedCoursesDocument, variables, headers);
export const PreRequirementsDocument = `
    query PreRequirements($courseId: ID!) {
  preRequirements(id: $courseId) {
    id
    label
    description
    level
    image
  }
}
    `;
export const usePreRequirementsQuery = <
      TData = PreRequirementsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PreRequirementsQueryVariables,
      options?: UseQueryOptions<PreRequirementsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PreRequirementsQuery, TError, TData>(
      ['PreRequirements', variables],
      fetcher<PreRequirementsQuery, PreRequirementsQueryVariables>(client, PreRequirementsDocument, variables, headers),
      options
    );

usePreRequirementsQuery.getKey = (variables: PreRequirementsQueryVariables) => ['PreRequirements', variables];
;

usePreRequirementsQuery.fetcher = (client: GraphQLClient, variables: PreRequirementsQueryVariables, headers?: RequestInit['headers']) => fetcher<PreRequirementsQuery, PreRequirementsQueryVariables>(client, PreRequirementsDocument, variables, headers);
export const LimitedUpdateUserDocument = `
    mutation LimitedUpdateUser($limitedUpdateUserInput: LimitedUpdateUserInput!) {
  limitedUpdateUser(limitedUpdateUserInput: $limitedUpdateUserInput) {
    id
    email
  }
}
    `;
export const useLimitedUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LimitedUpdateUserMutation, TError, LimitedUpdateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LimitedUpdateUserMutation, TError, LimitedUpdateUserMutationVariables, TContext>(
      ['LimitedUpdateUser'],
      (variables?: LimitedUpdateUserMutationVariables) => fetcher<LimitedUpdateUserMutation, LimitedUpdateUserMutationVariables>(client, LimitedUpdateUserDocument, variables, headers)(),
      options
    );
useLimitedUpdateUserMutation.fetcher = (client: GraphQLClient, variables: LimitedUpdateUserMutationVariables, headers?: RequestInit['headers']) => fetcher<LimitedUpdateUserMutation, LimitedUpdateUserMutationVariables>(client, LimitedUpdateUserDocument, variables, headers);
export const MeDocument = `
    query Me {
  me {
    id
    firstname
    lastname
    email
    phoneNumber
    createdAt
    updatedAt
    role
    avatar {
      id
      fullPath
    }
    cart {
      id
    }
  }
}
    `;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['Me'] : ['Me', variables],
      fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers),
      options
    );

useMeQuery.getKey = (variables?: MeQueryVariables) => variables === undefined ? ['Me'] : ['Me', variables];
;

useMeQuery.fetcher = (client: GraphQLClient, variables?: MeQueryVariables, headers?: RequestInit['headers']) => fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers);