export default function WorkOrderDetail({ params }) {
    //const router = useRouter();
    //const { id } = router.query;

    // Optionally, fetch more details based on the id
    // const orderDetails = fetchOrderDetails(id);

    return (
        <div>
            <h1>Work Order Details for ID: {params.id}</h1>
            {/* Render additional details here */}
        </div>
    );
}