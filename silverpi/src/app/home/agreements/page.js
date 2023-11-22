'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import {POST} from '@/api/agreements/getActiveAgreements/route.js'



const homeButtonStyles = {
    position: 'absolute',
    top: '40px', // Adjust the top position as needed
    right: '60px', // Adjust the right position as needed
  };




export default function Agreements() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/agreements/getActiveAgreements', {
                method: 'POST',
                // You can add headers and body if needed
            });
  
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
  
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid content type. Expected JSON.');
            }
  
            const result = await response.json();
  
            if (result.error) {
                throw new Error(result.error);
            }
  
            setData(result.data);
            } catch (error) {
                setError(error);
            }
        }
  
        fetchData();
        }, []);
  
    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }
  
    if (!data) {
        return <div>Loading...</div>;
    }
  
    // Map over the data and display each item
    return (
        <pre>{JSON.stringify(data, null, 2)}</pre>
    );
    const agreements = agreementsData();
    return (
        <div className="bg-grey">
            <div className="bg-grey px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-8xl font-bold tracking-tight text-gray-900 ">Agreements</h1>
                </div>
            </div>
            {/*
            {agreements.map((agreement) => (
                <div className="bg-grey px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center position: relative">
                        <div className= "bg-white -mx-4 mt-10 pt-11 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <h2 className="position absolute top-0 mt-3 ml-3 text-2xl font-semibold leading-6 text-gray-900">
                                {agreement.title}
                            </h2>
                            <p className="text-gray-700 mt-3">
                                {agreement.content}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
            */}
            <div className="bg-grey px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center position: relative">
                    <div className= "bg-white -mx-4 mt-10 pt-11 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h2 className="position absolute top-0 mt-3 ml-3 text-2xl font-semibold leading-6 text-gray-900">
                            All Agreements
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
                                        Status
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {agreements.map((agreement) => (
                                    <tr key={agreement.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left font-medium text-gray-900 sm:pl-6">
                                            <Link href={`/home/agreements/${agreement.id}`} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                                {agreement.id}
                                            </Link>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-left text-gray-500">
                                            {agreement.title}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-left text-gray-500">
                                            {agreement.date}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-left text-gray-500">
                                            {agreement.active}
                                        </td>
                                        <td className="max-w-[200px] whitespace-normal px-3 py-4 text-left text-gray-500">
                                            {agreement.context}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



        {/*<ul>
            {agreements.map((agreement) => (
                <li key={agreement.id}>
                    <h3>{agreement.title}</h3>
                    <p>{agreement.content}</p>
                    <a href={`/agreements/${agreement.id}`}>View Agreement</a>
                </li>
            ))}
            </ul> */}
        </div>
    );
}



function agreementsData(){
    return [
        {
            id: 12,
            title: 'Equipment agreement',
            date: '12-13-2003',
            active: 'true',
            context: 
            `
            We will be using our equipement.
            `
        },
        {
            id: 32,
            title: 'Concrete company',
            date: '12-1-2022',
            active: 'true',
            context:
            `
            We have an agreement with ALPHA Ready Mix for concrete.
            `
        },
        {
            id: 43,
            title: 'Lumber agreement',
            date: '11-30-2000',
            active: 'false',
            context:
            `
            We have an agreement with Home Depot for being our primary suplier for a discount.
            `
        }
    ]
}
