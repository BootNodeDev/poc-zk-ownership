fn main(x: Field, y: pub Field) {
    assert(x != y);
}

fn determinant(a: [Field; 2], b: [Field; 2]) -> Field {
    a[0] * b[1] - a[1] * b[0]
}

#[test]
fn test_main() {
    main(1, 2);

    // Uncomment to make test fail
    // main(1, 1);
}

#[test]
fn test_determinant() {
    let result = determinant([1, 2], [3, 4]);

    assert_eq(result, -2);    
}