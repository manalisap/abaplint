import {statementType} from "../_utils";
import * as Statements from "../../../src/abap/statements/";

const tests = [
  "LOCAL foo.",
  "LOCAL moo[].",
  "LOCAL foo-bar.",
];

statementType(tests, "LOCAL", Statements.Local);