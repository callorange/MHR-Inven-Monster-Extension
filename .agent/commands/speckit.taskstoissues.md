---
description: tasks.md에 기재된 일련의 태스크 항목들을 GitHub 리포지토리 설정과 연결하여 실제 GitHub Issue로 생성 전환합니다.
tools: ['github/github-mcp-server/issue_write']
---

## 사용자 입력 (User Input)

```text
$ARGUMENTS
```

진행하기 전에 사용자 입력값이 있다면 **반드시** 이를 고려해야 합니다.

## 개요 (Outline)

1. 저장소 루트에서 `.specify/scripts/powershell/check-prerequisites.ps1 -Json -RequireTasks -IncludeTasks` 명령어를 실행하고 `FEATURE_DIR` 정보와 `AVAILABLE_DOCS` 스캔 목록을 파싱해 가져옵니다. 이때 사용되는 모든 폴더와 파일 경로는 반드시 단일 절대 경로(absolute path)를 사용합니다. "I'm Groot"와 같이 문자열에 작은따옴표가 포함된 경우 이스케이프 구문(e.g., 'I'\''m Groot') 또는 가능하면 큰따옴표(e.g., "I'm Groot")를 사용하세요.
1. 실행된 스크립트의 리턴 결과에서 **tasks(.md)** 파일의 절대 경로를 온전히 추출해 냅니다.
1. 터미널 명령어를 통해 현재 프로젝트의 Git 원격(Remote) 연결 상태를 확인합니다:

```bash
git config --get remote.origin.url
```

> [!CAUTION]
> 반드시 터미널에서 반환된 원격(Remote) 주소가 정상적인 GITHUB URL일 경우에만 다음 단계로 진행하십시오.

1. tasks 파일의 목록에 있는 각 태스크에 대해, GitHub MCP 서버 확장 툴을 시용하여 해당 Git 원격 리포지토리를 대표할 새로운 GitHub Issue를 하나씩 개별적으로 생성 처리합니다.

> [!CAUTION]
> 그 어떠한 일이 있어도 현재의 Remote URL 저장소 구조 정보와 일치하지 않는 엉뚱한 리포지토리에 임의로 Issue를 생성하는 일은 절대 없어야 합니다.
