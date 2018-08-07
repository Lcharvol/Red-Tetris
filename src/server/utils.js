import { equals } from 'ramda';

export const getPointByline = nbLines => {
    if(equals(nbLines, 1))
        return 50;
    else if(equals(nbLines, 2))
        return 150;
    else if(equals(nbLines, 3))
        return 350;
    else if(nbLines >= 4)
        return 1000;
    return 0;
}