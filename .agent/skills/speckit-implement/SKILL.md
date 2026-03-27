---
name: speckit-implement
description: tasks.md에 정의된 모든 태스크를 처리하고 실행하여 구현 계획(Implementation Plan)을 완수합니다. 태스크 생성 완료 후 이를 순차적으로 처리하여 TDD 등 예정된 방향으로 구현물을 만들어냅니다.
compatibility: .specify/ 디렉토리가 있는 spec-kit 프로젝트 구조 필요
metadata:
  author: github-spec-kit
  source: templates/commands/implement.md
---

# Speckit Implement 요소(Skill)

## 사용자 입력 (User Input)

```text
$ARGUMENTS
```

진행하기 전에 사용자 입력값이 있다면 **반드시** 이를 고려해야 합니다.

## 사전 실행 확인 (Pre-Execution Checks)

**확장 훅(Extension Hooks) 확인 (구현 단계 이전)**:
- 프로젝트 루트에 `.specify/extensions.yml` 파일이 존재하는지 확인합니다.
- 존재한다면 파일을 읽어 `hooks.before_implement` 키 아래의 항목들을 찾습니다.
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

1. 저장소 루트에서 `.specify/scripts/powershell/check-prerequisites.ps1 -Json -RequireTasks -IncludeTasks` 명령어를 한 번 실행하고 JSON 출력 결과를 파싱하여 `FEATURE_DIR` 경로와 `AVAILABLE_DOCS` 뷰를 확보합니다. 모든 경로는 반드시 절대 경로(absolute path)여야 합니다. "I'm Groot"와 같이 작은따옴표가 포함된 문자열을 인수로 넘길 땐 이스케이프 구문(e.g., 'I'\''m Groot') 또는 가능하면 큰따옴표(e.g., "I'm Groot")를 사용하세요.

2. **체크리스트 상태 확인** (`FEATURE_DIR/checklists/` 가 존재하는 경우):
   - `checklists/` 디렉토리 하위의 모든 체크리스트 파일을 스캔합니다.
   - 각 체크리스트마다 다음을 집계합니다:
     - 전체 문항 수: `- [ ]`, `- [X]`, `- [x]` 형태에 일치하는 모든 줄
     - 완료된 문항 수: `- [X]`, `- [x]` 형태에 일치하는 줄
     - 미완료 문항 수: `- [ ]` 형태에 일치하는 줄
   - 상태 테이블을 생성하여 화면에 띄웁니다:

     ```text
     | 체크리스트명 | 전체 | 완료 | 미완 | 상태 |
     |-----------|-------|-----------|------------|--------|
     | ux.md     | 12    | 12        | 0          | ✓ 통과 |
     | test.md   | 8     | 5         | 3          | ✗ 실패 |
     | security.md | 6   | 6         | 0          | ✓ 통과 |
     ```

   - 전체 통과 여부 결론 도출:
     - **통과 (PASS)**: 모든 체크리스트의 미완료 문항이 0개일 때
     - **실패 (FAIL)**: 하나 혹은 그 이상의 체크리스트 문항이 미완료 상태로 남아 있을 때

   - **하나라도 미완료 체크리스트가 발견된 경우**:
     - 미완료 카운트가 표기된 테이블을 화면에 노출합니다.
     - **중지(STOP)** 한 뒤 다음과 같이 묻습니다: "일부 체크리스트가 아직 미해결(미완료) 상태입니다. 무시하고 구현(implementation)을 끝까지 진행하시겠습니까? (yes/no)"
     - 다음 단계로 넘어가지 말고 사용자 입력을 기다리십시오.
     - 사용자가 "no", "wait", "stop"이라 명시하면 즉시 실행을 중단합니다.
     - 사용자가 "yes", "proceed", "continue"라 명시하면 3단계로 계속 넘어갑니다.

   - **모든 체크리스트가 완료된 경우**:
     - 모두 통과되었음을 안내하는 표를 출력시켜줍니다.
     - 사용자 대기 없이 자동으로 3단계 넘어갑니다.

3. 구현 컨텍스트 로드 및 분석:
   - **필수 (REQUIRED)**: 전체 태스크 목록 및 실행 전략이 명시된 `tasks.md` 문서를 읽습니다.
   - **필수 (REQUIRED)**: 기술 스택, 아키텍처, 그리고 작업 파일 디렉토리 정보가 있는 `plan.md` 문서를 읽습니다.
   - **존재할 시 (IF EXISTS)**: 엔티티 및 연결망 정보를 얻기 위해 `data-model.md` 문서를 읽습니다.
   - **존재할 시 (IF EXISTS)**: API 스펙 및 테스트 요건 파악을 위해 `contracts/` 디렉토리 문서를 읽습니다.
   - **존재할 시 (IF EXISTS)**: 기술적 의사 결정 사항 및 제약 조건을 살피기 위해 `research.md` 문서를 읽습니다.
   - **존재할 시 (IF EXISTS)**: 통합 관련 연동 시나리오 확인 차 `quickstart.md` 문서를 읽습니다.

4. **프로젝트 셋업 및 Ignore 환경 검증 (Project Setup Verification)**:
   - **필수 (REQUIRED)**: 현재 프로젝트 스펙에 걸맞은 `.ignore` 관련 파일들이 존재하는지 확인하고 필요시 생성합니다:

   **규칙 탐지 및 생성 로직**:
   - 디렉토리가 git 저장소인지 확인(`git rev-parse --git-dir 2>/dev/null` 성공 여부) → 맞다면 `.gitignore` 파일 점검 및 생성.
   - `Dockerfile*` 파일이 있거나 `plan.md` 스펙상 Docker가 쓰인다면 → `.dockerignore` 파일 점검 및 생성.
   - `.eslintrc*` 류의 파일이 발견된다면 → `.eslintignore` 점검 및 생성.
   - `eslint.config.*` 류의 파일이 발견된다면 → 설정 파일 내부의 `ignores` 항목에 적절한 패턴이 추가되어 있는지 확인.
   - `.prettierrc*` 류의 파일이 발견된다면 → `.prettierignore` 점검 및 생성.
   - `.npmrc` 나 `package.json` 이 묶여 있다면 → 배포를 상정한 경우 `.npmignore` 점검 및 생성.
   - terraform 관련 인프라 파일(`*.tf`) 발견 시 → `.terraformignore` 점검 및 생성.
   - helm 차트(helm charts) 파일 발견 시 → `.helmignore` 점검 및 생성.

   **만약 Ignore 파일이 이미 존재할 경우**: 필수 제외 패턴들이 누락 없이 잘 포함되어 있는지 점검하고 필요한 누락 항목만 덧붙입니다(Append).
   **만약 Ignore 파일이 애초에 없을 경우**: 탐지된 기술 종류에 맞춘 풀-세트 표준 Ignore 모음집을 주입해 파일을 아예 통생성합니다.

   **기술별 대표적인 공통 Ignore 패턴** (`plan.md` 내의 기술 스택 정보 참고):
   - **Node.js/JavaScript/TypeScript**: `node_modules/`, `dist/`, `build/`, `*.log`, `.env*`
   - **Python**: `__pycache__/`, `*.pyc`, `.venv/`, `venv/`, `dist/`, `*.egg-info/`
   - **Java**: `target/`, `*.class`, `*.jar`, `.gradle/`, `build/`
   - **C#/.NET**: `bin/`, `obj/`, `*.user`, `*.suo`, `packages/`
   - **Go**: `*.exe`, `*.test`, `vendor/`, `*.out`
   - **Ruby**: `.bundle/`, `log/`, `tmp/`, `*.gem`, `vendor/bundle/`
   - **PHP**: `vendor/`, `*.log`, `*.cache`, `*.env`
   - **Rust**: `target/`, `debug/`, `release/`, `*.rs.bk`, `*.rlib`, `*.prof*`, `.idea/`, `*.log`, `.env*`
   - **Kotlin**: `build/`, `out/`, `.gradle/`, `.idea/`, `*.class`, `*.jar`, `*.iml`, `*.log`, `.env*`
   - **C++**: `build/`, `bin/`, `obj/`, `out/`, `*.o`, `*.so`, `*.a`, `*.exe`, `*.dll`, `.idea/`, `*.log`, `.env*`
   - **C**: `build/`, `bin/`, `obj/`, `out/`, `*.o`, `*.a`, `*.so`, `*.exe`, `*.dll`, `autom4te.cache/`, `config.status`, `config.log`, `.idea/`, `*.log`, `.env*`
   - **Swift**: `.build/`, `DerivedData/`, `*.swiftpm/`, `Packages/`
   - **R**: `.Rproj.user/`, `.Rhistory`, `.RData`, `.Ruserdata`, `*.Rproj`, `packrat/`, `renv/`
   - **공용(Universal)**: `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `.vscode/`, `.idea/`

   **도구 종속적 Ignore 패턴**:
   - **Docker**: `node_modules/`, `.git/`, `Dockerfile*`, `.dockerignore`, `*.log*`, `.env*`, `coverage/`
   - **ESLint**: `node_modules/`, `dist/`, `build/`, `coverage/`, `*.min.js`
   - **Prettier**: `node_modules/`, `dist/`, `build/`, `coverage/`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`
   - **Terraform**: `.terraform/`, `*.tfstate*`, `*.tfvars`, `.terraform.lock.hcl`
   - **Kubernetes/k8s**: `*.secret.yaml`, `secrets/`, `.kube/`, `kubeconfig*`, `*.key`, `*.crt`

5. `tasks.md` 구조를 파싱하여 다음의 요소들을 뽑아냅니다:
   - **태스크 진행 단계 (Task phases)**: Setup (초기 셋업), Tests (테스트 작성), Core (핵심 로직), Integration (통합), Polish (마무리) 등
   - **태스크 종속성 (Task dependencies)**: 순차적으로 실행되어야 할 규칙과 병렬 실행 규칙 분리
   - **태스크 세부 정보 (Task details)**: 각 줄의 ID, 설명, 목표 파일 경로, 병렬 가능 여부 마커 [P] 추출
   - **실행 흐름 (Execution flow)**: 명시된 의존성 구조와 순서 요구에 맞춘 정렬

6. 태스크 계획 모음에 따라 개발 구현(Implementation)을 단계적으로 실행하십시오:
   - **페이즈별 단계 진행 (Phase-by-phase execution)**: 하나의 페이즈 장이 완전히 완료되기 전까진 결코 다음 단계 페이즈로 넘어가지 마십시오.
   - **의존성 준수 (Respect dependencies)**: 순차적인 태스크는 반드시 차례대로 수행하며, 묶여 있는 [P] 번 병렬 태스크들끼리만 한꺼번에 병렬 수정 처리할 수 있습니다.
   - **TDD(테스트 주도 개발) 방식 접근 (Follow TDD approach)**: 테스트 코드를 짤 수 있는 여건이라면 무조건 코어 구현 파일보다 테스트 구현 태스크 파일부터 먼저 실행 수정합니다.
   - **동일 파일 수정 제어 (File-based coordination)**: 다른 태스크일지라도 같은 파일을 타겟으로 수정한다면 병렬 처리하지 않고 차례대로 처리되어야 합니다.
   - **단계별 체크포인트 점검 (Validation checkpoints)**: 각 페이즈가 일단락될 때마다 요구 구동이 완수되었는지 검증하십시오.

7. 구현 실행(Implementation execution) 기본 원칙:
   - **설정이 먼저다 (Setup first)**: 가장 먼저 프로젝트 기본 구조, 모듈 의존성, 컨피그레이션 세팅부터 초기화하십시오.
   - **테스트가 먼저다 (Tests before code)**: 엔티티 및 통합 시나리오 등에 필요한 컨트랙트(명세) 테스트 코드가 예정되어 있다면 이를 우선 처리하십시오.
   - **코어 개발 (Core development)**: 데이터 모델 설계 구조, 내부 서비스 계층 모듈, CLI 커맨드, API 엔드포인트 등을 구현하십시오.
   - **통합 연동 (Integration work)**: 앞서 구현된 코어단에 데이터베이스를 물리거나 미들웨어 연동, 로깅 세팅, 외부 서비스 통신 연결 기능 등을 덧붙입니다.
   - **다듬기 및 검증 (Polish and validation)**: 유닛 테스트 강화 반영, 병목 성능 최적화 코드 리팩토링 및 문서 업데이트로 마감합니다.

8. 진행 단계 트래킹 및 오류 핸들링 (Progress tracking and error handling):
   - 하나의 단위 태스크가 끝날 때마다 진행 상태를 요약 보고합니다.
   - 만약 병렬 처리 [P] 태스크가 아닌 단독/순차적 태스크가 개발 중 빌드 및 작동에 오류를 일으켰다면 전체 진행을 강제 일시 정지(Halt) 시킵니다.
   - 병렬 처리 [P] 태스크들 진행 중 에러 발생 시, 문제없는 다른 성공 항목 태스크 실행분들은 살려두되 오류 난 태스크 항목만 실패 처리로 취급하고 넘기십시오.
   - 중단 시, 사람이 오류를 찾아낼 수 있도록 디버깅용 컨텍스트가 풍부한 명확한 에러 메시지를 제공하십시오.
   - 더 이상 자의적 구현 진행이 불가능한 막다른 곳에 처하면 어떻게 해야 할지 제안을 남기십시오.
   - **중요! (IMPORTANT)**: 성공적으로 마친 항목이 있다면 잊지 말고 `tasks.md` 원본 파일에 들어가 해당 문항의 체크박스를 `[X]` 체크 완료 상태로 업데이트 저장 처리해 기록을 치워주십시오.

9. 구현 완료 유효성 증명 (Completion validation):
   - 명세된 모든 태스크 항목의 체크 박스가 비어있지 않고 끝났는지 최종 확인합니다.
   - 구현된 내용물이 오리지널 원본 스펙 명세 문서에 지향된 성과와 일치하는 지 확인.
   - 작성된 테스트 케이스 코드가 정상 Pass 통과하며 커버리지가 요구사항을 충족했는지 검증.
   - 구현체들의 결과 파일들이 `plan.md`에서 정립한 아키텍처 및 기술안 전략을 이탈하지 않았는지 살피기.
   - 완성된 직업물을 요약하여 최종 결과 상태(final status)를 보고하기.

참고: 위 모든 실행 명세는 당신에게 주어진 `tasks.md` 파일이 이미 잘 쪼개져 분할되어 있음을 전제합니다. 만일 태스크 항목 리스트가 내용이 부실하거나 누락이 많다면 먼저 `/speckit.tasks` 단계를 통해 태스크 분할을 제대로 뽑아오길 먼저 제안하십시오.

10. **확장 훅(Extension Hooks) 확인 (완료 이후)**: 완료 검증 후, 시스템 루트에 `.specify/extensions.yml` 설정이 있는지 살핍니다.
    - 존재한다면 파일을 읽어 `hooks.after_implement` 키 아래의 항목들을 찾습니다.
    - YAML 파싱이 실패하거나 유효하지 않은 경우, 훅 확인 과정을 조용히 건너뛰고 정상 진행합니다.
    - `enabled`가 명시적으로 `false`인 훅은 제외합니다. 명시되지 않았다면 활성화된 것으로 간주합니다.
    - 남은 훅들에 대해 `condition` 표현식의 자체 직접 평가를 피하십시오. 그건 HookExecutor가 다루게 놔두고 즉시 실행 가능 상태로 패스시킵니다.
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
    - 등록된 훅이 없거나 `.specify/extensions.yml` 파일이 자체가 원래 없었으면 조용히 무시하고 마무리 짓습니다.
