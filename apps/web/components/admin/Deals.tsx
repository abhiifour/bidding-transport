import React from "react";

const DealCard = ({ deal }:any) => (
    <div className="border border-gray-200 rounded-lg p-5 mb-4 bg-white text-sm">
        <h3 className="m-0 font-semibold text-base">{deal.materialType}</h3>
        <div className="text-gray-500 text-sm mb-2">
            Deal Date: {new Date(deal.dealDate).toLocaleDateString()}
        </div>
        <div>
            <strong>Amount:</strong> ₹{deal.amount.toLocaleString()}
        </div>
        <div>
            <strong>Quantity:</strong> {deal.quantity}
        </div>
        <div>
            <strong>Transporter:</strong> {deal.transporter.name}
        </div>
        <div>
            <strong>Logged By:</strong> {deal.loggedBy.name}
        </div>
        <div className="text-gray-400 text-xs mt-2">
            Created: {new Date(deal.createdAt).toLocaleString()}
        </div>
    </div>
);

export default DealCard;
