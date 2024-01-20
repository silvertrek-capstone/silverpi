"use client"
import Table from "@/components/table"
import Autocomplete from '@/app/components/autocomplete';
import { useState } from "react";

export default function Agreements() {
    const agreements = agreementsData();
    const headers = [
        { text: 'ID', value: 'id' },
        { text: 'Title', value: 'title' },
        { text: 'Date', value: 'date' },
    ]


    const [agr, setAgr] = useState(null)

    const handleAgreementChange = (e) => {
        console.log(e)
        setAgr(e)
    }

    return (
        <div>
            <div className="max-w-4xl mt-9 mx-auto">

                <Table
                    headers={headers}
                    items={agreements}
                    title="Agreements"
                    mainkey="id"
                    link="/home/agreements/"
                >
                </Table>
                <div className='mt-2 pt-2'>
                    <Autocomplete
                        id="text-aut"
                        value={agr}
                        items={agreements}
                        label="Select item"
                        handleChange={setAgr}
                    >

                    </Autocomplete>
                </div>
            </div>
        </div>
    );
}



function agreementsData() {
    return [
        {
            id: 12,
            value: 12,
            title: 'Equipment agreement',
            text: 'Equipment agreement',
            date: '12-13-2003',
            active: 'true',
            context:
                `
            We will be using our equipement.
            `
        },
        {
            id: 32,
            value: 32,
            title: 'Concrete company',
            text: 'Concrete company',
            date: '12-1-2022',
            active: 'true',
            context:
                `
            We have an agreement with ALPHA Ready Mix for concrete.
            `
        },
        {
            id: 43,
            value: 43,
            title: 'Lumber agreement',
            text: 'Lumber agreement',
            date: '11-30-2000',
            active: 'false',
            context:
                `
            We have an agreement with Home Depot for being our primary suplier for a discount.
            `
        }
    ]
}