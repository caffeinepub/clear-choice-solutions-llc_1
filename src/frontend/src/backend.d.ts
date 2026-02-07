import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lead {
    id: string;
    status: LeadStatus;
    name: string;
    lastUpdated: Time;
    createdTime: Time;
    email: string;
    company?: string;
    notes: Array<string>;
}
export type Time = bigint;
export interface CreateLeadInput {
    name: string;
    email: string;
    company?: string;
}
export interface AddNoteInput {
    note: string;
    leadId: string;
}
export interface UserProfile {
    name: string;
    email: string;
    company?: string;
}
export interface UpdateStatusInput {
    leadId: string;
    newStatus: LeadStatus;
}
export enum LeadStatus {
    new_ = "new",
    won = "won",
    lost = "lost",
    proposalSent = "proposalSent",
    contacted = "contacted",
    negotiation = "negotiation",
    qualified = "qualified"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addLeadNote(input: AddNoteInput): Promise<Lead | null>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createLead(input: CreateLeadInput): Promise<string>;
    getAllLeads(): Promise<Array<Lead>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLead(leadId: string): Promise<Lead>;
    getLeadCreator(leadId: string): Promise<string>;
    getLeadTimeline(leadId: string): Promise<[Time, Time]>;
    getLeadsByStatus(status: LeadStatus): Promise<Array<Lead>>;
    getTotalLeads(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateLeadStatus(input: UpdateStatusInput): Promise<void>;
}
