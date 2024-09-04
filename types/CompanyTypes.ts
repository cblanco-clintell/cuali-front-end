export interface CompanyType {
    id: number;
    name: string;
    cif?: string;
    phone_number?: string;
    use_case?: string;
    greeting?: string;
    profile_picture?: string;
    website?: string;
    contact_email?: string;
    address?: string;
    contact_phone?: string;
    introvert_extrovert?: number;
    flexible_strict?: number;
    available_voices?: string[];
    selected_voice?: string;
    plan?: number;
    group?: string;
    status?: string;
  }