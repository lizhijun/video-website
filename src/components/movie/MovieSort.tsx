'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export type SortOption = {
  id: string;
  label: string;
};

const sortOptions: SortOption[] = [
  { id: 'latest', label: '最新上线' },
  { id: 'rating', label: '评分最高' },
  { id: 'year', label: '上映年份' },
  { id: 'title', label: '片名' },
];

interface MovieSortProps {
  currentSort: string;
  onSort: (sortId: string) => void;
}

export default function MovieSort({ currentSort, onSort }: MovieSortProps) {
  const currentOption = sortOptions.find(opt => opt.id === currentSort) || sortOptions[0];

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 text-gray-300 hover:text-white">
        <span className="text-sm">{currentOption.label}</span>
        <ChevronDownIcon className="w-4 h-4" />
      </Menu.Button>
      
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 rounded-lg bg-[#2f2f2f] shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            {sortOptions.map((option) => (
              <Menu.Item key={option.id}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-[#3f3f3f]' : ''
                    } ${
                      currentSort === option.id ? 'text-red-500' : 'text-gray-300'
                    } group flex w-full items-center px-4 py-2 text-sm`}
                    onClick={() => onSort(option.id)}
                  >
                    {option.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 