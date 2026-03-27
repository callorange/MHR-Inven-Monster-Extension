---
name: speckit-plan
description: 기능 명세서(spec)로부터 기술적 구현 계획안(plan)을 생성합니다. 스펙 작성 후 아키텍처, 기술 스택, 그리고 구현 단계를 명확히 규정하기 위해 사용합니다. 상세한 기술적 설계가 담긴 plan.md를 만들어냅니다.
compatibility: .specify/ 디렉토리가 있는 spec-kit 프로젝트 구조 필요
metadata:
  author: github-spec-kit
  source: templates/commands/plan.md
---

# Speckit Plan 요소(Skill)

## 사용자 입력 (User Input)

```text
$ARGUMENTS
```

진행하기 전에 사용자 입력값이 있다면 **반드시** 이를 고려해야 합니다.

## 사전 실행 확인 (Pre-Execution Checks)

**확장 훅(Extension Hooks) 확인 (계획 단계 이전)**:
- 프로젝트 루트에 `.specify/extensions.yml` 파일이 존재하는지 확인합니다.
- 존재한다면 파일을 읽어 `hooks.before_plan` 키 아래의 항목들을 찾습니다.
- YAML 파싱이 실패하거나 유효하지 않은 경우, 훅 확인 과정을 조용히 건너뛰고 정상적으로 계속 진행합니다.
- `enabled`가 명시적으로 `false`인 훅은 제외합니다. `enabled` 필드가 없는 훅은 기본적으로 활성화된 것으로 간주합니다.
- 남은 훅들에 대해 `condition` 표현식을 직접 해석하거나 평가하려고 시도하지 **마십시오**:
  - 훅에 `condition` 필드가 없거나 비어 있는 경우, 해당 훅을 실행 가능한 것으로 간주합니다.
  - 훅에 내용이 있는 `condition`이 정의된 경우, 해당 훅을 건너뛰고 조건 평가는 HookExecutor 구현체에 맡깁니다.
- 실행 가능한 각 훅에 대해 `optional` 플래그에 따라 다음 중 하나를 출력합니다:
  - **선택적 훅** (`optional: true`):
    ```
    ## 확장 훅 (Extension Hooks)

    **선택적 사전 훅(Optional Pre-Hook)**: {extension}
    명령어: `/{command}`
    설명: {description}

    프롬프트: {prompt}
    실행하려면: `/{command}`
    ```
  - **필수 훅** (`optional: false`):
    ```
    ## 확장 훅 (Extension Hooks)

    **자동 사전 훅(Automatic Pre-Hook)**: {extension}
    실행 중: `/{command}`
    EXECUTE_COMMAND: {command}

    Outline 단계로 넘어가기 전에 이 훅 명령어의 수행 결과를 기다리십시오.
    ```
- 등록된 훅이 없거나 `.specify/extensions.yml`이 존재하지 않으면 조용히 건너뜁니다.

## 개요 (Outline)

1. **설정(Setup)**: 저장소 루트에서 `.specify/scripts/powershell/setup-plan.ps1 -Json` 명령어를 실행하고 JSON 결과를 파싱하여 FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH 정보를 얻습니다. "I'm Groot"와 같이 문자열 내 작은따옴표가 포함된 경우 이스케이프 구문(e.g., 'I'\''m Groot')을 사용하거나 가능하면 큰따옴표(e.g., "I'm Groot")를 사용합니다.

2. **컨텍스트 로드(Load context)**: FEATURE_SPEC 문서와 `.specify/memory/constitution.md` 헌법 문서를 읽습니다. 복사된 IMPL_PLAN 템플릿을 읽어 들입니다.

3. **기획 워크플로우 실행(Execute plan workflow)**: IMPL_PLAN 템플릿의 구조에 따라 다음을 수행합니다:
   - 기술 컨텍스트(Technical Context) 작성 (확실치 않은 부분은 "명확화 필요(NEEDS CLARIFICATION)"로 표기)
   - 헌법(constitution)을 참조하여 헌법 확인(Constitution Check) 섹션 작성
   - 게이트 평가 (정당한 사유가 없는 위반 사항 발견 시 중단 및 ERROR 반환)
   - 0단계(Phase 0): `research.md` 생성 (모든 NEEDS CLARIFICATION 해결)
   - 1단계(Phase 1): `data-model.md`, `contracts/`, `quickstart.md` 생성
   - 1단계(Phase 1): 에이전트 스크립트를 실행하여 에이전트 컨텍스트 업데이트
   - 설계 이후 헌법 확인 섹션 내용 재평가 진행

4. **종료 및 보고(Stop and report)**: 명령어는 2단계 기획이 끝난 후 완료됩니다. 사용 중인 브랜치, IMPL_PLAN 경로, 그리고 생성된 주요 산출물들을 보고합니다.

5. **확장 훅(Extension Hooks) 확인 (완료 이후)**: 보고 후, 프로젝트 루트에 `.specify/extensions.yml` 파일이 있는지 확인합니다.
   - 존재한다면 파일을 읽어 `hooks.after_plan` 키 아래의 항목들을 찾습니다.
   - YAML 파싱이 실패하거나 유효하지 않은 경우, 훅 확인 과정을 건너뛰고 정상 진행합니다.
   - `enabled`가 명시적으로 `false`인 훅은 제외합니다. 필드가 없으면 활성화된 것으로 간주합니다.
   - 남은 훅에 대해 `condition` 표현식을 직접 평가하지 **마십시오**:
     - `condition` 필드가 비어있으면 실행 가능.
     - `condition` 필드가 정의되어 있으면 건너뜀.
   - 실행 가능한 각 훅에 대해 `optional` 에 따라 다음을 출력합니다:
     - **선택적 훅** (`optional: true`):
       ```
       ## 확장 훅 (Extension Hooks)

       **선택적 훅(Optional Hook)**: {extension}
       명령어: `/{command}`
       설명: {description}

       프롬프트: {prompt}
       실행하려면: `/{command}`
       ```
     - **필수 훅** (`optional: false`):
       ```
       ## 확장 훅 (Extension Hooks)

       **자동 훅(Automatic Hook)**: {extension}
       실행 중: `/{command}`
       EXECUTE_COMMAND: {command}
       ```
   - 등록된 훅이 없거나 파일이 없으면 조용히 종료합니다.

## 개발 단계 (Phases)

### Phase 0: 개요 및 연구 (Outline & Research)

1. **상단의 기술 컨텍스트에서 알 수 없는 항목 추출**:
   - `NEEDS CLARIFICATION` 또는 `명확화 필요` 항목 당 → 리서치(연구) 작업 생성
   - 각 주요 의존성 항목 당 → 베스트 프랙티스 조사 작업 생성
   - 각 연동/통합 항목 당 → 아키텍처 패턴 조사 작업 생성

2. **연구 에이전트 작업 생성 및 지시**:

   ```text
   기술 컨텍스트 내의 각 불분명 항목에 대하여:
     Task: "{feature context} 에서 사용될 {unknown} 에 대해 연구하기"
   각 기술 스택 선택에 대하여:
     Task: "{domain} 영역에서 {tech} 의 가장 좋은 모범 사례(best practices) 찾기"
   ```

3. **연구 결과 통합 (`research.md` 생성)**:
   - 결정된 사항: [사용하기로 결정한 기술/방향성]
   - 결정 근거: [왜 그것을 선택했는지]
   - 고려된 대한: [어떤 대안들을 검토했는지]

**결과물**: 모든 `NEEDS CLARIFICATION(명확화 필요)` 가 해결된 `research.md`.

### Phase 1: 설계 및 컨트랙트 (Design & Contracts)

**선행 조건(Prerequisites):** `research.md` 완성

1. **기능 명세에서 엔티티 추출** → `data-model.md` 생성:
   - 엔티티 이름, 내부 필드, 엔티티 간의 관계
   - 요구 사항에 명시된 유효성 검사 규칙
   - 상태(state) 변경 흐름(해당하는 경우)

2. **인터페이스 컨트랙트 정의** (프로젝트에 외부로 노출되는 인터페이스가 있는 경우) → `/contracts/` 생성:
   - 현재 프로젝트가 사용자나 다른 시스템에 개방하는 인터페이스 식별
   - 개발 중인 프로젝트 유형에 알맞는 형식으로 인터페이스 계약 요건 작성
   - 예시: 라이브러리의 공용 API, CLI 도구의 커맨드 명령어 인자 및 규칙, 웹 서비스의 API 엔드포인트 URL, 파서 동작, 앱의 UI 뷰 등
   - 내부용 프로젝트인 경우 건너뛰기 가능 (예: 일회성 빌드 스크립트 등)

3. **에이전트 컨텍스트 업데이트**:
   - `.specify/scripts/powershell/update-agent-context.ps1 -AgentType agy` 명령어 실행
   - 이 스크립트들이 개발 중인 AI 요원을 파악하여 정보를 제공
   - 환경에 맞는 특정 에이전트 컨텍스트 문서 내용을 갱신
   - 현재 계획된 기술 스택에 관한 정보만 업데이트
   - 주석 구간 등의 기존 수동 기입 내용 보존 유지

**결과물**: `data-model.md`, `/contracts/*`, `quickstart.md`, 특정 에이전트 문서

## 주요 규칙 (Key rules)

- 무조건 절대 경로(Absolute paths)만 사용하십시오.
- 규정(Gate) 위반 사항이나 미해결 '명확화 필요' 항목 존재 시 즉시 ERROR를 중단 메시지로 출력하십시오.
