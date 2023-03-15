export type ComposeStateDraft = {
  key: string;
  value: string;
};

export type ComposeState = {
  petName?: string; // null case for "Report Pet"
  petType: string;
  gender: string;
  address: string;
  collarColor: string;
  specialTrait?: string;
  information: string;
  lostDate: Date;
};

export type ComposeAction =
  | {
      type: "onChangeText";
      payload: ComposeStateDraft;
    }
  | {
      type: "onSetActivityDate";
      payload: Date;
    };
