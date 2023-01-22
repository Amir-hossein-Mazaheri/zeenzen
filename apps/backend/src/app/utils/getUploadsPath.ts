import { join } from 'path';

export default function getUploadsPath(foldername: string, filename: string) {
  return join(process.cwd(), 'public', 'uploads', foldername, filename);
}
