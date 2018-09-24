import {Statement} from "./statement";
import {verNot, str, seq, IRunnable} from "../combi";
import {Target} from "../expressions";
import {Version} from "../../version";

export class Free extends Statement {

  public static get_matcher(): IRunnable {
    let ret = seq(str("FREE"), new Target());

    return verNot(Version.Cloud, ret);
  }

}