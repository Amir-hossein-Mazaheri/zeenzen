import { join } from 'path';

export default function getUploadsPath(foldername: string, filename: string) {
  return join(__dirname, '..', '..', 'public', 'uploads', foldername, filename);
}
