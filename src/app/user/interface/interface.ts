export interface BrandData {
  id: number;
  brand_title: string;
  state_type_id: number;
  user_id: number;
}

export interface StateType {
  id: number;
  code: string;
  name: string;
}
