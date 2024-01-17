"use client"

// Basic select component, naming scheme ripped from vuetify, google v-select to see what this component should mimic

// props supported are defined below
/*
    id - ID in case we want to use one
    value - Initial value that the select has, should also always match the current value
    items - Array of values that the select will use to generate the value list.
        - Should be an array of objects in the following form: {text: What the user sees, value: A value used to find the option used, can be the same as text}
    handleChange - function that is called when a change is made in the select (new option selected)
*/


export default function Select({ id, value, items, handleChange }) {

    const modChange = (e) => {
        const val = e.target.value;
        handleChange(val)
    }

    return (
        <div>
            <select
                id={id || 'simple-select'}
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-gray-300 sm:text-sm sm:leading-6"
                defaultValue={value}
                onChange={modChange}
            >
                {items.map((item) => {
                    return (
                        <option key={`select-${item.value}`} value={item.value}>{item.text}</option>
                    )
                })}
            </select>
        </div>
    )
}