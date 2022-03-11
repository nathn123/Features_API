export interface User {
  email: string;
  location: string;
  flags: string[];
}

export interface Feature {
  name: string;
  ratio: number;
  enabledEmails: string[];
  includedCountries: string[];
  excludedCountries: string[];
  count: number;
}
