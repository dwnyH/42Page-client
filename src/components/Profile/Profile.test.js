import React from 'react';
import { shallow } from 'enzyme';
import Profile from './Profile';
import Modal from '../Modal/Modal';

const setup = () => {
  const props = {
    getUserProfile: jest.fn(),
    navigateBtnClick: jest.fn(),
    deleteBtnClick: jest.fn(),
    getUserKeywords: jest.fn(),
    getUserBooks: jest.fn(),
    postInfo: {
      postUpdating: false,
      memos: [],
      profile: {
        name: '',
        imgSrc: '',
        bookTotal: null,
        memoTotal: null,
      },
      memoSearching: true,
    },
    userBooks: [],
    isMemoPage: true,
    history: { push: jest.fn() },
    match: { params: {} },
  };

  const state = {
    isModalOpen: false,
  };

  const component = shallow(<Profile {...props} {...state} />);

  return {
    component,
    props,
    state,
  };
};

describe('Profile', () => {
  const { component, props } = setup();

  it('renders properly', () => {
    expect(component.exists()).toBe(true);
  });

  it('should have default props', () => {
    expect(props.getUserProfile).toBeDefined();
    expect(props.navigateBtnClick).toBeDefined();
    expect(props.deleteBtnClick).toBeDefined();
    expect(props.getUserKeywords).toBeDefined();
    expect(props.getUserBooks).toBeDefined();
    expect(props.postInfo.postUpdating).toEqual(false);
    expect(props.postInfo.memos).toEqual([]);
    expect(props.postInfo.profile.name).toEqual('');
    expect(props.postInfo.profile.imgSrc).toEqual('');
    expect(props.postInfo.profile.bookTotal).toEqual(null);
    expect(props.postInfo.profile.memoTotal).toEqual(null);
    expect(props.postInfo.memoSearching).toEqual(true);
    expect(props.userBooks).toEqual([]);
    expect(props.isMemoPage).toEqual(true);
    expect(props.history.push).toBeDefined();
    expect(props.match.params).toEqual({});
  });
});

describe('Keyword button', () => {
  const { component } = setup();

  it('should handle click events', () => {
    component.instance().showModal = jest.fn(() => {
      component.setState({ isModalOpen: true });
    });

    component.instance().forceUpdate();
    component.find('.keywordBtn').simulate('click');

    expect(component.instance().showModal).toHaveBeenCalledTimes(1);
    expect(component.state().isModalOpen).toBeTruthy();
  });
});

describe('Modal', () => {
  const { component } = setup();

  it('should be mounted on certain state', () => {
    expect(component.find(Modal).length).toBe(0);
    component.setState({ isModalOpen: true });
    expect(component.find(Modal).length).toBe(1);
  });
});
