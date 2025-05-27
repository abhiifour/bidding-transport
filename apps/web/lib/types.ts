export enum Role {
    admin = "admin",
    staff = "staff",
}

export enum Status {
    active = "active",
    inactive = "inactive",
}

export enum BidStatus {
    open = "open",
    accepted = "accepted",
    closed = "closed",
}

export enum BidOfferStatus {
    pending = "pending",
    accepted = "accepted",
    rejected = "rejected",
}

export interface User {
    id: string;
    uid: string;
    email: string;
    role: Role;
    createdAt: Date;
    bids: Bid[];
    manualDeals: ManualDeal[];
}

export interface Transporter {
    id: string;
    name: string;
    contact?: string;
    vehicleType?: string;
    capacity?: number;
    status: Status;
    createdAt: Date;
    bidOffers: BidOffer[];
    manualDeals: ManualDeal[];
}

export interface Bid {
    id: string;
    createdById: string;
    createdBy: User;
    materialType: string;
    quantity: number;
    pickupLocation: string;
    deliveryLocation: string;
    deadline: Date;
    basePriceEstimate?: number;
    status: BidStatus;
    createdAt: Date;
    requirement?: string;
    bidOffers: BidOffer[];
}

export interface BidOffer {
    id: string;
    bidId: string;
    transporterId: string;
    offeredPrice: number;
    offerDate: Date;
    message?: string;
    status: BidOfferStatus;
    bid: Bid;
    transporter: Transporter;
}

export interface ManualDeal {
    id: string;
    transporterId: string;
    loggedById: string;
    materialType: string;
    amount: number;
    quantity: number;
    dealDate: Date;
    createdAt: Date;
    transporter: Transporter;
    loggedBy: User;
}

export interface Deal {
    id: string;
    transporterId: string;
    userId: string;
    bidId: string;
    createdAt: Date;
}