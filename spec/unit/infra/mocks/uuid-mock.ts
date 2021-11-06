export const v4Mock = jest.fn(() => 'any_id');

jest.mock('uuid', () => ({
  v4: v4Mock,
}));
