import {Statement} from "./_statement";
import {str, IStatementRunnable} from "../combi";

export class EndDo extends Statement {

  public getMatcher(): IStatementRunnable {
    return str("ENDDO");
  }

}