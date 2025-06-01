/*
 * highlight.js terraform syntax highlighting definition
 *
 * @package: highlightjs-terraform
 * @author:  Seiya Tagami
 * @since:   2025-05-27
 *
 * Description: Terraform (HCL) language definition
 * Category: scripting
 */

import type { HLJSApi, Language, LanguageFn, Mode } from "highlight.js";

/**
 * {@link https://developer.hashicorp.com/terraform/language/expressions/types#numbers}
 */
const NUMBERS: Mode = {
	className: "number",
	begin: "\\b\\d+(\\.\\d+)?",
	relevance: 0,
};

/**
 * {@link https://developer.hashicorp.com/terraform/language/expressions/types#bool}
 */
const BOOLS: Mode = {
	className: "literal",
	begin: "\\b(true|false)\\b",
	relevance: 0,
};

/**
 * {@link https://developer.hashicorp.com/terraform/language/expressions/types#strings}
 * {@link https://developer.hashicorp.com/terraform/language/expressions/strings}
 * TODO: We need to simplify this complex string definition using recursive method to generate
 * nested strings.
 */
const STRINGS: Mode = {
	className: "string",
	begin: '"',
	end: '"',
	contains: [
		{
			className: "subst",
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
					begin: "[A-Za-z_0-9]*\\(",
					end: "\\)",
					contains: [
						NUMBERS,
						{
							className: "string",
							begin: '"',
							end: '"',
							contains: [
								{
									className: "subst",
									begin: "\\${",
									end: "\\}",
									contains: [
										{
											className: "string",
											begin: '"',
											end: '"',
											contains: [
												{
													className: "subst",
													begin: "\\${",
													end: "\\}",
												},
											],
										},
										{
											className: "meta",
											begin: "[A-Za-z_0-9]*\\(",
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

/**
 * {@link https://developer.hashicorp.com/terraform/language/functions}
 */
const FUNCTIONS: Mode = {
	className: "meta",
	begin: "\\b[A-Za-z_0-9]+\\(",
	end: "\\)",
	contains: [NUMBERS, STRINGS, BOOLS, "self"],
};

/**
 * Match following patterns:
 * <BLOCK NAME> {}
 * or
 * <BLOCK NAME> "name" {}
 * or
 * <BLOCK NAME> "name" "name" {}
 */
const BLOCKS: Mode = {
	contains: [
		{
			className: "keyword",
			// NOTE: highlight.js does not highlight words captured by lookahead assertions.
			begin: '^\\s*\\b[A-Za-z_0-9]*\\b(?=\\s*["\\{])',
		},
	],
};

const ALIASES = ["tf", "hcl"];

const hljsDefineTerraform: LanguageFn = (hljs: HLJSApi): Language => {
	return {
		aliases: ALIASES,
		contains: [
			hljs.COMMENT("\\#", "$"),
			NUMBERS,
			BOOLS,
			STRINGS,
			FUNCTIONS,
			BLOCKS,
		],
	};
};

export default function (hljs: HLJSApi) {
	hljs.registerLanguage("terraform", hljsDefineTerraform);
}

export { hljsDefineTerraform as definer };
