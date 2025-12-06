export interface RawFamilyData {
  [key: string]: RawFamilyData | string[];
}

export interface FamilyMember {
  id: string;
  name: string;
  children: FamilyMember[];
  parentId?: string;
}

export interface SearchResult {
  member: FamilyMember;
  path: string[]; // Array of IDs leading to this member
}
