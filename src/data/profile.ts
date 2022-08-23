export type ProfileData = {
    email: string,
    login: string,
    first_name: string,
    second_name: string,
    display_name: string,
    phone: string,
    password: string,
};

export const PROFILE: ProfileData = Object.freeze({
    email: 'pochta@yandex.ru',
    login: 'ivanivanov',
    first_name: 'Иван',
    second_name: 'Иванов',
    display_name: 'Иван',
    phone: '+7 (909) 967 30 30',
    password: '123456',
});
