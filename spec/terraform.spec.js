import hljs from "highlight.js";
import { definer } from "../index";
import fs from "fs";
import path from "path";
import { describe } from "vitest";
import { it } from "vitest";
import { expect } from "vitest";

hljs.registerLanguage("terraform", definer);

describe("highlight bundle", () => {
	it("highlights terraform", () => {
		const input = fs.readFileSync(
			path.resolve(__dirname, "./input.txt"),
			"utf-8",
		);

		const { value: result, language } = hljs.highlightAuto(input, [
			"terraform",
		]);

		expect(language).toBe("terraform");
		expect(result).toMatchSnapshot();
	});
});
