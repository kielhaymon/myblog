---
title: "Code Heavy Post"
date: "2026-03-19"
summary: "A post with multiple code blocks in different languages."
tags: ["code"]
---

# Code Heavy Post

## TypeScript

```typescript
interface User {
  name: string
  email: string
}

function greet(user: User): string {
  return `Hello, ${user.name}!`
}
```

## Python

```python
def fibonacci(n: int) -> list[int]:
    if n <= 0:
        return []
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[-1] + fib[-2])
    return fib[:n]
```

## Rust

```rust
fn main() {
    let numbers: Vec<i32> = (1..=10).collect();
    let sum: i32 = numbers.iter().sum();
    println!("Sum: {}", sum);
}
```
