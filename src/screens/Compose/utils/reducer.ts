import { ComposeAction, ComposeState } from "./types";

const composeReducer = (
  state: ComposeState,
  action: ComposeAction
): ComposeState => {
  switch (action.type) {
    case "onChangeText":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "onSetActivityDate":
      return {
        ...state,
        lostDate: action.payload,
      };
    default:
      throw new Error("Unexpected action");
  }
};

export default composeReducer;
