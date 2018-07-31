import React from 'react';
import { map, equals } from 'ramda';
import { array, string } from 'prop-types';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

import { getUsersNames, getOwnerName } from '../../selectors/game';
import {
    Container,
    Label,
    Name,
    OwnerIcon
} from './styles';

const propTypes = {
    usersNames: array,
    owner: string,
}

const GameInfo = ({ usersNames, owner }) => (
    <Container>
        <Label>Players</Label>
        {usersNames.map(name => 
            <Name key={uuidv1()}>
                {name}{equals(name, owner) && <OwnerIcon/>}
            </Name>
        )}
    </Container>
);

GameInfo.propTypes = propTypes;

const mapStateToProps = state => ({
    usersNames: getUsersNames(state),
    owner: getOwnerName(state),
});

export default connect(mapStateToProps)(GameInfo);