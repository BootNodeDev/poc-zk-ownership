fn main(x: [Field; 2], y: [Field; 2], solution: Field) {
    let det = determinant(x, y);
    assert(det == solution);
}

fn determinant(x: [Field; 2], y: [Field; 2]) -> Field {
    x[0] * y[1] - x[1] * y[0]
}

#[test]
fn test_main() {
    main([0,1], [1,0], -1);

    // Uncomment to make test fail
    // main(1, 1);
}

#[test]
fn test_determinant() {
    let result = determinant([1, 2], [3, 4]);

    assert_eq(result, -2);    
}