import { purifiedTurndown } from './purifiedTurndown';

describe('purifiedTurndown', () => {
  const sampleHtml = `
    <script>
      alert('hello world...')
    </script>

    <h2>
      This is a heading 2
    </h2>

    <p>
      This is a paragraph
    </p>
  `;

  it.todo('should sanitize the data');
});
