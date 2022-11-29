export const LINKS = {
  INDEX: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  ABOUT_ME: '/about-me',
  CONTACT_US: '/contact-us',
  SHOP: {
    INDEX: '/shop',
    CART: '/shop/cart',
    SINGLE_COURSE: (id: number | string) => `/shop/course/${id}`,
  },
  ASK_AMIRHOSSEIN: {
    INDEX: '/ask-amirhossein',
    QUESTIONS: {
      INDEX: '/ask-amirhossein/questions',
      SINGLE_QUESTION: (id: number | string) =>
        `/ask-amirhossein/questions/${id}`,
    },
  },
  USER: {
    DASHBOARD: {
      INDEX: '/user/dashboard',
      PROFILE: '/user/dashboard/profile',
    },
  },
  STACK_OVERFLOW: {
    INDEX: '/stack-overflow',
    QUESTIONS: {
      INDEX: '/stack-overflow/questions',
      SINGLE_QUESTION: (id: number | string) =>
        `/stack-overflow/questions/${id}`,
    },
  },
  INSTRUCTORS: {
    INDEX: '/instructors',
    SINGLE_INSTRUCTOR: (id: number | string) => `/instructors/${id}`,
  },
};
