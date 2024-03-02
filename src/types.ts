export interface Book {
  works: Work[];
  title: string;
  publishers: string[];
  publish_date: string;
  key: string;
  type: {
      key: string;
  };
  identifiers: Record<string, unknown>;
  covers: number[];
  isbn_13: string[];
  classifications: Record<string, unknown>;
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

interface Work {
  key: string;
}

export interface EditBook {
  id: string;
  changes: Changes[];
  author: Author;
}
interface Author {
  key: string;
}

interface Changes {
  key: string;
}

export interface Authors {
  key: string;
  death_date: string;
  fuller_name: string;
  title: string;
  name: string;
  personal_name: string;
  bio: Bio;
  type: {
      key: string;
  };
  birth_date: string;
  source_records: string[];
  remote_ids: RemoteIds;
  alternate_names: string[];
  photos: number[];
  wikipedia: string;
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

interface Bio {
  type: string;
  value: string;
}

interface RemoteIds {
  viaf: string;
  wikidata: string;
  isni: string;
} 