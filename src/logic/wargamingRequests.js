const makeWGGetRequest = async (url, data) => {
    data["application_id"] = process.env.REACT_APP_WARGAMING_API_KEY;

    const dataString = Object
        .keys(data)
        .map(key => `${key}=${encodeURIComponent(data[key])}`)
        .join('&');
    const res = await fetch(`${url}?${dataString}`);
    return await res.json()
}

const getTanks = async (data) => {
    let tanks = await makeWGGetRequest('https://api.worldoftanks.com/wot/encyclopedia/vehicles/', data);
    tanks =  tanks.data;

    Object.keys(tanks).forEach(tankId => {
        tanks[tankId].module_ids = Object.keys(tanks[tankId].modules_tree)
    });

    return tanks;
}

export const getAllTanks = async () => {
    const data = {
        fields: 'modules_tree,name,nation,tank_id'
    }
    
    return getTanks(data);
}

export const getTanksById = async (tank_ids) => {
    const data = {
        fields: 'modules_tree,name,nation,tank_id,tier',
        tank_id: tank_ids.join(),
    }
    
    return getTanks(data);
}

export const getModules = async (moduleIds) => {
    const data = {
        fields: 'module_id,name,tanks',
        module_id: moduleIds.join(),
    }
    let modules = await makeWGGetRequest('https://api.worldoftanks.com/wot/encyclopedia/modules/', data)

    return modules.data
}