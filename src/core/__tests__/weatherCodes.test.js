import { describeWeatherCode } from "../weatherCodes";

test("0 kodu 'Açık' dondurur", () => {
    expect(describeWeatherCode(0)).toBe("Açık");
});

test("45 kodu 'Sis' dondurur", () => {
    expect(describeWeatherCode(45)).toBe("Sis");
});

test("tabloda olmayan kod 'Bilinmeyen' dondurur", () => {
    expect(describeWeatherCode(42)).toBe("Bilinmeyen");
});