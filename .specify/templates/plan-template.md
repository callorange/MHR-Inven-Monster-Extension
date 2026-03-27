# 구현 계획: [FEATURE]

**브랜치**: `[###-feature-name]` | **날짜**: [DATE] | **명세서**: [link]
**입력값**: `/specs/[###-feature-name]/spec.md` 의 기능 명세서

**참고**: 이 템플릿은 `/speckit.plan` 명령어를 통해 채워집니다. 실행 워크플로우에 대해서는 `.specify/templates/plan-template.md`를 참고하세요.

## 요약

[기능 명세서에서 추출: 핵심 요구사항 + 리서치를 통해 얻은 기술적 접근법]

## 기술 컨텍스트

<!--
  조치 필요: 이 섹션의 내용을 프로젝트에 맞는 기술 세부 정보로 교체하세요. 
  여기에 제시된 구조는 반복 프로세스를 안내하기 위한 권장 사항입니다.
-->

**언어/버전**: [예: Python 3.11, Swift 5.9, Rust 1.75 또는 명확화 필요]  
**주요 의존성**: [예: FastAPI, UIKit, LLVM 또는 명확화 필요]  
**저장소**: [해당할 경우, 예: PostgreSQL, CoreData, 파일 또는 해당 없음]  
**테스트**: [예: pytest, XCTest, cargo test 또는 명확화 필요]  
**대상 플랫폼**: [예: Linux 서버, iOS 15+, WASM 또는 명확화 필요]
**프로젝트 유형**: [예: 라이브러리/CLI/웹서비스/모바일앱/컴파일러/데스크톱앱 또는 명확화 필요]  
**성능 목표**: [도메인 특화, 예: 1000 req/s, 10k lines/sec, 60 fps 또는 명확화 필요]  
**제약 사항**: [도메인 특화, 예: <200ms p95, <100MB memory, 오프라인 지원 또는 명확화 필요]  
**규모/범위**: [도메인 특화, 예: 10k users, 1M LOC, 50 screens 또는 명확화 필요]

## 헌법(Constitution) 확인

*게이트: Phase 0 리서치 이전에 반드시 통과해야 합니다. Phase 1 설계 이후 재확인하세요.*

[헌법(Constitution) 파일에 기반하여 결정된 게이트 항목들]

## 프로젝트 구조

### 문서 (현재 기능)

```text
specs/[###-feature]/
├── plan.md              # 이 파일 (/speckit.plan 명령어 출력 결과)
├── research.md          # 0단계(Phase 0) 출력 결과 (/speckit.plan 명령어)
├── data-model.md        # 1단계(Phase 1) 출력 결과 (/speckit.plan 명령어)
├── quickstart.md        # 1단계(Phase 1) 출력 결과 (/speckit.plan 명령어)
├── contracts/           # 1단계(Phase 1) 출력 결과 (/speckit.plan 명령어)
└── tasks.md             # 2단계(Phase 2) 출력 결과 (/speckit.tasks 명령어 - /speckit.plan에서 생성되지 않음)
```

### 소스 코드 (저장소 최상위 루트)
<!--
  조치 필요: 아래의 플레이스홀더 트리를 이 기능에 맞는 구체적인 레이아웃으로 변경하세요. 
  사용하지 않는 옵션은 삭제하고, 선택한 구조에 실제 경로(예: apps/admin, packages/something)를 
  추가하여 작성해야 합니다. 최종 작성된 계획에는 'Option' 라벨이 포함되지 않아야 합니다.
-->

```text
# [미사용 시 삭제] Option 1: 단일 프로젝트 (기본값)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [미사용 시 삭제] Option 2: 웹 애플리케이션 ("frontend" + "backend" 구조 감지 시)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [미사용 시 삭제] Option 3: 모바일 + API ("iOS/Android" 구조 감지 시)
api/
└── [상단의 backend와 동일]

ios/ 또는 android/
└── [플랫폼 전용 구조: 기능 모듈, UI 플로우, 플랫폼 테스트]
```

**구조 결정**: [선택된 구조를 문서화하고 위에 작성된 실제 디렉토리를 참조하세요]

## 복잡성 추적

> **헌법(Constitution) 확인 항목 중, 불가피하게 위반한 사항에 대한 정당화가 필요할 때만 작성하세요**

| 위반 항목 | 필요한 이유 | 더 간단한 대안을 거절한 이유 |
|-----------|------------|-------------------------------------|
| [예: 4번째 프로젝트 추가] | [현재의 필요성] | [3개 프로젝트만으로는 불충분한 이유] |
| [예: 리포지토리 패턴 사용] | [특정 문제 상황] | [직접 DB 접근만으로는 불충분한 이유] |
