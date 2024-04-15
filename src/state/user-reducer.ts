export type StateType = {
  age: number;
  childrenCount: number;
  name: string;
};

export type ActionType = {
  type: string;
  payload?: string;
};

export const userReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'INCREMENT-AGE':
      return { ...state, age: state.age + 1 };
    case 'INCREMENT-CHILDREN-COUNT':
      return { ...state, childrenCount: state.childrenCount + 1 };
    case 'CHANGE-NAME':
      if (action.payload) return { ...state, name: action.payload };
      return state;
    default:
      throw new Error('I dont undertang action type');
  }
};
