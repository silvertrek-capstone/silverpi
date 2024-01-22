"use client"
import { useEffect, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/20/solid'

/*
    TextField Component: 
        A reusable text field component for input with additional features.

    props: 
        limit - The maximum number of characters allowed in the text field.
        label - The label or name for the text field.
        clearable - Indicates whether a clear button (x icon) should be displayed for clearing the field.
        disabled - Disables the text field if set to true.
        onInput - A function to be called every time the user inputs something into the field.
        onChange - A function to be called after debouncing the input. It is called after the user has stopped typing for a set amount of time (specified by debounceTime).
        debounceTime - The time to debounce the input before calling onChange. It determines the delay after the user stops typing before the final input is processed.
*/

export default function TextField({limit, label, clearable, disabled, onInput, onChange, debounceTime}) {

    const [input, setInput] = useState(""); 
    const [debounceTimei, setDebounceTime] = useState(debounceTime); 
    
    const handleOnInput = (e) => {
        setInput(e.target.value);
        onInput && onInput(e.target.value);
    }

    const handleClear = (e) => {
        setInput(""); 
    };

    // debounceTimei included in case potential change to debounceTime during run time is made 
    // ensures changes go through
    useEffect(() => {
        const debounceFunc = setTimeout(() => {
            onChange && onChange(input);// call onChange and pass event
        }, {debounceTimei});
        return () => clearTimeout(debounceFunc);
      }, [input, debounceTimei]);

    return(
        <div class = "position relative">
                <input
                    class = "w-full"
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    disabled = {disabled}
                    onInput = {handleOnInput}
                    maxlength= {limit} // only does so client side 
                    value = {input}
                    placeholder = {label}

                >
                </input>
                { clearable && input && (
                    <button class = "position absolute inset-y-0 right-5 flex items-center rounded-r-md px-2" onClick={handleClear}> 
                        <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </button>
                )}
        </div>
    ); 
}

