export interface Book {
  works: Work[];
  editeur: string;
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
  description:
    | string
    | {
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
  description:
    | string
    | {
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

export interface PlaylistItem {
  name: string;
}

export interface PlaylistItem_Content {
  id: number;
  bookId: string;
}

export interface AdvancedSearch {
  already_read_count: number;
  author_facet: string[];
  author_key: string[];
  author_name: string[];
  contributor: string[];
  cover_edition_key: string;
  cover_i: number;
  currently_reading_count: number;
  ebook_access: string;
  ebook_count_i: number;
  edition_count: number;
  edition_key: string[];
  first_publish_year: number;
  has_fulltext: boolean;
  ia: string[];
  ia_box_id: string[];
  ia_collection: string[];
  ia_collection_s: string;
  ia_loaded_id: string[];
  id_goodreads: string[];
  id_librarything: string[];
  isbn: string[];
  key: string;
  language: string[];
  last_modified_i: number;
  lending_edition_s: string;
  lending_identifier_s: string;
  number_of_pages_median: number;
  oclc: string[];
  printdisabled_s: string;
  public_scan_b: boolean;
  publish_date: string[];
  publish_place: string[];
  publish_year: number[];
  publisher: string[];
  publisher_facet: string[];
  readinglog_count: number;
  seed: string[];
  subject: string[];
  subject_facet: string[];
  subject_key: string[];
  title: string;
  title_sort: string;
  title_suggest: string;
  type: string;
  want_to_read_count: number;
  _version_: number;
}
