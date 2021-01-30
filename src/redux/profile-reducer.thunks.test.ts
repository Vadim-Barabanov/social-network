import { setUserProfile } from './profile-reducer';
import { profileAPI } from '../api/profile-api';
import { ProfileType } from '../types/types';

jest.mock('../api/profile-api');
const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>;

const getProfileDataResponse: ProfileType = {
    fullName: 'Vadim',
    userId: 1,
    aboutMe: 'Another string',
    lookingForAJob: true,
    lookingForAJobDescription: 'Again another string',
    contacts: {
        github: 'https://github.com/Vadim-Barabanov',
        vk: '',
        facebook: '',
        mainLink: '',
        website: 'https://vadim-barabanov.netlify.app',
        instagram: '',
        twitter: '',
        youtube: '',
    },
};

test('SetUserProfile thunk', async () => {
    const thunk = setUserProfile(1);
    const dispatch = jest.fn();
    const getState = jest.fn();
    profileAPIMock.getProfileData.mockReturnValue(
        Promise.resolve(getProfileDataResponse)
    );
    await thunk(dispatch, getState, {});

    expect(dispatch).toBeCalledTimes(3);
});
