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
 * {@link https://developer.hashicorp.com/terraform/language/expressions/types#strings}
 */
const STRINGS: Mode = {
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

const BLOCKS: Mode = {
	contains: [
		{
			className: "keyword",
			begin: "^\\s*\\b[a-zA-Z_][a-zA-Z0-9_]*\\b(?!\\s*=)",
			end: '(?=\\s*["\\{])',
			excludeEnd: true,
		},
	],
};

const ALIASES = ["tf", "hcl"];

const hljsDefineTerraform: LanguageFn = (hljs: HLJSApi): Language => {
	return {
		aliases: ALIASES,
		contains: [hljs.COMMENT("\\#", "$"), NUMBERS, STRINGS, BLOCKS],
	};
};

export default function (hljs: HLJSApi) {
	hljs.registerLanguage("terraform", hljsDefineTerraform);
}

export { hljsDefineTerraform as definer };
