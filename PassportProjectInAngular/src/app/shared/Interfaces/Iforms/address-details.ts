export interface AddressDetails {
  present_house_street: string;
  present_town: string;
  present_district: string;
  present_police_station: string;
  present_state: string;
  pin: string;
  mobile_number: string;
  telephone_number?: string;
  email: string;
  same_address: boolean;
  permanent_house_street: string;
  permanent_town: string;
  permanent_district: string;
  permanent_police_station: string;
  permanent_state: string;
  permanent_pin: string;
  permanent_mobile_number: string;
  permanent_telephone_number?: string;
  is_address_details_valid: boolean;
}

