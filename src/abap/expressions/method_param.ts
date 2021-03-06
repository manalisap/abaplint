import {seq, alt, Expression, str, tok, IStatementRunnable} from "../combi";
import {TypeParam} from "./";
import {MethodParamName} from "./method_param_name";
import {ParenLeft, ParenRightW} from "../tokens/";

export class MethodParam extends Expression {
  public getRunnable(): IStatementRunnable {
    const ref = seq(str("REFERENCE"),
                    tok(ParenLeft),
                    new MethodParamName(),
                    tok(ParenRightW));

    const value = seq(str("VALUE"),
                      tok(ParenLeft),
                      new MethodParamName(),
                      tok(ParenRightW));

    const fieldsOrValue = seq(alt(value,
                                  ref,
                                  new MethodParamName()),
                              new TypeParam());

    return fieldsOrValue;
  }
}