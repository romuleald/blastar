/* eslint-disable @typescript-eslint/no-explicit-any */
type Action = {
    type: string;
    data?: any;
};

type Reducer<State> = (state: State, action: Action) => State;

type ReducerFunction<State> = (state: State, data?: any) => State;

type Mapper<State> = {[actionType: string]: ReducerFunction<State>};

type CreateReducer = <S>(mapper: Mapper<S>, initialState: S) => Reducer<S>;

export const createReducer: CreateReducer = (mapper, initialState) => (state = initialState, action) =>
    mapper[action.type] ? mapper[action.type](state, action.data) : state;

export const createMiddleware = mapper => store => next => action => {
    const callback = mapper[action.type];
    if (!callback) {
        return next(action);
    }
    return callback({store, next, action});
};
