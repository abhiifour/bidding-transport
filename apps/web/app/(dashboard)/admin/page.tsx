import DealCard from "@/components/admin/Deals";

const sampleDeal = {
    id: "deal123",
    title: "Special Discount on Electronics",
    materialType: "Electronics",
    amount: 10000,
    quantity: 5,
    transporter: {
        id: "transporter123",
        name: "ABC Transport"
    },
    loggedBy: {
        id: "user123",
        name: "John Doe"
    },
    dealDate: "2023-10-01T10:00:00Z",
    createdAt: "2023-09-30T10:00:00Z"
};

export default function Admin(){

    return (
        <div>
            <h1 className="text-2xl font-medium">Deals </h1>
            <div className="mt-10 grid grid-cols-3 gap-4">
                <DealCard deal={sampleDeal} />
                       
                <DealCard deal={sampleDeal} />
                       
                <DealCard deal={sampleDeal} />
                       
                <DealCard deal={sampleDeal} />
                       
                <DealCard deal={sampleDeal} />
                       
                <DealCard deal={sampleDeal} />
            </div>
        </div>
    )
}