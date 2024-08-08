export class SaveListDto {
  id: string;
  readStatus: 'planned' | 'reading' | 'finished';
  readPage: number;
  book: string;
  user: string;
}
