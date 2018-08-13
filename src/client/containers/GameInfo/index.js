import React from 'react';
import { equals, length } from 'ramda';
import { array, string } from 'prop-types';
import uuidv1 from 'uuid/v1';

import { getOwnerName } from '../../selectors/game';
import {
    Container,
    Label,
    Name,
    OwnerLabel,
    MeIcon
} from './styles';

const propTypes = {
    usersNames: array,
    ownerName: string,
    me: string,
}

export const GameInfo = ({ me, usersNames, ownerName }) => (
    <Container>
        <Label>{`Players ${length(usersNames)}/2`}</Label>
        {usersNames.map(name => 
            <Name key={uuidv1()}>
                {name}
                {equals(name, ownerName) && <OwnerLabel>(owner)</OwnerLabel>}
                {equals(name, me) && <MeIcon/>}
            </Name>
        )}
    </Container>
);

GameInfo.propTypes = propTypes;

export default GameInfo;