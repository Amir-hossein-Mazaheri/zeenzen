import { randomInt } from 'crypto';
import * as moment from 'moment';

import { getMinMaxRange } from './getMinMaxRange';

function promisifiedRandomInt(min: number, max: number) {
  return new Promise<number>((resolve, reject) => {
    randomInt(min, max, (err, number) => {
      if (err) {
        reject(err);
      }

      resolve(number);
    });
  });
}

export async function getCode(size: number, liveFor: number) {
  const [min, max] = getMinMaxRange(size);
  const code = await promisifiedRandomInt(min, max);

  const expiresAt = moment.utc().add(liveFor, 'minutes').toDate();

  return { code, expiresAt };
}
