"use client"
import Select from '@/components/select'
import { useEffect, useState } from 'react'
// Tab component, takes several props

/*
    value: the value of the currently selected tab
    items: array of objects, with the following format:
        {
            value: Anything, the value correlated to the tab
            text: The name of the tab, (what is shown to the user)
            count: null, or a count correlated to the tab
        }
    onChange: function to be called when a new tab is clicked, the value passed will be the value of the tab.
*/

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function Tabs({value, items, onChange}) {
    const [tabs, setTabs] = useState(items);

    // Watch the items (tabs) and set tabs when they change
    useEffect(() => {
      setTabs(items);
    }, [items])

    return (
      <div>
        <div className="sm:hidden">
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <Select
            id="tabs-fallback"
            name="tabs"
            defaultValue={value}
            items={tabs}
            onChange={(e) => onChange(e)}
          >
          </Select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.text}
                  href="#"
                  onClick={() => onChange(tab.value)}
                  className={classNames(
                    tab.value === value
                      ? 'border-primary text-primary'
                      : 'border-transparent text-greytxt hover:border-gray-200 hover:text-secondary',
                    'flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                  )}
                >
                  {tab.text}
                  {tab.count !== null && tab.count !== undefined ? (
                    <span
                      className='bg-neutral2 text-neutral4 ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block'
                    >
                      {tab.count}
                    </span>
                  ) : null}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    )
  }
  