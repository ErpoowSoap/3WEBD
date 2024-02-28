export interface TestBook {
  works: Work[];
  title: string;
  publishers: string[];
  publish_date: string;
  key: string;
  type: Type;
  covers: number[];
  edition_name: string;
  languages: Language[];
  translation_of: string;
  description: string;
  latest_revision: number;
  revision: number;
  created: DateTime;
  last_modified: DateTime;
}

interface Work {
  key: string;
}

interface Language {
  key: string;
}

interface DateTime {
  type: string;
  value: string;
}

interface Type {
  key: string;
}


interface Author {
  key: string;
}

interface Changes {
  key: string;
}

export interface EditBook {
  id: string;
  changes: Changes[];
  author: Author;
}