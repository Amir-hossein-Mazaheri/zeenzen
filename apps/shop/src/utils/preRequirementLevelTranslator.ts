import { PreRequirementLevel } from '@zeenzen/data';

export default function preRequirementLevelTranslator(
  level: PreRequirementLevel
) {
  switch (level) {
    case PreRequirementLevel.Basic:
      return 'پایه';
    case PreRequirementLevel.Medium:
      return 'متوسط';
    case PreRequirementLevel.Advanced:
      return 'پیشرفته';
    case PreRequirementLevel.Expert:
      return 'حرفه ای';
  }
}
