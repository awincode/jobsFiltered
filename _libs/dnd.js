
import bug from './bug';

export const findElem = (elemOrder) => (elem) => elemOrder.findIndex (value => value === elem);

export const moveElem = (updateFilter, {setIsMoving, setIsMovingFromZone, type}) => 
    (elemList, elem, atIndex, env) => {
                                                            // bug('*** dnd.js::moveElemFor2 - elemList', elemList)
                                                                        // bug('elemO moveElem - elemList', elemList)
        const index = findElem (elemList)(elem);
                                // bug('dnd.js:: *** elemList, elem, index, atIndex', elemList, elem, index, atIndex)
                // bug('*** dnd.js::moveElemFor2 - env, newEnv, elemList, index, atIndex', env, elemList, index, atIndex)
        updateFilter (
            elem, 
            { index, atIndex }, 
            env, 
            type,
        );

        if (env && env[1]) {
            setIsMovingFromZone (env[1]);
        }

        if (setIsMoving) {
            setIsMoving (true);
        }
    };