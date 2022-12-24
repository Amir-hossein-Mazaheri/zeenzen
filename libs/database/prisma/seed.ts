/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import moment = require('moment');

const prisma = new PrismaClient();

async function seedDb() {
  await prisma.$transaction(async (tx) => {
    const customer = await tx.user.create({
      data: {
        email: 'customer@test.com',
        password: '123456',
      },
      include: {
        cart: true,
      },
    });

    const user = await tx.user.create({
      data: {
        email: 'user@test.com',
        password: '123456',
      },
      include: {
        cart: true,
      },
    });

    const admin = await tx.user.create({
      data: {
        email: 'admin@test.com',
        password: '123456',
        role: 'ADMIN',

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
      data: {
        email: 'admin@test.com',
        password: '123456',
        role: 'INSTRUCTOR',

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
        hourseCount: 20,
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
              id: admin.id,
            },
            {
              id: instructor.id,
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
        hourseCount: 10,
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
              id: instructor.id,
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
  });
}

seedDb();
