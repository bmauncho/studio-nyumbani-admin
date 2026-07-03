import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  path: string;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  path,
}: PaginationControlsProps) => {
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const prevPagePath = `${path}?page=${currentPage - 1}`;
  const nextPagePath = `${path}?page=${currentPage + 1}`;

  const maxVisiblePages = 3;

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Keep 3 pages visible when possible
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {hasPrevious ? (
                <PaginationPrevious href={prevPagePath} />
              ) : (
                <PaginationPrevious
                  href="#"
                  className="pointer-events-none opacity-50"
                  aria-disabled="true"
                />
              )}
            </PaginationItem>
            <div className="flex items-center gap-2">
              {visiblePages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`${path}?page=${page}`}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </div>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              {hasNext ? (
                <PaginationNext href={nextPagePath} />
              ) : (
                <PaginationNext
                  href="#"
                  className="pointer-events-none opacity-50"
                  aria-disabled="true"
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default PaginationControls;
