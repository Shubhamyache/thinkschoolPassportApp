export interface AddressDetails {
  presentHouseStreet: string;
  presentTown: string;
  presentDistrict: string;
  presentPoliceStation: string;
  presentState: string;
  pincode: string;
  mobileNumber: string;
  telephoneNumber?: string;
  sameAddress: boolean;
  permanentHouseStreet: string;
  permanentTown: string;
  permanentDistrict: string;
  permanentPoliceStation: string;
  permanentState: string;
  permanentPin: string;
  permanentMobileNumber: string;
  permanentTelephoneNumber?: string;
  // isAddressDetailsValid: boolean;
}
