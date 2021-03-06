import {Position} from "../../position";

// todo, should this be an interface instead?
export abstract class Token {
  private pos: Position;
  private str: string;

  constructor(pos: Position, str: string) {
    this.pos = pos;
    this.str = str;
  }

  public getStr(): string {
    return this.str;
  }

  public getRow(): number {
    return this.pos.getRow();
  }

  public getCol(): number {
    return this.pos.getCol();
  }

// todo, rename to getPosition to align across?
  public getPos(): Position {
    return this.pos;
  }
}