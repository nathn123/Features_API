import { GenerateFlags } from '@models/users.model';

describe('Flag Generation', () => {
  it('correctly filters for included', () => {
    const expectation = [
      {
        email: 'fred@example.com',
        location: 'GB',
        flags: ['Flag A'],
      },
      {
        email: 'steve@example.com',
        location: 'US',
        flags: [],
      },
    ];
    const users = [
      {
        email: 'fred@example.com',
        location: 'GB',
        flags: [],
      },
      {
        email: 'steve@example.com',
        location: 'US',
        flags: [],
      },
    ];
    const features = [
      {
        name: 'Flag A',
        ratio: 0.5,
        enabledEmails: [],
        includedCountries: ['GB'],
        excludedCountries: [],
        count: 0,
      },
    ];

    expect(GenerateFlags(users, features)).toStrictEqual(expectation);
  });
  it('correctly filters for excluded', () => {
    const expectation = [
      {
        email: 'fred@example.com',
        location: 'GB',
        flags: [],
      },
      {
        email: 'steve@example.com',
        location: 'US',
        flags: ['Flag A'],
      },
    ];
    const users = [
      {
        email: 'fred@example.com',
        location: 'GB',
        flags: [],
      },
      {
        email: 'steve@example.com',
        location: 'US',
        flags: [],
      },
    ];
    const features = [
      {
        name: 'Flag A',
        ratio: 0.5,
        enabledEmails: [],
        includedCountries: [],
        excludedCountries: ['GB'],
        count: 0,
      },
    ];

    expect(GenerateFlags(users, features)).toStrictEqual(expectation);
  });
  it('set enabled ignoring other conditions', () => {
    const expectation = [
      {
        email: 'fred@example.com',
        location: 'GB',
        flags: ['Flag A'],
      },
      {
        email: 'steve@example.com',
        location: 'US',
        flags: [],
      },
    ];
    const users = [
      {
        email: 'fred@example.com',
        location: 'GB',
        flags: [],
      },
      {
        email: 'steve@example.com',
        location: 'US',
        flags: [],
      },
    ];
    const features = [
      {
        name: 'Flag A',
        ratio: 0,
        enabledEmails: ['fred@example.com'],
        includedCountries: [],
        excludedCountries: ['GB'],
        count: 0,
      },
    ];

    expect(GenerateFlags(users, features)).toStrictEqual(expectation);
  });
  it('correctly maintains the ratio', () => {
    const expectation = [
      {
        email: 'fred@example.com',
        location: 'GB',
        flags: ['Flag A'],
      },
      {
        email: 'steve@example.com',
        location: 'US',
        flags: [],
      },
    ];
    const users = [
      {
        email: 'fred@example.com',
        location: 'GB',
        flags: [],
      },
      {
        email: 'steve@example.com',
        location: 'US',
        flags: [],
      },
    ];
    const features = [
      {
        name: 'Flag A',
        ratio: 0.5,
        enabledEmails: [],
        includedCountries: [],
        excludedCountries: [],
        count: 0,
      },
    ];

    expect(GenerateFlags(users, features)).toStrictEqual(expectation);
  });
});
