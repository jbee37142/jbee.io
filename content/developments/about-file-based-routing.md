---
title: 'File based routing에 대한 생각'
date: 2025-06-11 19:01:12
description: '이번 글에서는 이 방식의 트레이드 오프를 생각해보고 마찬가지로 많이 사용하는 코드 기반 라우팅과 비교해본다. 그리고 제 3의 옵션은 없는지, 어떤 것이 더 LLM Friendly 할지 생각해본다.'
category: developments
thumbnail: './images/about-file-based-routing.jpg'
permalink: about-file-based-routing
draft: false
---

![about-file-based-routing](./images/about-file-based-routing.jpg)

파일 기반 라우팅(File based routing)은 파일 시스템을 이용해서 애플리케이션의 라우트를 설정하는 방식을 의미한다. Next.js에서도 차용하는 방식이고 장점이 많은 방식이다. 이번 글에서는 이 방식의 트레이드 오프를 생각해보고 마찬가지로 많이 사용하는 코드 기반 라우팅과 비교해본다. 그리고 제 3의 옵션은 없는지, 어떤 것이 더 'LLM Friendly' 할지 생각해본다.

## What is good router framework (or library)?
좋은 라우팅 라이브러리는 무엇을 제공해야하나? 라우팅에 필요한 모든 기능을 넘어 어떤 경험을 제공하느냐, 그리고 어떤 확장성을 제공하느냐 문제이다.

### Type-Safety
라우트를 Type-Safe 하게 관리할 수 있는 것은 축복이다. 코드로 제어 가능한 모든 요소에 정적인 타입이 있다는 것은 꽤 의미있다. LLM을 통해 코드를 생성할 때도 타입이 중요한 역할을 한다. 컴파일 단계에서 에러를 미리 인지할 수 있기 때문이다. 이 타입 안정성 부분은 Tanstack이 잘하는 부분이다. Path parameter, Search Parameters 까지 자동 완성되는 경험은 짜릿하다.

![](./images/about-file-based-routing-1.jpeg)

### Programmatic Control
애플리케이션을 개발하다 보면 특정 라우트에 Programmatic한 제어가 필요하다. 인증은 물론이고 Private 라우트라던가 특정 환경에서만 노출시키고 싶은 라우트가 생길 수 있는데, 이런 여러 조건들을 대응할 수 있는 hook이 있어야 한다. 미들웨어나 중앙에서 관리되는 config에서라도 처리가 가능해야 한다.

## Benefits
### Explicit structure
파일 시스템이 URL의 위계 관계를 그대로 반영하기 때문에 명시적으로 관리할 수 있다. 라우팅 구조를 시각적으로 이해하는데 도움을 주기도 하는데 사실 이 부분은 코드로 보는 것과 크게 다르지 않다. 라우트 정의를 한 파일 내에서 진행하게 되면 파일의 크기가 커지게 되는데 그러다보면 읽기 어려울 수 있겠다.
### Code-Splitting
이미 파일 기반으로 라우트를 나눠 정의하기 때문에 코드를 특정 Chunk 단위로 분할하기 좋다. 코드 분할을 위해 별다른 처리를 하지 않아도 되는 것이다. (lazy, dynamic import 등) 의존 관계를 명확히 계산할 수 있고 페이지마다 필요한 코드만 가져올 수 있다.
#### Consistency
아무래도 강제성이 존재하기 때문에 라우트 정의에 일관성이 생긴다. 사용하는 라우팅 라이브러리의 컨벤션을 따라야만 하기 때문에 다수의 개발자가 함께 작업하는 경우에도 코드의 일관성을 지킬 수 있다. 이 부분은 코드 기반도 비슷하다고 생각한다.
### DX
무엇보다 편하다. 파일을 생성하고 그 파일 안에서 어떤 라우트인지 잘 노출(export)하기만 하면 라우트가 만들어진다. 설정 파일에 가서 import 하고 정의하고 연결하고 번거로운 보일러 플레이트 코드를 작성하지 않아도 된다.

## Limitations
### Non-standard convention
라우트를 정의하기 위해 특정 프레임워크의 컨벤션을 따라야만 한다.이 컨벤션은 표준이라고 부를 수 있을 만한 것이 없기 때문에 라이브러리, 프레임워크마다 다르다. 특정 무언가에 의존하는 것은 항상 트레이드 오프가 따른다.
### Colocation
폴더 구조는 프로젝트를 파악하는데 있어서 중요한 요소 중 하나이다. 함께 사용하는 코드는 함께 존재해야 관리가 편하다. 같은 라우트에서 사용하는 코드들을 가까운 곳에 위치시키고 싶지만 라이브러리의 컨벤션에 맞추다 보면 그러기 쉽지 않은 경우가 발생한다. 
### Maintainability
앱이 커지다보면 라우트 구조라던가 경로가 수정되는 경우도 많다. 이 경우 파일 이름을 수정해야 하는 경우와 정의한 라우트 파일만 수정하면 되는 경우가 생기는데, 후자가 변경이 적으며 redirection을 보다 명시적으로 처리할 수 있게 된다. 비슷한 이유로 앱이 커지면서 추가되는 여러 기능들이 파일 시스템에 종속되다보니 기능과 파일 구조가 강결합되어 아쉬운 점이 생긴다.
### Performance
파일로 정의된 모든 라우트는 우선 빌드되기 때문에 최적화하는 과정에서 아쉬운 점이 존재할 수 있다. 코드로 라우트를 설정한다면 Production 빌드에선 빌드하지 않아도 되는 경우가 있다면 제외할 수 있지만 파일 기반에선 이런 부분을 감수해야 한다.

## 제 3의 옵션
### Config based Routing
JSON, YAML 파일은 어떤가? 표현력의 한계가 존재한다. 양쪽의 단점만 취하는 것과 같다. 물론 Framework-agonstic 하다는 장점이 존재한다. 하지만 특정 프레임워크에 의존하여 얻는 장점 모두를 버리는 것과 같기 때문에 득보다 실이 많은 옵션이라고 판단한다. 경로가 정말 빈번히 변경되거나 구성하는 언어가 다른 여러 시스템, 플랫폼에서 공유해야 하는 경우에 사용할 수 있을 것 같고 또는 비개발자도 라우팅을 편집해야 하는 경우(예: CMS에서 메뉴 편집) 등에 제한적으로 유용할 것이다.
### Hybrid
파일 기반의 라우팅도 사용하고 코드 기반의 라우팅도 함께 사용하는 방식이다. 그 기준이 명확하다면 시도해볼만 하지만 대부분 그렇지 않다. 의사결정 요소가 들어가면 개발 프로세스를 늦추게 된다. The fewer decisions we have to make, the faster we can develop.

## LLM Friendly
무엇이 더 LLM Friendly 한가? 이제 코드 구성이나 기술 스택 결정과 같은 기술적인 의사결정을 할 때, Machine 입장에서의 고려가 필수적이다. 얼마나 LLM Friendly 한지에 따라 생산성이 달라지기 때문이다. 지난 몇몇 글에서도 LLM-Friendly라는 표현을 썼는데, '대형 언어 모델이 코드를 읽고·수정하고 생성하기 쉬운 구조'라는 뜻에서 사용했다.

물어봤다. 너는 어떤 코드를 이해하기 쉽고 수정하기 쉽니?

- **명시성** – 경로·메타데이터가 코드나 데이터로 드러나 있는가?
- **단일 진실원(SSoT)** – 경로 정의가 한 곳(또는 일관된 형식)에 모여 있는가?
- **머신 가독성** – JSON·TS 객체처럼 구조화돼 있어 파싱·변환하기 쉬운가?
- **변경 범위 예측성** – 새 페이지 추가/수정 시 LLM이 어떤 파일만 건드리면 되는지 명확한가?
- **설계 일관성** – 관례나 코드 스타일이 엄격해 LLM이 “패턴 학습”하기 쉬운가?

사실 인간이 그동안 좋은 코드라고 이야기 했던 것과 크게 다르지 않다. 생각 외로 학습할 데이터의 양에 대해선 언급이 없었다. (당사자는 본인의 탄생 배경을 모르는 것일지도)

참조할 코드가 있어야 한다. 그리고 참조할 메타데이터, 대표적인 메타데이터로 타입이다. Type-safe한 것을 선호하는 것은 인간이나 기계나 같다. 최근 Coding Agent들은 bash 명령어로 파일 시스템도 잘 분석한다. 라우트 구조를 파악하기 위한 프롬프트가 필요할 수 있겠다.

딱히 유의미한 비교는 하기 어려웠다. React router, Tanstack Router 둘 중 무엇이 더 이해하기 쉽고 수정하기 쉽냐고 직접적으로 물어보면 Tanstack router라고 대답하긴 한다. 선언적인 구조, 타입 정보 풍부, 트리 기반의 구조가 그 이유였다.

## Conclusion
아무래도 파일 기반 라우팅이 편하고 좋긴 하다. 아쉬운 점도 있는데 Tanstack Router가 이를 잘 보완하고 있다고 생각한다. 아직까진 (+당연하게도) React router의 점유율이 압도적으로 높다. 최근 Open source Governance model로 전환했는데, Tanstack router가 잘하고 있는 부분을 잘 흡수하길 바란다.

### References
- https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing#what-is-file-based-routing
- https://www.youtubeasdf.com/watch?v=HR3Ufnr4HOc&ab_channel=G2i
- https://www.reddit.com/r/reactjs/comments/1jmemz3/why_is_routing_so_complicated_now
