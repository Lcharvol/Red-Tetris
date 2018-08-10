import React from 'react';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import StartButton from '../index';
import {
    Container,
    ButtonText
} from '../styles';

configure({ adapter: new Adapter() });

describe('StartButton:', () => {
    describe('index.js:', () => {
        // GIVEN
        const props = {
            startGame: () => {},
            isGameStarted: false,
            roomName: 'fakeRoomName',
            me: 'lcharvol',
            opacity: 1,
            handleChangeOpacity: jest.fn(),
            io: {
                emit: jest.fn(),
            }
        }
        const wrapper = mount(<StartButton {...props}/>);
        it('ShouldFind a Container witth 1 childrens', () => {
            expect(wrapper.find(Container).length).toBe(1);
            expect(wrapper.find(Container).children().length).toBe(1);
        });
        it('ShouldFind a ButtonText', () => {
            expect(wrapper.find(ButtonText).length).toBe(1);
        });
        it('should handle click events', () => {
            const props = {
                startGame: () => {},
                isGameStarted: false,
                roomName: 'fakeRoomName',
                me: 'lcharvol',
                opacity: 1,
                handleChangeOpacity: jest.fn(),
                io: {
                    emit: jest.fn(),
                }
            }
            const wrapper = mount(<StartButton {...props}/>);
            wrapper.find(Container).first().simulate('click');
            expect(props.io.emit).toHaveBeenCalledWith('action', {name: 'startGame', gameName: props.roomName, user: props.me});
            // expect(props.handleChangeOpacity).toHaveBeenCalledWith(0);
        });
        it('should not handle click events', () => {
            const props = {
                startGame: () => {},
                isGameStarted: true,
                roomName: 'fakeRoomName',
                me: 'lcharvol',
                opacity: 1,
                handleChangeOpacity: jest.fn(),
                io: {
                    emit: jest.fn(),
                }
            }
            const wrapper = mount(<StartButton {...props}/>);
            wrapper.find(Container).first().simulate('click');
            expect(props.io.emit).toHaveBeenCalledTimes(0);
            expect(props.handleChangeOpacity).toHaveBeenCalledTimes(0);
        });
    });
});