import { RectangleAdapter, Square } from "./geometry";
import { Calculator, Rectangle } from "./geometry.third-party";

test("RectangleAdapter adapts Quadratic as a Rectangular object", () => {
  const square = new Square(3);
  const adapted = new RectangleAdapter(square);
  expect(Calculator.getArea(adapted)).toBeCloseTo(9);
  expect(Calculator.getPerimeter(adapted)).toBeCloseTo(12);
  expect(Calculator.getDiagonal(adapted)).toBeCloseTo(Math.sqrt(18));
});

test("Calculator.getWidthHeightRatio calculates the width-to-height ratio", () => {
  const rectangle = new Rectangle(4, 2);
  expect(Calculator.getWidthHeightRatio(rectangle)).toBeCloseTo(2.0);

  const square = new Square(3);
  const adapted = new RectangleAdapter(square);
  expect(Calculator.getWidthHeightRatio(adapted)).toBeCloseTo(1.0);
});
