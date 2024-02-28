---
title: '달satisfies keyword in TypeScript 4.9'
date: 2023-7-17 16:21:13
category: 'typescript'
---

👋 TypeScript **4.9** is coming.

# Why

어떤 문제를 해결하는지는 syntax가 탄생한 배경을 통해 살펴보자.

## Situation 1.

```jsx
// 여기 palette라는 tuple이 있습니다. 레코드라고 부르죠.
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255]
};

// red는 `number[]` 이어야 한다.
const redValue = palette.red.join(',');

// green은 `string` 이어야 한다.
const greenValue = palette.green.toUpperCase();

// blue도 `number[]` 이어야 한다.
const blueValue = palette.bleu.join(',');
```

혹시 위 코드의 문제를 눈치채셨나요?

`bleu` 라는 오타가 있습니다…! ㅜㅜ
- `key` 로 올 수 있는 것이 정해져있다.
- 어떤 제약이 필요하다.
- 타입 정의?!

(당연한 접근) palette에 타입이 필요하겠군.

```tsx
type Color = "red" | "green" | "blue";

const palette: Record<Color, string | number[]> = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255], // Gooooood!!
};
```

이렇게 오타를 잡을 수 있지! 만…

```tsx

const redValue = palette.red.join(",");
// ❌ Error: red is `number[] | string`

const greenValue = palette.green.toUpperCase();
// ❌ Error: green is `number[] | string`

```

`value` 에 대한 type infer가 어려워진다… 😭

### 두둥

```tsx
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Record<Color, string | number[]>;

const redValue = palette.red.join(",");
// ✅ red is `number[]`

const greenValue = palette.green.toUpperCase();
// ✅ green is `string`
```

### One more thing ☝️

```tsx
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Record<Color, unknown>; // 🌝 we don't need to specific type

const redValue = palette.red.join(","); // `red` is number[]
const greenValue = palette.green.toUpperCase(); // `green` is string
```

with `as const`

```tsx
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} as const satisfies Record<Color, unknown>; // 🌝 we don't need to specific type

const redValue = palette.red.join(","); // `red` is [255, 0, 0]
const greenValue = palette.green.toUpperCase(); // `green` is "#00ff00"
```

개꿀.

## Situation 2.

```tsx
type Animal = {
  kind: 'dog' | 'cat';
  food: 'fish' | 'meat' | 'chur';
  age: number;
}
const puppy = { kind: 'dog', food: 'meat', age: 2 };

function calculateAge(animal: Animal) {
  return animal.age;
}

calculateAge(puppy);
// ❌ `puppy`는 `Animal` 타입과 맞지 않습니다.
// { kind: string; food: string; age: number }
```

`as` …?

```tsx
calculateAge(puppy as Animal);
```

대표적인 안티패턴.

puppy가 변해도 알 수가 없다.

**`as const`…?**

```tsx
type Animal = {
  kind: 'dog' | 'cat';
  food: 'fish' | 'meat' | 'chur';
  age: number;
}
const puppy = {
	kind: 'dog' as const,
	food: 'meat' as const,
	age: 2,
};

function calculateAge(animal: Animal) {
  return animal.age;
}

calculateAge(puppy);
```

되긴 되는데… 귀찮네…

**타입 정의…?**

```tsx
type Animal = {
  kind: 'dog' | 'cat';
  food: 'fish' | 'meat' | 'chur';
  age: number;
}
const puppy: Animal = {
	kind: 'dog',
	food: 'meat',
	age: 2,
};

function calculateAge(animal: Animal) {
  return animal.age;
}

calculateAge(puppy);
```

되긴 되는데…

```tsx
puppy.kind // 'dog' | 'cat'
// not 'dog'
```

narrow… more narrow…

### 두둥

```tsx
type Animal = {
  kind: 'dog' | 'cat';
  food: 'fish' | 'meat' | 'chur';
  age: number;
}
const puppy = { kind: 'dog', food: 'meat', age: 2 } satisfies Animal;

function calculateAge(animal: Animal) {
  return animal.age;
}

calculateAge(puppy);
typeof puppy.kind // 'dog'
```

캬

## 정리

`satisfies` 라는 새로운 문법이 생겼는데,
1. ****Property Name Constraining, Fulfillment****
    객체의 key값을 제한할 때, 전부 존재하는지 파악할 때 사용한다.
2. **Infer property value type**
    객체의 value값을 infer하여 타입으로 지정할 때, 사용한다.
3. **Safe upcast**
    타입을 안전하게 upcast 시켜줄 때, 사용한다.

### TMI
- `implements` 가 될 뻔함.

### References
- [직접 해보기](https://www.typescriptlang.org/play?ts=5.0.0-dev.20221116#code/C4TwDgpgBAwg9gGzgJygXigImRAJpqAHywHMcIA7A4zAIwQFcJMBuAKDYGM4KBnYKGACGCCMGDQMAbzZQoOXAC4oAbQBMAVg0AaKAAZdegLrbZUMhErLMARjUBmTKbn0mylQf27NGk2wC+ULxCwACWvABmoRC8UABKENzIuAA88EjIugwUANYUcADuFAB87GwA9OXyeIApTVAABhQMALa0EMgqRvVQgC7jgC2jgD6jUIA6q4AnTQB0XDz81bgAaiJM6IIiYhLjCuMAVnChFAAUTpgAlGWV5uQUgALjDfzIeyTd-UNjk9x8AhaUC4ySK6LiCDjL4UcbAOAAVTAkGQMCEvAg+1OHHOrgggBHmhpNVrtTpPQYjCZTD5QNE-JYYYQA9Zo7a7A5HZEVKoAWjZnAYwDZLI4oEgUAAghRQs0RMsZHIcnslFAAOS4OAkWVEOWcEKy9hyCJwOAy2VRXgAC2VxFlzQg6pVss4hoYyA1ZiEJAgymxbWQ7H8xJmYAY0JA4qgUooeoVSt02t1yjNFuAst0TpdUDUUECwTCkWisSFIpEZV9-vGwdwbAi2U4YR4UDVCA5CBCEAFzv2QmFooQyhz7eOUAl1WAdooUFbuYQ40Tno4NbrDabiILYBApyAA)
- 이 예약어에 대한 논의가 이뤄진 이슈보러가기
    [https://github.com/microsoft/TypeScript/issues/47920](https://github.com/microsoft/TypeScript/issues/47920)
- 추가된 다른 기능들도 보러 4.9 소개 공식문서 가기
    [Announcing TypeScript 4.9](https://devblogs.microsoft.com/typescript/announcing-typescript-4-9/)