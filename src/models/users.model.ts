import { User, Feature } from '@interfaces/users.interface';
import { array } from 'yargs';

// password: password
export const defaultUsers: User[] = [
  { email: 'fred@example.com', location: 'GB', flags: [] },
  { email: 'rich@example.com', location: 'CA', flags: [] },
  { email: 'kathy@example.com', location: 'US', flags: [] },
  { email: 'sandy@example.com', location: 'CA', flags: [] },
  { email: 'jacob@example.com', location: 'AU', flags: [] },
  { email: 'mike@example.com', location: 'GB', flags: [] },
  { email: 'tom@example.com', location: 'US', flags: [] },
];

export const features: Feature[] = [
  {
    name: 'SuperCoolFeature',
    ratio: 0.5,
    enabledEmails: ['fred@example.com', 'mike@example.com'],
    includedCountries: ['GB'],
    excludedCountries: [],
    count: 0,
  },
  {
    name: 'MarketingBanner',
    ratio: 1,
    enabledEmails: [],
    includedCountries: ['US'],
    excludedCountries: [],
    count: 0,
  },
  {
    name: 'SimplifiedNavBar',
    ratio: 0,
    enabledEmails: ['fred@example.com'],
    includedCountries: [],
    excludedCountries: [],
    count: 0,
  },
  {
    name: 'EnhancedDashboardFeature',
    ratio: 0.5,
    enabledEmails: ['jacob@example.com'],
    includedCountries: ['US', 'CA'],
    excludedCountries: [],
    count: 0,
  },
  {
    name: 'NewUserOnboardingJourney',
    ratio: 0.25,
    enabledEmails: ['tom@example.com'],
    includedCountries: [],
    excludedCountries: ['CA', 'GB'],
    count: 0,
  },
];

export const flaggedUsers: User[] = GenerateFlags(defaultUsers, features);

export function GenerateFlags(users: User[], features: Feature[]) {
  const returnUserlist = users;
  features.forEach(feature => {
    let userCount = 0;
    let userlist = JSON.parse(JSON.stringify(users));
    feature.enabledEmails.forEach(email => {
      // auto add user
      let index = returnUserlist.findIndex(user => user.email === email);
      if (index !== -1) {
        returnUserlist[index].flags.push(feature.name);
        // add to feature count
        feature.count++;
        userCount++;
        // remove from eval list
        index = userlist.findIndex(user => user.email === email);
        userlist.splice(index, 1);
      }
    });

    // continue through eval list
    if (feature.includedCountries.length !== 0) {
      // filter for users only within the included country
      const map = userlist.filter(user => {
        return feature.includedCountries.includes(user.location);
      });
      userlist = map;
    }
    if (feature.excludedCountries.length !== 0) {
      // filter out users within the excluded country
      const map = userlist.filter(user => {
        return !feature.excludedCountries.includes(user.location);
      });
      userlist = map;
    }

    // go through the remaining users and ensure the ratio is hit
    userCount += userlist.length;
    userlist.forEach(user => {
      const ratio = feature.count / userCount;
      if (ratio < feature.ratio) {
        // required ratio more than current ratio

        const index = returnUserlist.findIndex(userL => {
          return userL.email === user.email;
        });

        returnUserlist[index].flags.push(feature.name);

        // add to feature count
        feature.count++;
      }
    });

    // done
  });

  return returnUserlist;
}
