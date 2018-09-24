import {Statement} from "./statement";
import {verNot, str, seq, opt, per, alt, plus, IRunnable} from "../combi";
import {Source, NamespaceSimpleName, Dynamic, Field} from "../expressions";
import {Version} from "../../version";

export class Submit extends Statement {

  public static get_matcher(): IRunnable {
    let sign = seq(str("SIGN"), new Source());
    let eq = alt(str("="), str("EQ"), str("IN"), str("NE"), str("INCL"));
    let compare = seq(eq, new Source());
    let between = seq(str("BETWEEN"), new Source(), str("AND"), new Source());
    let awith = seq(str("WITH"), new Field(), alt(compare, between));
    let prog = alt(new NamespaceSimpleName(), new Dynamic());
    let job = seq(str("VIA JOB"), new Source(), str("NUMBER"), new Source());
    let exporting = str("EXPORTING LIST TO MEMORY");
    let withTab = seq(str("WITH SELECTION-TABLE"), new Source());
    let spool = seq(str("SPOOL PARAMETERS"), new Source());
    let archive = seq(str("ARCHIVE PARAMETERS"), new Source());
    let lineSize = seq(str("LINE-SIZE"), new Source());
    let lineCount = seq(str("LINE-COUNT"), new Source());
    let user = seq(str("USER"), new Source());
    let sset = seq(str("USING SELECTION-SET"), new Source());
    let ssetp = seq(str("USING SELECTION-SETS OF PROGRAM"), new Source());
    let uss = seq(str("USING SELECTION-SCREEN"), new Source());
    let free = seq(str("WITH FREE SELECTIONS"), new Source());

    let keep = seq(str("KEEP IN SPOOL"), new Source());
    let imm = seq(str("IMMEDIATELY"), new Source());
    let dest = seq(str("DESTINATION"), new Source());

    let perm = per(plus(awith),
                   withTab,
                   spool,
                   lineSize,
                   lineCount,
                   archive,
                   user,
                   sset,
                   ssetp,
                   keep,
                   imm,
                   dest,
                   free,
                   sign,
                   uss,
                   str("TO SAP-SPOOL"),
                   str("WITHOUT SPOOL DYNPRO"),
                   str("VIA SELECTION-SCREEN"),
                   exporting,
                   str("AND RETURN"),
                   job);

    let ret = seq(str("SUBMIT"), prog, opt(perm));

    return verNot(Version.Cloud, ret);
  }

}