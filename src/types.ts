export interface Book {
  works: Work[];
  title: string;
  publishers: string[];
  publish_date: string;
  key: string;
  kind: string;
  type: {
      key: string;
  };
  covers: number[];
  identifiers: Record<string, unknown>;
  isbn_10: string[];
  classifications: Record<string, unknown>;
  subtitle: string;
  publish_places: string[];
  copyright_date: string;
  description: string| {
    type: string;
    value: string;
  };
  series: string[];
  physical_format: string;
  number_of_pages: number;
  first_sentence: string;
  latest_revision: number;
  revision: number;
  pagination: string;
  subjects: string[];
  created: {
      type: string;
      value: string;
  };
  last_modified: {
      type: string;
      value: string;
  };
  workData: Work;
  authorData: Author;
}

interface Work {
  key: string;
  title: string;
  authors: AuthorRole[];
  type: {
      key: string;
  };
  covers: number[];
  description: string | {
      type: string;
      value: string;
  };
  subjects: string[];
  latest_revision: number;
  revision: number;
  created: {
      type: string;
      value: string;
  };
  last_modified: {
      type: string;
      value: string;
  };
}

interface Description{
  type: string;
  value: string;

}

interface AuthorRole {
  author: {
      key: string;
  };
  type: {
      key: string;
  };
}

interface Bio {
  type: string;
  value: string;
}

interface Author {
  name: string;
  last_modified: {
      type: string;
      value: string;
  };
  birth_date: string;
  death_date: string;
  key: string;
  bio: string | Bio[];
  type: {
      key: string;
  };
  id: number;
  revision: number;
}



export interface EditBook {
  id: string;
  changes: Changes[];
  author: Author;
  kind: string;
}
interface Author {
  key: string;
}

interface Changes {
  key: string;
}

export interface Playlist {
  push(bookKey: string): unknown;
  name: string;
  bookKeys: string[];
}