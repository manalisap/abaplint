import {seq, opt, alt, str, ver, star, per, Expression, IStatementRunnable, altPrio, plus} from "../combi";
import {Constant, FieldSub, TypeName, Integer, Field} from "./";
import {Version} from "../../version";
import {FieldChain} from "./field_chain";

export class TypeTable extends Expression {
  public getRunnable(): IStatementRunnable {
    const likeType = alt(str("LIKE"), str("TYPE"));
    const header = str("WITH HEADER LINE");
    const initial = seq(str("INITIAL SIZE"), new Constant());

    const uniqueness = alt(str("NON-UNIQUE"), str("UNIQUE"));
    const defaultKey = str("DEFAULT KEY");
    const emptyKey = ver(Version.v740sp02, str("EMPTY KEY"));
//    const components = seq(str("COMPONENTS"), plus(new FieldSub()));
//    const named = seq(new Field(), opt(components));

    const key = seq(str("WITH"),
                    opt(uniqueness),
                    altPrio(defaultKey, emptyKey,
                            seq(opt(alt(str("SORTED"), str("HASHED"))),
                                str("KEY"),
                                alt(seq(new Field(), str("COMPONENTS"), plus(new FieldSub())),
                                    plus(new FieldSub())))));

    const normal = seq(opt(alt(str("STANDARD"), str("HASHED"), str("INDEX"), str("SORTED"), str("ANY"))),
                       str("TABLE"),
                       opt(str("OF")),
                       opt(str("REF TO")),
                       opt(new FieldChain()));

    const range = seq(str("RANGE OF"), new FieldChain());

    const typetable = seq(alt(normal, range),
                          opt(per(header, initial)),
                          star(key));

    const occurs = seq(str("OCCURS"), new Integer());

    const old = seq(new TypeName(),
                    alt(seq(occurs, opt(header)),
                        header));

    const ret = seq(likeType,
                    alt(old, typetable));

    return ret;
  }
}