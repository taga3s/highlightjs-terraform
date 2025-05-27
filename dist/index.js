const NUMBERS = {
    className: "number",
    begin: "\\b\\d+(\\.\\d+)?",
    relevance: 0,
};
const STRINGS = {
    className: "string",
    begin: '"',
    end: '"',
    contains: [
        {
            className: "variable",
            begin: "\\${",
            end: "\\}",
            relevance: 9,
            contains: [
                {
                    className: "string",
                    begin: '"',
                    end: '"',
                },
                {
                    className: "meta",
                    begin: "[A-Za-z_0-9]*" + "\\(",
                    end: "\\)",
                    contains: [
                        NUMBERS,
                        {
                            className: "string",
                            begin: '"',
                            end: '"',
                            contains: [
                                {
                                    className: "variable",
                                    begin: "\\${",
                                    end: "\\}",
                                    contains: [
                                        {
                                            className: "string",
                                            begin: '"',
                                            end: '"',
                                            contains: [
                                                {
                                                    className: "variable",
                                                    begin: "\\${",
                                                    end: "\\}",
                                                },
                                            ],
                                        },
                                        {
                                            className: "meta",
                                            begin: "[A-Za-z_0-9]*" + "\\(",
                                            end: "\\)",
                                        },
                                    ],
                                },
                            ],
                        },
                        "self",
                    ],
                },
            ],
        },
    ],
};
const hljsDefineTerraform = (hljs) => {
    return {
        aliases: ["tf", "hcl"],
        keywords: "resource variable provider output locals module data terraform|10",
        contains: [hljs.COMMENT("\\#", "$"), NUMBERS, STRINGS],
    };
};
export default function (hljs) {
    hljs.registerLanguage("terraform", hljsDefineTerraform);
}
export { hljsDefineTerraform as definer };
