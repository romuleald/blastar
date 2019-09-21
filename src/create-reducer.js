export const createReducer = (mapper, initialState) => (state = initialState, action) =>
    mapper[action.type] ? mapper[action.type](state, action.data) : state;
