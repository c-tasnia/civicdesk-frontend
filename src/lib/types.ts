export interface Department {
  id: string;
  name: string;
  description?: string;
}

export interface ComplaintActivity {
  id: string;
  fromStatus: string | null;
  toStatus: string;
  note: string | null;
  createdAt: string;
  actor: { name: string; role: string };
}

export interface Complaint {
  id: string;
  category: string;
  title: string;
  description: string;
  location: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: string;
  createdAt: string;
  department: { id: string; name: string };
  citizen?: { id: string; name: string; email: string };
  assignedStaff?: { id: string; name: string } | null;
  activity?: ComplaintActivity[];
}

export interface ServiceType {
  id: string;
  name: string;
  description?: string;
  fee: string;
  departmentId: string;
  department?: { id: string; name: string };
}

export interface ServiceRequest {
  id: string;
  status: string;
  note?: string;
  createdAt: string;
  serviceType: ServiceType;
  citizen?: { id: string; name: string };
}
