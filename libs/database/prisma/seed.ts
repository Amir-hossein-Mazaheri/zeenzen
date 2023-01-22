/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import * as moment from 'moment';
import * as argon2 from 'argon2';

const isTest = process.env.NODE_ENV === 'tests';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://${process.env.DATABASE_USERNAME}:${
        process.env.DATABASE_PASSWORD
      }@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${
        isTest ? process.env.TEST_DATABASE : process.env.DATABASE
      }?schema=public`,
    },
  },
  errorFormat: 'pretty',
  log: ['error', 'info', 'query', 'warn'],
});

export async function seedDb() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error("Can't seed db in production mode.");
  }

  await prisma.$transaction(async (tx) => {
    async function clearDb() {
      const tablenames = await tx.$queryRaw<
        Array<{ tablename: string }>
      >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

      const tables = tablenames
        .map(({ tablename }) => tablename)
        .filter((name) => name !== '_prisma_migrations')
        .map((name) => `"public"."${name}"`)
        .join(', ');

      try {
        await tx.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
      } catch (error) {
        console.log({ error });

        throw error;
      }
    }

    await clearDb();

    const customer = await tx.user.create({
      data: {
        email: 'customer@test.com',
        password: await argon2.hash('123456'),
        firstname: 'Test',
        lastname: 'Customer',

        cart: {
          create: {},
        },
      },
      include: {
        cart: true,
      },
    });

    const user = await tx.user.create({
      data: {
        email: 'user@test.com',
        password: await argon2.hash('123456'),
        firstname: 'Test',
        lastname: 'User',

        cart: {
          create: {},
        },
      },
      include: {
        cart: true,
      },
    });

    const admin = await tx.user.create({
      include: {
        instructor: true,
      },
      data: {
        email: 'admin@test.com',
        password: await argon2.hash('123456'),
        role: 'ADMIN',
        firstname: 'Test',
        lastname: 'Admin',

        cart: {
          create: {},
        },

        instructor: {
          create: {
            about:
              'Im an instructor also admin of ZeenZen website in the test environment.',

            expertises: {
              createMany: {
                data: [
                  {
                    label: 'ReactJS',
                    level: 'MID_SENIOR',
                    validated: true,
                    isPrimary: true,
                  },
                  {
                    label: 'VueJS',
                    level: 'SENIOR',
                    validated: true,
                  },
                  {
                    label: 'NextJS',
                    level: 'EXPERT',
                    validated: true,
                  },
                ],
              },
            },

            socials: {
              create: [
                {
                  type: 'TELEGRAM',
                  link: 'https://t.me/@test-admin',
                },
                {
                  type: 'LINKEDIN',
                  link: 'https://linkedin.com/@test-admin',
                },
              ],
            },
          },
        },
      },
    });

    const instructor = await tx.user.create({
      include: {
        instructor: true,
      },
      data: {
        email: 'instructor@test.com',
        password: await argon2.hash('123456'),
        role: 'INSTRUCTOR',
        firstname: 'Test',
        lastname: 'Instructor',

        cart: {
          create: {},
        },

        instructor: {
          create: {
            about: '',

            expertises: {
              createMany: {
                data: [
                  {
                    label: 'Angular',
                    level: 'SENIOR',
                    validated: true,
                    isPrimary: true,
                  },
                  {
                    label: 'Blockchain',
                    level: 'JUNIOR',
                    validated: true,
                  },
                  {
                    label: 'Rust',
                    level: 'MID_SENIOR',
                    validated: true,
                  },
                ],
              },
            },

            socials: {
              create: [
                {
                  type: 'TELEGRAM',
                  link: 'https://t.me/@test-instructor',
                },
                {
                  type: 'LINKEDIN',
                  link: 'https://linkedin.com/@test-instructor',
                },
                {
                  type: 'GITHUB',
                  link: 'https://github.com/@test-instructor',
                },
              ],
            },
          },
        },
      },
    });

    const reactJsCategory = await tx.category.create({
      data: {
        label: 'ReactJS',
      },
    });

    const jsCategory = await tx.category.create({
      data: {
        label: 'JavaScript',
      },
    });

    const htmlCategory = await tx.category.create({
      data: {
        label: 'HTML',
      },
    });

    const courseOne = await tx.course.create({
      data: {
        title: 'Test Course One',
        description: 'Some Random Description For Course One',
        shortDescription: 'Short Description For Course One',
        preRequirementsDescription: 'PreRequirement description',
        level: 'INTERMEDIATE',
        price: '200000.85',
        progress: 10,
        isDraft: false,
        hoursCount: 20,
        lecturesCount: 25,
        spotPlayerCourseId: 'some-random-spot-player-course-id',

        image: {
          create: {
            image: 'https://google.com',
            coverImage: 'https://google.com',
          },
        },

        questionHub: {
          create: {},
        },

        instructors: {
          connect: [
            {
              id: admin.instructor.id,
            },
            {
              id: instructor.instructor.id,
            },
          ],
        },

        categories: {
          connect: [
            {
              id: reactJsCategory.id,
            },
            {
              id: jsCategory.id,
            },
          ],
        },

        sections: {
          create: [
            {
              label: 'Section One Course One',
              description:
                'Some Random Description for Section One Of Course One',
              duration: 25,

              lectures: {
                create: [
                  {
                    label: 'Lecture One Section One Course One',
                    duration: 13,
                  },
                  {
                    label: 'Lecture Two Section One Course One',
                    duration: 12,
                  },
                ],
              },
            },
            {
              label: 'Section Two Course One',
              description:
                'Some Random Description for Section Two Of Course One',
              duration: 25,

              lectures: {
                create: [
                  {
                    label: 'Lecture One Section Two Course One',
                    duration: 13,
                  },
                  {
                    label: 'Lecture Two Section Two Course One',
                    duration: 12,
                  },
                ],
              },
            },
          ],
        },

        preRequirements: {
          create: [
            {
              label: 'ReactJS',
              description: 'A basic knowledge of react is awesome.',
              level: 'BASIC',
              image: 'https://google.com',
            },
            {
              label: 'JavaScript',
              description: 'you should know and understand javascript.',
              level: 'MEDIUM',
              image: 'https://google.com',
            },
            {
              label: 'Html/CSS',
              description:
                'you should understand basic of web which are html and css.',
              level: 'MEDIUM',
              image: 'https://google.com',
            },
          ],
        },
      },
    });

    const courseTwo = await tx.course.create({
      data: {
        title: 'Test Course Two',
        description: 'Some Random Description For Course Two',
        shortDescription: 'Short Description For Course Two',
        preRequirementsDescription: 'PreRequirement description',
        level: 'INTERMEDIATE',
        price: '350000.85',
        progress: 50,
        isDraft: false,
        hoursCount: 10,
        lecturesCount: 50,
        spotPlayerCourseId: 'some-random-spot-player-course-id',

        image: {
          create: {
            image: 'https://google.com',
            coverImage: 'https://google.com',
          },
        },

        questionHub: {
          create: {},
        },

        instructors: {
          connect: [
            {
              id: instructor.instructor.id,
            },
          ],
        },

        categories: {
          connect: [
            {
              id: htmlCategory.id,
            },
          ],
        },

        sections: {
          create: [
            {
              label: 'Section One Course Two',
              description:
                'Some Random Description for Section One Of Course Two',
              duration: 25,

              lectures: {
                create: [
                  {
                    label: 'Lecture One Section One Course Two',
                    duration: 13,
                  },
                  {
                    label: 'Lecture Two Section One Course Two',
                    duration: 12,
                  },
                ],
              },
            },
            {
              label: 'Section Two Course Two',
              description:
                'Some Random Description for Section Two Of Course Two',
              duration: 25,

              lectures: {
                create: [
                  {
                    label: 'Lecture One Section Two Course Two',
                    duration: 13,
                  },
                  {
                    label: 'Lecture Two Section Two Course Two',
                    duration: 12,
                  },
                ],
              },
            },
          ],
        },

        preRequirements: {
          create: [
            {
              label: 'Responsive',
              description: 'just a very basic knowledge of responsive design.',
              level: 'BASIC',
              image: 'https://google.com',
            },
            {
              label: 'Computer',
              description: 'know how to turn on the computer.',
              level: 'BASIC',
              image: 'https://google.com',
            },
          ],
        },
      },
    });

    const couponOne = await tx.coupon.create({
      data: {
        code: 'test-coupon-one',
        description: 'Coupon Code One',
        expiresAt: moment.utc().add({ years: 999 }).toDate(),
        percent: 10,
      },
    });

    const couponTwo = await tx.coupon.create({
      data: {
        code: 'test-coupon-two',
        description: 'Coupon Code Two',
        expiresAt: moment.utc().add({ years: 999 }).toDate(),
        percent: 30,
        applyToEveryThing: true,
        maxEffect: '20000.15',
      },
    });

    await tx.cartItem.create({
      data: {
        quantity: 1,
        unitPrice: courseOne.price,
        unitPriceWithDiscount: courseOne.price,

        cart: {
          connect: {
            id: customer.cart.id,
          },
        },

        course: {
          connect: {
            id: courseOne.id,
          },
        },
      },
    });

    const askAmirhosseinOne = await tx.askAmirhossein.create({
      data: {
        title: 'An askamirhossein by customer',
        description: 'Some random description.',
        fullName: `${customer.firstname} ${customer.lastname}`,
        email: customer.email,
        isPublished: true,

        whoAsked: {
          connect: {
            id: customer.id,
          },
        },
      },
    });

    await tx.askAmirhosseinAnswer.create({
      data: {
        answer: 'Test answer to askamirhossein one question.',
        fullName: `${user.firstname} ${user.lastname}`,
        isPublished: true,

        whoAnswered: {
          connect: {
            id: user.id,
          },
        },

        question: {
          connect: {
            id: askAmirhosseinOne.id,
          },
        },
      },
    });

    const commentOne = await tx.comment.create({
      data: {
        content: 'Comment One',
        isPublished: true,

        course: {
          connect: {
            id: courseTwo.id,
          },
        },

        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const commentTwo = await tx.comment.create({
      data: {
        content: 'Comment Two',
        isPublished: true,

        parent: {
          connect: {
            id: commentOne.id,
          },
        },

        course: {
          connect: {
            id: courseTwo.id,
          },
        },

        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  });
}

seedDb();
