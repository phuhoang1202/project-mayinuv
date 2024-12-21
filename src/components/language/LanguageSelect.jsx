import React, { useState } from 'react'

export default function LanguageSelect() {
  return (
    <nav
      className='relative flex w-full flex-wrap items-center justify-between bg-neutral-100 py-2 text-neutral-500 shadow-dark-mild hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-700 lg:py-4'
      data-twe-navbar-ref=''
    >
      <div className='flex w-full flex-wrap items-center justify-between px-3'>
        {/* Icon dropdown */}
        <div className='relative ms-4' data-twe-dropdown-ref=''>
          <a
            className='me-4 flex items-center text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80'
            href='#'
            id='navbarDropdown'
            role='button'
            data-twe-dropdown-toggle-ref=''
            aria-expanded='false'
          >
            <span className='relative inline-block h-[11px] w-4 overflow-hidden bg-gray-200 leading-[11px] decoration-inherit'>
              <span className="inline-block h-[11px] w-4 content-[''] [background-position:-36px_-26px_!important] [background:url(https://tecdn.b-cdn.net/img/svg/flags.png)_no-repeat_-108px_-1976px]" />
            </span>
            <span className='ps-1 [&>svg]:w-5'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
          </a>
          <ul
            className='absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-[10rem] list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark'
            aria-labelledby='navbarDropdown'
            data-twe-dropdown-menu-ref=''
          >
            <li>
              <a
                className='block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25'
                href='#'
                data-twe-dropdown-item-ref=''
              >
                <span className='relative me-2 inline-block h-[11px] w-4 overflow-hidden leading-[11px] decoration-inherit'>
                  <span className="inline-block h-[11px] w-4 content-[''] [background-position:-36px_-26px_!important] [background:url(https://tecdn.b-cdn.net/img/svg/flags.png)_no-repeat_-108px_-1976px]" />
                </span>
                <span className='me-4'>English</span>
                <span className='inline-block text-success-600 dark:text-success-500 [&>svg]:h-3.5 [&>svg]:w-3.5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='2.5'
                    stroke='currentColor'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 12.75 6 6 9-13.5' />
                  </svg>
                </span>
              </a>
            </li>
            <li>
              <hr className='my-2 border-neutral-100 dark:border-white/10' />
            </li>
            <li>
              <a
                className='block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25'
                href='#'
                data-twe-dropdown-item-ref=''
              >
                <span className='relative me-2 inline-block h-[11px] w-4 overflow-hidden leading-[11px] decoration-inherit'>
                  <span className="inline-block h-[11px] w-4 content-[''] [background:url(https://tecdn.b-cdn.net/img/svg/flags.png)_no-repeat_-108px_-1976px] [background-position:-72px_-572px_!important]" />
                </span>
                Polski
              </a>
            </li>
            <li>
              <a
                className='block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25'
                href='#'
                data-twe-dropdown-item-ref=''
              >
                <span className='relative me-2 inline-block h-[11px] w-4 overflow-hidden leading-[11px] decoration-inherit'>
                  <span className="inline-block h-[11px] w-4 content-[''] [background:url(https://tecdn.b-cdn.net/img/svg/flags.png)_no-repeat_-108px_-1976px] [background-position:0px_-1196px_!important]" />
                </span>
                中文
              </a>
            </li>
            <li>
              <a
                className='block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25'
                href='#'
                data-twe-dropdown-item-ref=''
              >
                <span className='relative me-2 inline-block h-[11px] w-4 overflow-hidden leading-[11px] decoration-inherit'>
                  <span className="inline-block h-[11px] w-4 content-[''] [background:url(https://tecdn.b-cdn.net/img/svg/flags.png)_no-repeat_-108px_-1976px] [background-position:-36px_-910px_!important]" />
                </span>
                日本語
              </a>
            </li>
            <li>
              <a
                className='block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25'
                href='#'
                data-twe-dropdown-item-ref=''
              >
                <span className='relative me-2 inline-block h-[11px] w-4 overflow-hidden leading-[11px] decoration-inherit'>
                  <span className="inline-block h-[11px] w-4 content-[''] [background:url(https://tecdn.b-cdn.net/img/svg/flags.png)_no-repeat_-108px_-1976px] [background-position:0px_-1430px_!important]" />
                </span>
                Deutsch
              </a>
            </li>
            <li>
              <a
                className='block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25'
                href='#'
                data-twe-dropdown-item-ref=''
              >
                <span className='relative me-2 inline-block h-[11px] w-4 overflow-hidden leading-[11px] decoration-inherit'>
                  <span className="inline-block h-[11px] w-4 content-[''] [background:url(https://tecdn.b-cdn.net/img/svg/flags.png)_no-repeat_-108px_-1976px] [background-position:0px_-1976px_!important]" />
                </span>
                Français
              </a>
            </li>
            <li>
              <a
                className='block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25'
                href='#'
                data-twe-dropdown-item-ref=''
              >
                <span className='relative me-2 inline-block h-[11px] w-4 overflow-hidden leading-[11px] decoration-inherit'>
                  <span className="inline-block h-[11px] w-4 content-[''] [background:url(https://tecdn.b-cdn.net/img/svg/flags.png)_no-repeat_-108px_-1976px] [background-position:-0px_-1742px_!important]" />
                </span>
                Español
              </a>
            </li>
            <li>
              <a
                className='block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25'
                href='#'
                data-twe-dropdown-item-ref=''
              >
                <span className='relative me-2 inline-block h-[11px] w-4 overflow-hidden leading-[11px] decoration-inherit'>
                  <span className="inline-block h-[11px] w-4 content-[''] [background:url(https://tecdn.b-cdn.net/img/svg/flags.png)_no-repeat_-108px_-1976px] [background-position:-72px_-884px_!important]" />
                </span>
                Русский
              </a>
            </li>
            <li>
              <a
                className='block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25'
                href='#'
                data-twe-dropdown-item-ref=''
              >
                <span className='relative me-2 inline-block h-[11px] w-4 overflow-hidden leading-[11px] decoration-inherit'>
                  <span className="inline-block h-[11px] w-4 content-[''] [background:url(https://tecdn.b-cdn.net/img/svg/flags.png)_no-repeat_-108px_-1976px] [background-position:-72px_-702px_!important]" />
                </span>
                Português
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
