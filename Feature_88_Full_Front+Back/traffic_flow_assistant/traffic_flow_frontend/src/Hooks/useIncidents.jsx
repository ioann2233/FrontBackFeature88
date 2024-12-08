import {useMemo} from 'react';

export const useIncidents = (filter, incidents) => {
    return useMemo(() => {
        if (filter === 1)
            return incidents;
        else if (filter === 2)
            return ([...incidents].filter(incident => !incident.status))
        else if (filter === 3)
            return ([...incidents].filter(incident => incident.status))
    }, [incidents, filter]);
}

export default useIncidents;