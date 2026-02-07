import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
    email : Text;
    company : ?Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Lead Management Types
  public type LeadStatus = {
    #new;
    #contacted;
    #qualified;
    #proposalSent;
    #negotiation;
    #won;
    #lost;
  };

  public type Lead = {
    id : Text;
    name : Text;
    email : Text;
    company : ?Text;
    status : LeadStatus;
    notes : [Text];
    createdTime : Time.Time;
    lastUpdated : Time.Time;
  };

  public type CreateLeadInput = {
    name : Text;
    email : Text;
    company : ?Text;
  };

  public type UpdateStatusInput = {
    leadId : Text;
    newStatus : LeadStatus;
  };

  public type AddNoteInput = {
    leadId : Text;
    note : Text;
  };

  var nextLeadId = 1;
  let leads = Map.empty<Text, Lead>();

  // Create new lead from form submission
  // PUBLIC: Anyone can submit a lead (including anonymous/guest users)
  public shared ({ caller }) func createLead(input : CreateLeadInput) : async Text {
    let leadId = Int.toText(nextLeadId);
    nextLeadId += 1;

    let newLead : Lead = {
      id = leadId;
      name = input.name;
      email = input.email;
      company = input.company;
      status = #new;
      notes = [];
      createdTime = Time.now();
      lastUpdated = Time.now();
    };

    leads.add(leadId, newLead);
    leadId;
  };

  // Get all leads
  // PROTECTED: Only authenticated users can view leads
  public query ({ caller }) func getAllLeads() : async [Lead] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view leads");
    };
    leads.values().toArray();
  };

  // Get lead details by id
  // PROTECTED: Only authenticated users can view lead details
  public query ({ caller }) func getLead(leadId : Text) : async Lead {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view lead details");
    };
    switch (leads.get(leadId)) {
      case (null) { Runtime.trap("Lead not found") };
      case (?lead) { lead };
    };
  };

  // Update lead status
  // PROTECTED: Only authenticated users can update lead status
  public shared ({ caller }) func updateLeadStatus(input : UpdateStatusInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update lead status");
    };
    switch (leads.get(input.leadId)) {
      case (null) { Runtime.trap("Lead not found") };
      case (?lead) {
        let updatedLead : Lead = {
          lead with
          status = input.newStatus;
          lastUpdated = Time.now();
        };
        leads.add(input.leadId, updatedLead);
      };
    };
  };

  // Add note to lead
  // PROTECTED: Only authenticated users can add notes
  public shared ({ caller }) func addLeadNote(input : AddNoteInput) : async ?Lead {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add notes");
    };
    switch (leads.get(input.leadId)) {
      case (null) { Runtime.trap("Lead not found") };
      case (?lead) {
        let updatedNotes = lead.notes.concat([input.note]);
        let updatedLead : Lead = {
          lead with
          notes = updatedNotes;
          lastUpdated = Time.now();
        };
        leads.add(input.leadId, updatedLead);
        ?updatedLead;
      };
    };
  };

  // Get leads by status
  // PROTECTED: Only authenticated users can filter leads
  public query ({ caller }) func getLeadsByStatus(status : LeadStatus) : async [Lead] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view leads");
    };
    leads.values().toArray();
  };

  // Get total number of leads
  // PROTECTED: Only authenticated users can view lead statistics
  public query ({ caller }) func getTotalLeads() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view lead statistics");
    };
    leads.size();
  };

  // Get lead timeline (created and updated timestamps)
  // PROTECTED: Only authenticated users can view lead timeline
  public query ({ caller }) func getLeadTimeline(leadId : Text) : async (Time.Time, Time.Time) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view lead timeline");
    };
    switch (leads.get(leadId)) {
      case (null) { Runtime.trap("Lead not found") };
      case (?lead) { (lead.createdTime, lead.lastUpdated) };
    };
  };

  // Get lead creator
  // PROTECTED: Only authenticated users can view lead creator
  public query ({ caller }) func getLeadCreator(leadId : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view lead creator");
    };
    switch (leads.get(leadId)) {
      case (null) { Runtime.trap("Lead not found") };
      case (?lead) { lead.name };
    };
  };
};
