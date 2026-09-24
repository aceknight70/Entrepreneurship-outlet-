import { supabase } from './supabase';
import { SCHOOL_CONFIG } from '../config';

export type BridgeRequestStatus = 'pending' | 'parent_review' | 'submitted' | 'approved' | 'declined';

export interface MarketItemSale {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface StudentProfileData {
  id: string;
  name: string;
  schoolName: string;
  parentName: string;
  studentCode: string;
  parentCode: string;
  salesRecord: MarketItemSale[];
  totalSales: number;
  productionLogSummary: {
    batchNumber: string;
    resinUsedMl: number;
    defectRate: string;
    cureTimeHours: number;
    technique: string;
  };
  refinedBusinessPlanSummary: {
    targetMargin: string;
    monthlyProductionUnits: number;
    unitBaseCost: number;
    unitSalePrice: number;
    breakevenUnits: number;
  };
}

export interface BridgeRequest {
  id: string;
  student_id?: string | null;
  parent_id?: string | null;
  requested_amount: number;
  plan_text: string;
  child_letter_signature: string;
  parent_acknowledged_at: string | null;
  parent_letter_signature: string | null;
  status: BridgeRequestStatus;
  created_at: string;
  committee_notes?: string | null;
  student_name?: string;
  parent_name?: string;
  school_name?: string;
}

export const CURRENT_STUDENT_PROFILE: StudentProfileData = {
  id: '014-chi-dss',
  name: 'Chidinma Okafor',
  schoolName: SCHOOL_CONFIG.name,
  parentName: 'Mrs. Ngozi Okafor',
  studentCode: `S-${SCHOOL_CONFIG.initials}-CHI-014`,
  parentCode: `P-${SCHOOL_CONFIG.initials}-CHI-014`,
  salesRecord: [
    { id: 'sale-1', name: 'Swirl Resin Beads (Strings of 10)', quantity: 14, unitPrice: 250, total: 3500 },
    { id: 'sale-2', name: 'Gold Leaf Teardrop Earrings', quantity: 12, unitPrice: 350, total: 4200 },
    { id: 'sale-3', name: 'Polished Mica Pendant', quantity: 6, unitPrice: 500, total: 3000 },
    { id: 'sale-4', name: 'Hexagonal Custom Keyholders', quantity: 11, unitPrice: 300, total: 3300 },
  ],
  totalSales: 14000,
  productionLogSummary: {
    batchNumber: 'Batch #3 (Week 7-8)',
    resinUsedMl: 45,
    defectRate: '0% (3 perfect releases, 0 microbubbles)',
    cureTimeHours: 24,
    technique: 'Syringe measurement 2:1 ratio with mica swirl & slow pour'
  },
  refinedBusinessPlanSummary: {
    targetMargin: '45.5%',
    monthlyProductionUnits: 40,
    unitBaseCost: 16,
    unitSalePrice: 35,
    breakevenUnits: 8
  }
};

const STORAGE_KEY = 'graphitti_bridge_requests_v2';

function getLocalRequests(): BridgeRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed reading bridge requests from storage', err);
  }
  return [];
}

function saveLocalRequests(requests: BridgeRequest[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  } catch (err) {
    console.error('Failed saving bridge requests to storage', err);
  }
}

export const bridgeService = {
  getStudentProfile(): StudentProfileData {
    return CURRENT_STUDENT_PROFILE;
  },

  /**
   * Fetches the current student's bridge request (checks Supabase, falls back to localStorage)
   */
  async getStudentBridgeRequest(studentId: string = CURRENT_STUDENT_PROFILE.id): Promise<BridgeRequest | null> {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const { data, error } = await supabase
          .from('gs_bridge_requests')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);

        if (!error && data && data.length > 0) {
          const row = data[0];
          return {
            id: row.id,
            student_id: row.student_id,
            parent_id: row.parent_id,
            requested_amount: Number(row.requested_amount) || 0,
            plan_text: row.plan_text || '',
            child_letter_signature: row.child_letter_signature || '',
            parent_acknowledged_at: row.parent_acknowledged_at || null,
            parent_letter_signature: row.parent_letter_signature || null,
            status: row.status as BridgeRequestStatus,
            created_at: row.created_at,
            student_name: CURRENT_STUDENT_PROFILE.name,
            parent_name: CURRENT_STUDENT_PROFILE.parentName,
            school_name: CURRENT_STUDENT_PROFILE.schoolName
          };
        }
      } catch (err) {
        console.warn('Supabase fetch failed for gs_bridge_requests:', err);
      }
    }

    // LocalStorage fallback
    const local = getLocalRequests();
    return local[0] || null;
  },

  /**
   * Step 1: Submit child's letter to parent
   */
  async submitChildLetter({
    planText,
    requestedAmount,
    signature
  }: {
    planText: string;
    requestedAmount: number;
    signature: string;
  }): Promise<BridgeRequest> {
    const newRequest: BridgeRequest = {
      id: crypto.randomUUID ? crypto.randomUUID() : `bridge-${Date.now()}`,
      student_id: null,
      parent_id: null,
      requested_amount: requestedAmount,
      plan_text: planText,
      child_letter_signature: signature,
      parent_acknowledged_at: null,
      parent_letter_signature: null,
      status: 'parent_review',
      created_at: new Date().toISOString(),
      student_name: CURRENT_STUDENT_PROFILE.name,
      parent_name: CURRENT_STUDENT_PROFILE.parentName,
      school_name: CURRENT_STUDENT_PROFILE.schoolName
    };

    // Save to Supabase if available
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        const { data, error } = await supabase
          .from('gs_bridge_requests')
          .insert([{
            requested_amount: newRequest.requested_amount,
            plan_text: newRequest.plan_text,
            child_letter_signature: newRequest.child_letter_signature,
            parent_acknowledged_at: null,
            parent_letter_signature: null,
            status: 'parent_review',
            created_at: newRequest.created_at
          }])
          .select()
          .single();

        if (!error && data) {
          newRequest.id = data.id;
        }
      } catch (err) {
        console.warn('Supabase insert failed for child letter:', err);
      }
    }

    // Save to local storage
    const all = getLocalRequests().filter((r) => r.id !== newRequest.id);
    saveLocalRequests([newRequest, ...all]);

    return newRequest;
  },

  /**
   * Parent acknowledges receipt of child's letter
   */
  async acknowledgeChildLetter(requestId: string): Promise<BridgeRequest> {
    const now = new Date().toISOString();

    // Supabase update
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        await supabase
          .from('gs_bridge_requests')
          .update({
            parent_acknowledged_at: now
          })
          .eq('id', requestId);
      } catch (err) {
        console.warn('Supabase acknowledge update failed:', err);
      }
    }

    // Local storage update
    const all = getLocalRequests();
    let updated: BridgeRequest | null = null;
    const mapped = all.map((r) => {
      if (r.id === requestId) {
        updated = {
          ...r,
          parent_acknowledged_at: now
        };
        return updated;
      }
      return r;
    });

    if (!updated && all.length > 0) {
      // If id didn't match, update first record
      updated = { ...all[0], parent_acknowledged_at: now };
      mapped[0] = updated;
    } else if (!updated) {
      updated = {
        id: requestId,
        requested_amount: 70000,
        plan_text: 'buy resin, hardener, and multiple silicone moulds in bulk, so I can move from making a few pieces at a time to running proper production batches — enough for wholesale orders, the Christmas exhibition, and steady stock for the Day Spring Marketplace going forward',
        child_letter_signature: CURRENT_STUDENT_PROFILE.studentCode,
        parent_acknowledged_at: now,
        parent_letter_signature: null,
        status: 'parent_review',
        created_at: now,
        student_name: CURRENT_STUDENT_PROFILE.name,
        parent_name: CURRENT_STUDENT_PROFILE.parentName,
        school_name: CURRENT_STUDENT_PROFILE.schoolName
      };
      mapped.push(updated);
    }

    saveLocalRequests(mapped);
    return updated!;
  },

  /**
   * Step 2: Parent submits funding request to Cooperative Committee
   */
  async submitParentLetter({
    requestId,
    parentSignature
  }: {
    requestId: string;
    parentSignature: string;
  }): Promise<BridgeRequest> {
    // Supabase update
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        await supabase
          .from('gs_bridge_requests')
          .update({
            parent_letter_signature: parentSignature,
            status: 'submitted'
          })
          .eq('id', requestId);
      } catch (err) {
        console.warn('Supabase parent letter update failed:', err);
      }
    }

    // Local storage update
    const all = getLocalRequests();
    let updated: BridgeRequest | null = null;
    const mapped = all.map((r) => {
      if (r.id === requestId) {
        updated = {
          ...r,
          parent_letter_signature: parentSignature,
          status: 'submitted' as BridgeRequestStatus
        };
        return updated;
      }
      return r;
    });

    if (!updated && all.length > 0) {
      updated = {
        ...all[0],
        parent_letter_signature: parentSignature,
        status: 'submitted'
      };
      mapped[0] = updated;
    }

    saveLocalRequests(mapped);
    return updated!;
  },

  /**
   * Cooperative Committee Admin: fetch all submissions for review
   */
  async getAllRequests(): Promise<BridgeRequest[]> {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const { data, error } = await supabase
          .from('gs_bridge_requests')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((row: any) => ({
            id: row.id,
            student_id: row.student_id,
            parent_id: row.parent_id,
            requested_amount: Number(row.requested_amount) || 0,
            plan_text: row.plan_text || '',
            child_letter_signature: row.child_letter_signature || '',
            parent_acknowledged_at: row.parent_acknowledged_at || null,
            parent_letter_signature: row.parent_letter_signature || null,
            status: row.status as BridgeRequestStatus,
            created_at: row.created_at,
            student_name: CURRENT_STUDENT_PROFILE.name,
            parent_name: CURRENT_STUDENT_PROFILE.parentName,
            school_name: CURRENT_STUDENT_PROFILE.schoolName
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch failed for all requests:', err);
      }
    }

    return getLocalRequests();
  },

  /**
   * Committee review action: approve or decline
   */
  async updateRequestStatus(
    requestId: string, 
    newStatus: BridgeRequestStatus,
    notes?: string
  ): Promise<BridgeRequest> {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        await supabase
          .from('gs_bridge_requests')
          .update({
            status: newStatus
          })
          .eq('id', requestId);
      } catch (err) {
        console.warn('Supabase status update failed:', err);
      }
    }

    const all = getLocalRequests();
    let updated: BridgeRequest | null = null;
    const mapped = all.map((r) => {
      if (r.id === requestId) {
        updated = {
          ...r,
          status: newStatus,
          committee_notes: notes || r.committee_notes
        };
        return updated;
      }
      return r;
    });

    saveLocalRequests(mapped);
    return updated!;
  },

  /**
   * Helper to reset or create a seed request for demo testing
   */
  seedDemoRequest(): BridgeRequest {
    const demoReq: BridgeRequest = {
      id: 'demo-bridge-req-1',
      student_id: CURRENT_STUDENT_PROFILE.id,
      parent_id: null,
      requested_amount: 70000,
      plan_text: 'buy resin, hardener, and multiple silicone moulds in bulk, so I can move from making a few pieces at a time to running proper production batches — enough for wholesale orders, the Christmas exhibition, and steady stock for the Day Spring Marketplace going forward',
      child_letter_signature: CURRENT_STUDENT_PROFILE.studentCode,
      parent_acknowledged_at: null,
      parent_letter_signature: null,
      status: 'parent_review',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
      student_name: CURRENT_STUDENT_PROFILE.name,
      parent_name: CURRENT_STUDENT_PROFILE.parentName,
      school_name: CURRENT_STUDENT_PROFILE.schoolName
    };
    saveLocalRequests([demoReq]);
    return demoReq;
  }
};
