"use client"
import { useEffect, useState } from 'react'

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
// limit xxxx ask about it did u want placeholder within the text or literally label ?
//  label xxxxxx idk do i have to stylize it somehow ask
// clearable  xxx need to clean up css
// debounceTime ask again idk might just keep useEffect

    const [input, setInput] = useState(""); 
    const [debounceTimei, setDebounceTime] = useState(debounceTime); 
    const handleOnChange = (e) => {
        setInput(e.target.value);
        onChange && onChange(e);// call onChange and pass event
        
        /// does the debounce but i dont know if this is the way that they want it handled need to know expected behavior
        // setTimeout(() => {
        // }, {debounceTime});
    }

    const handleClear = (e) => {
        setInput(""); 
    };
    
    // technically debounceTimei not needed but if changed for some reason during runtime it wont update to new val
    useEffect(() => {
        const debounceFunc = setTimeout(() => {}, {debounceTimei});
        return () => clearTimeout(debounceFunc);
      }, [input, debounceTimei]);

    return(
        <div class = "position relative">
            <label>
                {label}
                <input
                    class = "w-full"
                    disabled = {disabled}
                    onInput = {onInput}
                    onChange = {handleOnChange}
                    maxlength= {limit} // only does so client side 
                    value = {input}
                >
                </input>
                { true && input && (
                    <button class = "position absolute top-0 right-0" onClick={handleClear} >clear</button>
                )}
            </label>
        </div>
    ); 
}

