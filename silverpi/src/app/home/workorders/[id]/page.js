export default function WorkOrderDetail({ params }) {
    //const router = useRouter();
    //const { id } = router.query;

    // Optionally, fetch more details based on the id
    // const orderDetails = fetchOrderDetails(id);

    return (
        <div className="bg-grey">
            <div className="bg-grey px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 ">Work Orders #{params.id}</h1>
                </div>
            </div>
        </div>
    );
}