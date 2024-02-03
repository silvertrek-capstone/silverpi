"use client"
import { Combobox } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/20/solid'

// Basic autocomplete component, naming scheme ripped from vuetify, see v-autocomplete for what this is supposed to imitate
// props supported are defined below
/*
    id - ID in case we want to use one
    value - Current & initial value 
    items - Array of values that the select will use to generate the value list.
        - Should be an array of objects in the following form: {text: What the user sees, value: A value used to find the option used, can be the same as text}
    label - autocomplete label
    onChange - function that is called when a change is made in the select (new option selected)
*/


export default function Autocomplete({ id, value, items, label, onChange }) {
    const [query, setQuery] = useState('')
    const filteredItems =
        query === ''
            ? items
            : items.filter((item) => {
                return item.text.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Combobox id={id} as="div" nullable value={value} onChange={(e) => {setQuery(''); onChange(e)}}>
            <div className="relative mt-2">
                <Combobox.Input
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(item) => item?.text}
                />
                {!query && !value &&
                    <span className='absolute left-3 text-gray-400 top-1'>{label}</span>
                }
                <Combobox.Button onClick={() => {setQuery(''); onChange(null)}} className="absolute inset-y-0 right-5 flex items-center rounded-r-md px-2">
                    <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>

                {filteredItems.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredItems.map((item) => (
                            <Combobox.Option
                                key={item.value}
                                value={item}
                                className={({ active }) =>
                                    classNames(
                                        'relative cursor-default select-none py-2 pl-3 pr-9',
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <span className={classNames('block truncate', selected && 'font-semibold')}>{item.text}</span>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                    active ? 'text-white' : 'text-indigo-600'
                                                )}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    )
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}