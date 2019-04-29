
export const LOAD_DATA = (Data) => {
    return ({
        type: 'LOAD_DATA',
        Data: Data
    })
    
}

export const CHANGE_NAVIGATION = (Name) => {
    return ({
        type: 'CHANGE_NAVIGATION',
        nameRouter: Name
    })
    
}

export const INIT_STATE = {
    type: 'INIT_STATE',
    Data:[]
}