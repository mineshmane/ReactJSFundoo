let initialstate={view:false,open:false};

const postReducer = (state = initialstate, action) => {
    console.log(" switch ");
    
    switch (action.type) {
        case 'listView':
            console.log(" calledc reducer method ",action.data);

            return {view:!state.view};
        case 'slideCard':
            return {open:!state.open};
        default:
            return state;
    }
}
export default postReducer;