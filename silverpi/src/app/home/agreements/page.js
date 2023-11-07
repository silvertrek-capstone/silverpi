'use client'
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
  } from '@heroicons/react/24/outline'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link';

const homeButtonStyles = {
    position: 'absolute',
    top: '40px', // Adjust the top position as needed
    right: '60px', // Adjust the right position as needed
  };


//const navigation = [
//    {name 'Dashboard', href: '/home', icon: HomeIcon} 
//]

/*function AgreementComponent({ agreements }) {
    return (
        <div>
            <h1>Agreements</h1>
            {agreements.map((agreement) => (
                <div key={agreement.id}>
                    <h2>{agreement.title}</h2>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{agreement.content}</pre>
                </div>
            ))}
        </div>
    );
}
*/




export default function Agreements() {
    const agreements = agreementsData();
    return (
        <div className="bg-grey">
            <Link href="/home" style={homeButtonStyles}>
                <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm 
                    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                    focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center space-x-2"
                >
                    <HomeIcon className="w-6 h-6" />
                    <span>Dashboard</span>
                </button>
            </Link>
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
                                            <Link href={`/home/agreements/$d{agreement.id}`} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
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



/*function agreementsData(){
    return [
        {
            id: 1,
            title: 'ALPHA Agreement',
            content: `
                This is the content of Agreement 1. You have agreed that you are a super super 
                super super super super super super super super super super super super super super super 
                super super super super super super super super super super super super super super super 
                super super super super super super super super super super super super super super super 
                super super super super super super super super super super super super super super super 
                super super super super super super super super super super super super super super super 
                super super super super super super super super super super super super super super super 
                super super super super super super super super cool customer.
            `
        },
        {
            id: 2,
            title: 'Equipment Checkout Agreement',
            content: `
                <pre>
                This Equipment Checkout Agreement ("Agreement") is entered into on [Date], by and between:

                Lender:
                Name of Lending Organization/Individual: [Name of Lender]
                Address: [Address of Lender]
                Contact Information: [Phone number and email address of Lender]
            
                Borrower:
                Name of Borrower: [Name of Borrower]
                Affiliation (if applicable): [Affiliation, e.g., school, company]
                Address: [Address of Borrower]
                Contact Information: [Phone number and email address of Borrower]
            
                Collectively, the Lender and Borrower may be referred to as the "Parties."
            
                Equipment Details:
            
                Description of Equipment: [Provide a detailed description of the equipment, including make, model, and any unique identifiers]
            
                Serial/ID Number: [If applicable, provide the serial number or identification number]
            
                Terms and Conditions:
            
                Checkout Date: The Lender hereby loans the described equipment to the Borrower, and the Borrower acknowledges receiving the equipment on [Date].
            
                Duration: The Borrower is granted permission to use the equipment for a specific period starting from the Checkout Date and ending on [Return Date]. The Borrower is responsible for returning the equipment promptly and in the same condition it was received.
            
                Care and Responsibility: The Borrower agrees to use the equipment with care and take reasonable precautions to prevent damage, loss, or theft. The Borrower will be responsible for any damage or loss beyond normal wear and tear.
            
                Return of Equipment: The Borrower agrees to return the equipment in good working condition on or before the specified Return Date. If an extension or delay in return is necessary, the Borrower must obtain prior consent from the Lender.
            
                Late Return: In the event of late return without prior approval, the Borrower may be subject to penalties, including fees and/or restrictions on future equipment loans.
            
                Liability: The Borrower understands that they are liable for any damages, losses, or theft of the equipment during the loan period and shall be responsible for the repair or replacement costs.
            
                Use Restrictions: The Borrower agrees to use the equipment only for its intended purpose and in compliance with all applicable laws and regulations.
            
                Indemnification: The Borrower shall indemnify and hold the Lender harmless from any claims, losses, damages, or liabilities arising out of the Borrower's use of the equipment.
                </pre>
            `,
        },
        {
            id: 3,
            title: 'Reminder Agreement',
            content: `
                This another ridiculous that you agreed to. You can not take it back right now. You are held
                responsible for anything that will happen to your equipement. Better take care of your 
                equipement better next time.
            `
        }
    ];
}
*/