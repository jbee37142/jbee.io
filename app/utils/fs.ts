import path from 'path';
import fs from 'fs/promises';

export async function readDir(...args: string[]) {
  return (await (fs.readdir(path.join(...args), { withFileTypes: true })));
}
  
export async function readFileToString(...args: string[]): Promise<string> {
  const data = await fs.readFile(path.join(...args), { encoding: 'utf-8' });
    
  return data.toString();
}
