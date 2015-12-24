/// <reference path="typings/mocha/mocha.d.ts" />
/// <reference path="typings/chai/chai.d.ts" />
/// <reference path="../typings/node/node.d.ts" />

import Lexer from "../src/lexer";
import Token from "../src/token";
import chai = require("chai");

let expect = chai.expect;
let fs = require("fs");

function helper(file: string): Lexer {
    let buf = fs.readFileSync(__dirname + "/abap/" + file, "utf8");
    let lexer = new Lexer(buf);
    lexer.run();
    return lexer;
}

describe("tokens", function() {
    let tests = [
        {file: "zhello01", expected: 6},
        {file: "zhello02", expected: 6},
        {file: "zhello03", expected: 6},
        {file: "zhello04", expected: 6},
        {file: "zhello05", expected: 6},
        {file: "zhello06", expected: 6},
        {file: "zhello07", expected: 10},
    ];

    tests.forEach(function(test) {
        it(test.file + " should be " + test.expected, () => {
            let tokens = helper(test.file + ".prog.abap").get_tokens();
            expect(tokens.length).to.equals(test.expected);
        });
    });
});