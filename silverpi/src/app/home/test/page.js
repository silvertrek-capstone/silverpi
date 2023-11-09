

export default async function testCall() {
    const res = await import('../../api/test/route.js')
    const response = await res.POST()
    // console.log(response);

    const customers = response.data
    return (
        <pre>{JSON.stringify(customers, null, 2)}</pre>
    )
}