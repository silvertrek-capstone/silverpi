import {POST} from '@/api/test/route.js'

export default async function testCall() {
    const response = await POST()
    const jsonData = await response.json();
    const customers = jsonData.data
    return (
        <pre>{JSON.stringify(customers, null, 2)}</pre>
    )
}