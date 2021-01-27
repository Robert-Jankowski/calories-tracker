const allEntities = [
    "days",
    "meals",
    "products"
];

const defaultState = allEntities.reduce(
    (acc, entity) => ({
        ...acc,
        [entity]: {
            byId: {},
            allIds: [],
        }
    }),
    {}
);

const entityReducer = (entity, state = {allIds: [], byId: {}}, action) => {

    const actionEntities = action.payload[entity];
    const {actionType} = action.meta;

    switch (actionType) {
        case 'GET_ALL':
            return {
                byId: {
                    ...Object.keys(actionEntities).reduce(
                        (acc, id) => ({
                            ...acc,
                            [id]: {
                                ...state.byId[id],
                                ...actionEntities[id]
                            }
                        }),
                        {}
                    )
                },
                allIds: Object.keys(actionEntities).reduce(
                    (allIds, id) => [...allIds, id],
                    []
                )
            };
        case 'GET_ONE':
            return {
                byId: {
                    ...state.byId,
                    ...Object.keys(actionEntities).reduce(
                        (acc, id) => ({
                            ...acc,
                            [id]: {
                                ...state.byId[id],
                                ...actionEntities[id]
                            }
                        }),
                        {}
                    )
                },
                allIds: Object.keys(actionEntities).reduce(
                    (allIds, id) => (allIds.includes(id) ? allIds : [...allIds, id]),
                    state.allIds
                )
            };
        case 'DELETE_ONE':

            return {
                byId: Object.keys(state.byId).reduce(
                    (acc, id) => {
                        return Object.keys(actionEntities).includes(id) ?
                            acc :
                            {...acc, [id]: { ...state.byId[id] } }
                    }),
                allIds: Object.keys(actionEntities).reduce(
                    (allIds, id) => {
                        return allIds.includes(id) ? allIds.filter(n => n!== id) : allIds

                    }, state.allIds
                )
            }

        default :
            console.log("Warning: Unsupported operation!");
    }
};

const entities = (state = defaultState, action) => {
    if (!action.meta || !action.meta.actionType) return state;

    return {
        ...state,
        ...Object.keys(action.payload).reduce(
            (acc, entity) => ({
                ...acc,
                [entity]: entityReducer(entity, state[entity], action)
            }),
            {}
        )
    };
};

const entitiesReducers = {entities};

export default entitiesReducers;
