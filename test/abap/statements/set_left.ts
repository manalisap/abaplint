import {statementType} from "../_utils";
import * as Statements from "../../../src/abap/statements/";

const tests = [
  "SET LEFT SCROLL-BOUNDARY.",
  "SET LEFT SCROLL-BOUNDARY COLUMN 002.",
];

statementType(tests, "SET LEFT", Statements.SetLeft);