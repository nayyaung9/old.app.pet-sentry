declare namespace PetSentry {
  type CoordinatesProps = {
    latitude: number;
    longitude: number;
  };

  type Account = {
    _id: string;
    name: string;
    email: string;
    profileUrl: string;
    contactNumbers: string[];
    createdAt: string;
    updatedAt: string;
  };

  type Geolocation = {
    type: string;
    coordinates: number[];
    address: string;
  };

  type Post = {
    geolocation: Geolocation;
    _id: string;
    petName: string;
    _owner: Account;
    petType: "Cat" | "Dog" | "Other";
    information: string;
    isReunited: boolean;
    collarColor: string;
    activityType: "Missing" | "Found";
    specialTraits: string;
    gender: string;
    photos: string[];
    activityDate: string;
    isVerify: boolean;
    systemedShortAddress: string | null;
    createdAt: string;
    updatedAt: string;
  };
}
