import DOMPurify from 'dompurify';
import TurndownService from 'turndown';

// a function to purify/sanitize html input and then turn it into mark down
export function purifiedTurndown(content: string): string {
  const turndownService = new TurndownService();
  const purified = DOMPurify.sanitize(content);

  return turndownService.turndown(purified);
}
