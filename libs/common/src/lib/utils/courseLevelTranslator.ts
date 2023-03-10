import { CourseLevel } from '@zeenzen/data';

export function courseLevelTranslator(level: CourseLevel) {
  switch (level) {
    case CourseLevel.Elementary:
      return 'مقدماتی';
    case CourseLevel.Intermediate:
      return 'متوسط';
    case CourseLevel.Advanced:
      return 'پیشرفته';
    case CourseLevel.Mixed:
      return 'مقدماتی تا پیشرفته';
  }
}
