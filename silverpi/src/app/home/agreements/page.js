import Link from 'next/link';
import Table from "@/components/table"

export default function Agreements() {
    const agreements = agreementsData();
    const headers = [
        {text: 'ID', value: 'id'},
        {text: 'Title', value: 'title'},
        {text: 'Date', value: 'date'},
    ]
    return (
        <div>
            <Table
                headers={headers}
                items={agreements}
                title="Agreements"
                mainkey="id"
            >
            </Table>
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
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/main
