import { randomId } from '@mantine/hooks';
import { Pagination } from '@mantine/core';

interface PaginationProps {
  total: number;
  activePage: number;
  onChange: (page: number) => void;
}

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

const data = chunk(
  Array(30)
    .fill(0)
    .map((_, index) => ({ id: index, name: randomId() })),
  5
);

interface PaginationProps {
  activePage: number;
  onChange: (page: number) => void;
}

export function PaginationPage({ activePage, onChange }: PaginationProps) {
  const totalPages = data.length;

  return (
    <Pagination total={totalPages} value={activePage} onChange={onChange} mt="sm" />
  );
}
