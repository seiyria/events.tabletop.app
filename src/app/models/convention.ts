
export const RELATED_MODELS = ['geolocation', 'venue', 'updates', 'badges'];

export class Convention {
  constructor(
    public id: string,
    public name: string,
    public description: string
  ) {}
}
