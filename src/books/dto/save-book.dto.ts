type ReadStatus = 'planned' | 'reading' | 'finished';
export class SaveBookDto {
  id: string;
  title: string;
  author: string;
  year: number;
  summary: string;
  publisher: string;
  pageCount: number;
  readPage: number;
  readStatus: ReadStatus;
}
