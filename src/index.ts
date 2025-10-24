/*
 * Original work:
 *
 * highlight.js terraform syntax highlighting definition
 *
 * @see https://github.com/highlightjs/highlight.js
 *
 * :TODO:
 *
 * @package: highlightjs-terraform
 * @author:  Nikos Tsirmirakis <nikos.tsirmirakis@winopsdba.com>
 * @since:   2019-03-20
 *
 * Description: Terraform (HCL) language definition
 * Category: scripting
 */

/*
 * Forked work:
 *
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

const FUNCTION_SYMBOL_REGEX_BEGIN = "[A-Za-z_0-9]+\\(";
const FUNCTION_SYMBOL_REGEX_END = "\\)";

/**
 * Matches strings with interpolation.
 * This function is recursive and creates a new mode for strings with interpolation
 * up to a specified depth.
 */
const createSTRINGSWithINTERPOLATION = (opt: { depth: number }): Mode => {
	if (opt.depth < 0) {
		return { contains: [] };
	}

	const _STRINGS = {
		className: "string",
		begin: '"',
		end: '"',
		contains: [createSTRINGSWithINTERPOLATION({ depth: opt.depth - 1 })],
	};

	const _FUNCTIONS: Mode = {
		className: "meta",
		begin: FUNCTION_SYMBOL_REGEX_BEGIN,
		end: FUNCTION_SYMBOL_REGEX_END,
		contains: [NUMBERS, BOOLS, _STRINGS, "self"],
	};

	const INTERPOLATION: Mode = {
		className: "subst",
		begin: "\\${",
		end: "\\}",
		relevance: 9,
		contains: [NUMBERS, BOOLS, _STRINGS, _FUNCTIONS, "self"],
	};

	return INTERPOLATION;
};

/**
 * {@link https://developer.hashicorp.com/terraform/language/expressions/types#strings}
 * {@link https://developer.hashicorp.com/terraform/language/expressions/strings}
 */
const STRINGS: Mode = {
	className: "string",
	begin: '"',
	end: '"',
	contains: [createSTRINGSWithINTERPOLATION({ depth: 2 })],
};

/**
 * {@link https://developer.hashicorp.com/terraform/language/functions}
 */
const FUNCTIONS: Mode = {
	className: "meta",
	begin: FUNCTION_SYMBOL_REGEX_BEGIN,
	end: FUNCTION_SYMBOL_REGEX_END,
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
