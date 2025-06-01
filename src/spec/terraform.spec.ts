import fs from "node:fs";
import path from "node:path";
import hljs from "highlight.js";
import { describe } from "vitest";
import { it } from "vitest";
import { expect } from "vitest";
import { definer } from "../index.ts";

hljs.registerLanguage("terraform", definer);

describe("highlight bundle", () => {
	it("highlights terraform (base-input)", () => {
		const input = fs.readFileSync(
			path.resolve(__dirname, "./base-input.txt"),
			"utf-8",
		);

		const { value: result, language } = hljs.highlightAuto(input, [
			"terraform",
		]);

		expect(language).toBe("terraform");
		expect(result).toMatchSnapshot();
	});

	it("highlights terraform (base2-input)", () => {
		const input = fs.readFileSync(
			path.resolve(__dirname, "./base2-input.txt"),
			"utf-8",
		);

		const { value: result, language } = hljs.highlightAuto(input, [
			"terraform",
		]);

		expect(language).toBe("terraform");
		expect(result).toMatchSnapshot();
	});

	it("highlights terraform (base3-input)", () => {
		const input = fs.readFileSync(
			path.resolve(__dirname, "./base3-input.txt"),
			"utf-8",
		);

		const { value: result, language } = hljs.highlightAuto(input, [
			"terraform",
		]);

		expect(language).toBe("terraform");
		expect(result).toMatchSnapshot();
	});
});
