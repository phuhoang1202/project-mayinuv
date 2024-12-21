import React, { useState } from 'react'
import IconChevronsDoubleLeft from '@assets/images/IconChevronsDoubleLeft.svg'
import IconChevronsDoubleRight from '@assets/images/IconChevronsDoubleRight.svg'

export default function CustomPagination({ totalItems, onPageChange, currentPage, currentSize }) {
  const itemsPerPage = 15 // Set a default value for items per page
  const totalPages = Math.ceil(totalItems / currentSize)

  // Function to handle page change
  const handlePageChange = (page) => {
    onPageChange(page)
  }

  // Function to render page numbers with ellipsis
  const renderPageNumbers = () => {
    let pages = []
    const pageLimit = 5 // Max number of pages to show at a time

    if (totalPages <= pageLimit) {
      // Show all page numbers if total pages are less than the limit
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`h-[30px] w-[30px] rounded-full mx-1 ${
              currentPage === i ? 'bg-[#3B3B3B] text-white' : 'text-[#8C8C8C] bg-gray-200'
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>,
        )
      }
    } else {
      // Show page numbers with ellipsis
      if (currentPage <= 3) {
        // Show first few pages
        for (let i = 1; i <= pageLimit - 1; i++) {
          pages.push(
            <button
              key={i}
              className={`h-[30px] w-[30px] rounded-full mx-1 ${
                currentPage === i ? 'bg-[#3B3B3B] text-white' : 'text-[#8C8C8C] bg-gray-200'
              }`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>,
          )
        }
        pages.push(
          <span key='ellipsis' className='mx-1 text-[#8C8C8C]'>
            ...
          </span>,
        )
        pages.push(
          <button
            key={totalPages}
            className={`h-[30px] w-[30px] rounded-full mx-1 ${
              currentPage === totalPages ? 'bg-[#3B3B3B] text-white' : 'text-[#8C8C8C] bg-gray-200'
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>,
        )
      } else if (currentPage > 3 && currentPage < totalPages - 2) {
        // Show pages around the current page with ellipsis at the start and end
        pages.push(
          <button
            key={1}
            className={`h-[30px] w-[30px] rounded-full mx-1 ${
              currentPage === 1 ? 'bg-[#3B3B3B] text-white' : 'text-[#8C8C8C] bg-gray-200'
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>,
        )
        pages.push(
          <span key='ellipsis1' className='mx-1 text-[#8C8C8C]'>
            ...
          </span>,
        )

        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          if (i > 0 && i <= totalPages) {
            pages.push(
              <button
                key={i}
                className={`h-[30px] w-[30px] rounded-full mx-1 ${
                  currentPage === i ? 'bg-[#3B3B3B] text-white' : 'text-[#8C8C8C] bg-gray-200'
                }`}
                onClick={() => handlePageChange(i)}
              >
                {i}
              </button>,
            )
          }
        }

        pages.push(
          <span key='ellipsis2' className='mx-1 text-[#8C8C8C]'>
            ...
          </span>,
        )
        pages.push(
          <button
            key={totalPages}
            className={`h-[30px] w-[30px] rounded-full mx-1 ${
              currentPage === totalPages ? 'bg-[#3B3B3B] text-white' : 'text-[#8C8C8C] bg-gray-200'
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>,
        )
      } else {
        // Show last few pages with ellipsis at the start
        pages.push(
          <button
            key={1}
            className={`h-[30px] w-[30px] rounded-full mx-1 ${
              currentPage === 1 ? 'bg-[#3B3B3B] text-white' : 'text-[#8C8C8C] bg-gray-200'
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>,
        )
        pages.push(
          <span key='ellipsis1' className='mx-1 text-[#8C8C8C]'>
            ...
          </span>,
        )

        for (let i = totalPages - pageLimit + 2; i <= totalPages; i++) {
          pages.push(
            <button
              key={i}
              className={`h-[30px] w-[30px] rounded-full mx-1 ${
                currentPage === i ? 'bg-[#3B3B3B] text-white' : 'text-[#8C8C8C] bg-gray-200'
              }`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>,
          )
        }
      }
    }
    return pages
  }

  return (
    <div className='flex items-center justify-center mt-4'>
      {/* Previous Button */}
      <button
        className='flex items-center justify-center mx-2'
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <img src={IconChevronsDoubleLeft} alt='Previous' className={`${currentPage === 1 ? 'opacity-50' : ''}`} />
      </button>

      {/* Page Numbers */}
      {renderPageNumbers()}

      {/* Next Button */}
      <button
        className='flex items-center justify-center mx-2'
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <img src={IconChevronsDoubleRight} alt='Next' className={`${currentPage === totalPages ? 'opacity-50' : ''}`} />
      </button>
    </div>
  )
}
