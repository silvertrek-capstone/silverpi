'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link';

export default function WorkOrders() {
    const orders = WorkOrdersData();
    return (
        <div className="bg-grey">
            <div className="bg-grey px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-8xl font-bold tracking-tight text-gray-900 ">Work Orders</h1>
                </div>
            </div>
            <div className="bg-grey px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center position: relative">
                    <div className= "bg-white -mx-4 mt-10 pt-11 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h2 className="position absolute top-0 mt-3 ml-3 text-2xl font-semibold leading-6 text-gray-900">
                            All Work Orders
                        </h2>
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        ID
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Title
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Date
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Done
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {orders.map((orders) => (
                                    <tr key={orders.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left font-medium text-gray-900 sm:pl-6">
                                            <Link href={`/home/workorders/${orders.id}`} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                                {orders.id}
                                            </Link>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-left text-gray-500">
                                            {orders.title}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-left text-gray-500">
                                            {orders.date}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-left text-gray-500">
                                            {orders.active}
                                        </td>
                                        <td className="max-w-[200px] whitespace-normal px-3 py-4 text-left text-gray-500">
                                            {orders.context}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}



function WorkOrdersData(){
    return [
        {
            id: 12,
            title: 'Cement',
            date: '12-13-2003',
            active: 'true',
            context: 
            `
            12 yards of cement.
            `
        },
        {
            id: 32,
            title: 'Bricks',
            date: '12-1-2022',
            active: 'true',
            context:
            `
            10 loads of 30 brick loads
            `
        },
        {
            id: 43,
            title: 'Plywood',
            date: '11-30-2000',
            active: 'false',
            context:
            `
            5 truck loads of plywood
            `
        }
    ]
}