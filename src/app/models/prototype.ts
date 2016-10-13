
export class Prototype {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public more_info: string,
    public has_more_info: boolean,
    public synopsis: string,
    public play_time: string,
    public min_players: string,
    public max_players: string,

    public user: any
) {}
}

export const fixPrototype = (prototype: Prototype) => {
  prototype.description = prototype.description.split('\n').join('<br>');
  prototype.has_more_info = prototype.more_info.length > 10;
};
