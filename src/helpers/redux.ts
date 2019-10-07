export const createReducer = (mapper, initialState) => (state = initialState, action) =>
    mapper[action.type] ? mapper[action.type](state, action.data) : state;

export const createMiddleware = mapper => store => next => action => {
    const callback = mapper[action.type];
    if (!callback) {
        return next(action);
    }
    return callback({store, next, action});
};
