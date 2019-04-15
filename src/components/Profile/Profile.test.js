import React from 'react';
import { shallow } from 'enzyme';
import Profile from './Profile';
import Modal from '../Modal/Modal';
import MemoPost from '../MemoPost/MemoPost';
import BookPost from '../BookPost/BookPost';

const setup = () => {
  const props = {
    getUserProfile: jest.fn(),
    navigateBtnClick: jest.fn(),
    deleteBtnClick: jest.fn(),
    getUserKeywords: jest.fn(),
    getUserBooks: jest.fn(),
    getUserMemos: jest.fn(),
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
    expect(props.getUserMemos).toBeDefined();
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

  it('should call function when memoButton is clicked', () => {
    const memoButton = component.find('.memoButton');
    const postingEvent = {
      currentTarget: {
        className: 'memoButton',
      },
    };

    memoButton.simulate('click', postingEvent);
    expect(props.navigateBtnClick).toHaveBeenLastCalledWith(true);
  });

  it('should call function when bookButton is clicked', () => {
    const bookButton = component.find('.bookButton');
    const postingEvent = {
      currentTarget: {
        className: 'bookButton',
      },
    };

    bookButton.simulate('click', postingEvent);
    expect(props.navigateBtnClick).toHaveBeenLastCalledWith(false);
  });
});

describe('Keyword button', () => {
  let { component } = setup();

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

describe('MemoPost', () => {
  const { component } = setup();

  it('should be mounted on certain state', () => {
    expect(component.find(MemoPost).length).toBe(1);
    component.setProps({ isMemoPage: false });
    expect(component.find(MemoPost).length).toBe(0);
  });
});

describe('BookPost', () => {
  const { component } = setup();

  it('should be mounted on certain state', () => {
    expect(component.find(BookPost).length).toBe(0);
    component.setProps({ isMemoPage: false });
    expect(component.find(BookPost).length).toBe(1);
  });
});
