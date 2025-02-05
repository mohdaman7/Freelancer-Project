import { ChevronLeft, ChevronRight } from "lucide-react"

const Pagination = ( {currentPage, totalPages, onPageChange} ) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const renderPageNumbers = () => {
    if (totalPages <= 7) {
      return pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
            ${currentPage === page ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
        >
          {page}
        </button>
      ))
    }

    let pageNumbers = []
    if (currentPage <= 3) {
      pageNumbers = [...pages.slice(0, 5), "...", totalPages]
    } else if (currentPage >= totalPages - 2) {
      pageNumbers = [1, "...", ...pages.slice(totalPages - 5)]
    } else {
      pageNumbers = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
    }

    return pageNumbers.map((page, index) => (
      <button
        key={index}
        onClick={() => page !== "..." && onPageChange(page)}
        disabled={page === "..."}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
          ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : page === "..."
                ? "text-gray-600 cursor-default"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
      >
        {page}
      </button>
    ))
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}

export default Pagination
