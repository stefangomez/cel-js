import {run} from "../src/index";


describe("greater", () => {
  test("6 should be greater than 5", () => {
    expect(run(`count > 5`, {count: 6})).toBe(true);
  })
  
  test("5 should not be greater than 5", () => {
    expect(run(`count > 5`, {count: 5})).toBe(false);
  })
  
  test("4 should not be greater than 5", () => {
    expect(run(`count > 5`, {count: 4})).toBe(false);
  })
})

describe("less", () => {
  test("count should be less than 5", () => {
    expect(run(`count < 5`, {count: 4})).toBe(true);
  })
  
  test("count should not be less than 5", () => {
    expect(run(`count < 5`, {count: 5})).toBe(false);
  })
  
  test("count should not be less than 4", () => {
    expect(run(`count < 4`, {count: 4})).toBe(false);
  })
})


describe("and", () => {
  test("like count should be greater than 5 and less than 10", () => {
    expect(run(`like_count > 5 && like_count < 10`, {like_count: 6})).toBe(true);
  });
  
  test("like count should be greater than 5 and 10", () => {
    expect(run(`like_count > 5 && like_count > 10`, {like_count: 8})).toBe(false);
  });
  
})

describe("lessOrEqual", () => {
  test("count should less than 5 or equal to 5", () => {
    expect(run(`count < 5 || count == 5`, {count: 4})).toBe(true);
  })
  test("count should less than 5 but not equal to 2", () => {
    expect(run(`count < 5 && count != 2`, {count: 4})).toBe(true);
  })
  test("count should less than 5 but not equal to 1", () => {
    expect(run(`count < 5 && count != 1`, {count: 1})).toBe(false);
  })
  test("count should less than or equal to 5", () => {
    expect(run(`count <= 5`, {count: 4})).toBe(true);
  })
  test("count should less than or equal to 4", () => {
    expect(run(`count <= 4`, {count: 4})).toBe(true);
  })
  test("count should less than or equal to 10", () => {
    expect(run(`count <= 10`, {count: 11})).toBe(false);
  })
    
})

describe("greatorOrEqual", () => {
  test("count should greater than or equal to 100 should be true", () => {
    expect(run(`count >= 100`, {count: 999})).toBe(true);
  })
  test("count should greater than or equal to 50 should be true", () => {
    expect(run(`count >= 50`, {count: 50})).toBe(true);
  })
  test("count should greater than or equal to 10 should be true", () => {
    expect(run(`count >= 10`, {count: 9})).toBe(false);
  })
    
})

describe("add", () => {
  test("count plus 2 should equal 6", () => {
    expect(run(`count + 2`, {count: 4})).toBe(6);
  })
  test("count plus more_count should equal 10", () => {
    expect(run(`count + more_count`, {count: 4, more_count: 6})).toBe(10);
  })
    
})
describe("subtract", () => {
  test("count minus 2 should equal 2", () => {
    expect(run(`count - 2`, {count: 4})).toBe(2);
  })
    
})
describe("multiply", () => {
  test("count times 4 should equal 16", () => {
    expect(run(`count * 4`, {count: 4})).toBe(16);
  })    
})


describe("divide", () => {
  test("count divided by 4 should equal 4", () => {
    expect(run(`count / 4`, {count: 16})).toBe(4);
  })    
})

describe("remainder", () => {
  test("remainder of count from 5 should equal 2", () => {
    expect(run(`count % 5`, {count: 17})).toBe(2);
  })    
})

describe("ternary", () => {
  test("if count is greater than 5 return 'big' should be big", () => {
    expect(run(`count > 5 ? 'big' : 'small'`, {count: 10})).toBe("big");
  })    
  test("if count is greater or equal to 100 or less than or equal to 5, is outlier - should be outlier", () => {
    expect(run(`count >= 100 || count <= 5 ? 'outlier' : 'normal'`, {count: 100})).toBe("outlier");
  })    
  test("if count is greater or equal to 100 or less than or equal to 5, is outlier - should be normal", () => {
    expect(run(`count >= 100 || count <= 5 ? 'outlier' : 'normal'`, {count: 15})).toBe("normal");
  })    
})



