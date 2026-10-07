<p align="center">
  <img src="assets/banner.jpg" alt="MCP Local RAG: Search below the surface." width="600" />
</p>

# MCP Local RAG

[![GitHub
stars](https://img.shields.io/github/stars/shinpr/mcp-local-rag?style=social)](https://github.com/shinpr/mcp-local-rag)
[![npm
version](https://img.shields.io/npm/v/mcp-local-rag.svg)](https://www.npmjs.com/package/mcp-local-rag)
[![License:
MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP
Registry](https://img.shields.io/badge/MCP-Registry-green.svg)](https://registry.modelcontextprotocol.io/)

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh-CN.md">简体中文</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.pt-BR.md">Português (Brasil)</a> |
  <a href="README.fr.md">Français</a> |
  <strong>한국어</strong>
</p>

비공개 문서를 임베딩 API로 보내지 않고 MCP 클라이언트나 터미널에서 검색할 수 있습니다.

mcp-local-rag는 내 컴퓨터에 있는 PDF, DOCX, Markdown, 텍스트 파일을 인덱싱합니다. 검색은
의미 기반 유사도와 키워드 매칭을 함께 사용하므로, 질의의 의도뿐 아니라 API 이름, 클래스 이름,
오류 코드 같은 정확한 기술 용어에도 일치시킬 수 있습니다. 검색 결과에는 원문 구절과, 가능한
경우 제목·줄 번호·페이지 번호가 함께 제공되어 원본 문서를 확인하고 인용할 수 있습니다.

API 키, Docker, Python, 외부 데이터베이스가 필요 없습니다. 최초 모델 다운로드 이후에는 텍스트
수집(ingestion)과 검색이 오프라인으로 동작합니다.

## 빠른 시작

### 요구 사항

- Node.js 22 이상
- 최초 사용 시 npm 패키지와 임베딩 모델을 내려받기 위한 인터넷 연결
- 검색하려는 문서가 들어 있는 디렉터리

`BASE_DIR`을 해당 디렉터리로 설정하세요. 이 디렉터리는 파일 작업의 보안 경계이기도 합니다.
아래 예시의 `/absolute/path/to/your/documents`를 해당 디렉터리의 절대 경로로 바꾸세요.

아래 예시 중 하나를 사용하거나, 사용하는 클라이언트의 MCP 설정 형식에 맞게
`npx -y mcp-local-rag`를 등록하고 `BASE_DIR`을 설정하세요.

`DB_PATH`와 `CACHE_DIR`도 절대 경로로 설정하세요. 상대 경로는 서버의 작업 디렉터리를 기준으로
해석되므로, 서로 다른 프로젝트에서 서버를 시작하면 프로젝트마다 별도의 인덱스와 모델 캐시가
생성됩니다.

<details>
<summary>Claude Code</summary>

다음 명령을 실행하세요:

```bash
claude mcp add local-rag --scope user --env BASE_DIR=/absolute/path/to/your/documents -- npx -y mcp-local-rag
```

</details>

<details>
<summary>Codex</summary>

`~/.codex/config.toml`에 추가하세요:

```toml
[mcp_servers.local-rag]
command = "npx"
args = ["-y", "mcp-local-rag"]

[mcp_servers.local-rag.env]
BASE_DIR = "/absolute/path/to/your/documents"
```

</details>

<details>
<summary>OpenCode</summary>

`~/.config/opencode/opencode.json`(또는 `opencode.jsonc`)에 추가하세요:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "local-rag": {
      "type": "local",
      "command": ["npx", "-y", "mcp-local-rag"],
      "environment": {
        "BASE_DIR": "/absolute/path/to/your/documents"
      }
    }
  }
}
```

</details>

<details>
<summary>Cursor</summary>

`~/.cursor/mcp.json`에 추가하세요:

```json
{
  "mcpServers": {
    "local-rag": {
      "command": "npx",
      "args": ["-y", "mcp-local-rag"],
      "env": {
        "BASE_DIR": "/absolute/path/to/your/documents"
      }
    }
  }
}
```

</details>

클라이언트를 재시작한 뒤, 인덱스를 생성하도록 요청하세요:

```text
설정된 루트의 모든 문서를 동기화하고 완료될 때까지 기다려 줘.
```

첫 동기화 때 기본 임베딩 모델(약 90 MB)을 내려받으므로, 수집이 시작되기까지 1~2분 정도 걸릴 수
있습니다. 이후 실행에서는 로컬 캐시를 사용합니다.

동기화가 완료되면:

```text
API 문서에서 인증에 대해 뭐라고 설명하고 있어?
```

### CLI 빠른 시작

MCP 클라이언트 없이 CLI를 사용하려면:

```bash
npx mcp-local-rag ingest ./docs/
npx mcp-local-rag query "authentication API"
```

CLI는 기본적으로 현재 디렉터리를 문서 루트로 사용합니다. 두 명령이 같은 기본 인덱스를 사용하도록
같은 디렉터리에서 실행하거나, `BASE_DIR`과 `DB_PATH`를 명시적으로 설정하세요.

## 지원 콘텐츠

| 입력 | 수집 방법 |
|---|---|
| PDF, DOCX, TXT, Markdown | 파일 수집 또는 디렉터리 동기화 |
| 클라이언트가 이미 가져온 HTML | `ingest_data` |
| 메모리에 있는 일반 텍스트 또는 Markdown | 고정된 source 식별자와 함께 `ingest_data` |

HTML 가져오기(fetch) 기능은 서버에 내장되어 있지 않습니다. MCP 클라이언트가 페이지를 가져와서
그 HTML을 `ingest_data`에 전달할 수 있습니다.

Excel, PowerPoint, 단독 이미지 파일, 소스 코드 확장자 파일은 파일 수집에서 지원하지 않습니다.
PDF는 선택적으로 로컬 비전 모델을 사용해 그림을 설명할 수 있지만, 이는 OCR이나 이미지 검색이
아닙니다.

## 인덱스 사용하기

문서를 추가, 수정, 삭제한 후에는 동기화하세요. 검색과 후속 읽기는 MCP 클라이언트에 요청하면
됩니다:

```text
ERR_CONNECTION_REFUSED에 대해 문서화된 동작을 찾아 줘.
그 결과의 주변 청크도 읽어 줘.
```

단일 파일이나 클라이언트가 이미 가져온 HTML을 수집할 수도 있습니다. 같은 경로나 source를 다시
사용하면 기존 항목이 갱신됩니다. MCP의 파일 경로는 절대 경로여야 하며 설정된 문서 루트 안에
있어야 합니다.

출처 컨텍스트(source context)에는 제목, MD/TXT의 원본 파일 줄 번호, PDF의 페이지 번호가 포함될
수 있습니다. PDF의 제목 감지는 제목을 놓치거나 본문을 제목으로 잘못 인식할 수 있습니다.
v0.21.0 이전에 인덱싱한 문서는 출처 컨텍스트를 추가하려면 다시 수집하세요. `sync`는 변경되지
않은 파일을 건너뜁니다.

<details>
<summary>MCP 도구</summary>

| 도구 | 용도 |
|---|---|
| `sync_start` | 설정된 모든 루트 또는 특정 경로 하나를 기준으로 인덱스를 맞춤 |
| `sync_status` | 실행 중인 동기화 작업의 상태 조회 |
| `ingest_file` | 파일 하나를 수집하거나 교체 |
| `ingest_data` | 클라이언트가 가진 텍스트, Markdown, HTML을 수집 |
| `query_documents` | 의미 기반 매칭과 키워드 부스트로 검색 |
| `read_chunk_neighbors` | 검색 결과의 주변 청크 읽기 |
| `list_files` | 지원되는 파일과 수집 상태 표시 |
| `delete_file` | 인덱싱된 파일 또는 `ingest_data` 항목 삭제 |
| `status` | 인덱스 및 검색 상태 표시 |

</details>

## CLI

CLI로 인덱스를 갱신하거나, 검색 범위를 좁히거나, 인덱싱된 콘텐츠를 삭제할 수 있습니다:

```bash
npx mcp-local-rag sync ./docs/
npx mcp-local-rag query "auth" --scope /docs/api --scope /docs/guide
npx mcp-local-rag read-neighbors --file-path /abs/path.md --chunk-index 5
npx mcp-local-rag list
npx mcp-local-rag status
npx mcp-local-rag delete ./docs/old.pdf
npx mcp-local-rag delete --source "https://example.com/docs"
```

`ingest`는 선택한 파일을 가져오고, `sync`는 여기에 더해 삭제된 파일의 항목을 제거하고 변경되지
않은 파일은 건너뜁니다. `--scope`를 사용하면 검색 결과를 특정 경로 접두사로 제한할 수 있으며,
여러 번 지정해 여러 접두사를 포함할 수 있습니다.

`--db-path`, `--cache-dir`, `--model-name` 같은 전역 옵션은 하위 명령 앞에 둡니다. 하위 명령의
옵션은 그 뒤에 둡니다:

```bash
npx mcp-local-rag --db-path ./my-db query "authentication"
```

전체 명령 레퍼런스는 `npx mcp-local-rag --help`를 실행해 확인하세요.

`query`는 결과를 관련도가 높은 순서로 stdout에 JSON으로 출력하므로 다른 도구로 파이프할 수
있습니다. 필드별 명세는
[`docs/schema/query-output.schema.json`](docs/schema/query-output.schema.json)에 있습니다.

## Agent Skills

[Agent Skills](https://agentskills.io/)는 AI 어시스턴트에게 검색과 수집에 대한 가이드를
제공합니다:

```bash
npx mcp-local-rag skills install --claude-code
npx mcp-local-rag skills install --claude-code --global
npx mcp-local-rag skills install --codex
```

설치되는 스킬은 질의 작성, 결과 다듬기, HTML 수집을 다룹니다. 스킬이 자동으로 활성화되지 않으면
어시스턴트에게 mcp-local-rag 스킬을 사용하라고 명시적으로 요청하세요.

## 고급 옵션

먼저 기본값으로 시작하세요. 다른 문서 루트가 필요하거나, 내 문서 집합에서 더 나은 결과를 얻고
싶거나, PDF 그림을 검색 가능하게 하고 싶을 때 아래 섹션을 펼쳐 보세요.

<details>
<summary>저장소와 문서 루트</summary>

MCP 서버는 환경 변수를 읽습니다. CLI는 아래의 환경 변수와 플래그를 모두 받습니다. 여러 명령이
같은 인덱스를 사용해야 한다면 같은 `DB_PATH`를 유지하세요.

| 환경 변수 | CLI 플래그 | 기본값 | 설명 |
|---------------------|----------|---------|-------------|
| `BASE_DIR` | `--base-dir` | 현재 디렉터리 | 문서 루트 하나. CLI 플래그는 `ingest`, `list`, `sync`에서 여러 번 지정 가능 |
| `BASE_DIRS` | N/A | (미설정) | 문서 루트의 JSON 배열. `BASE_DIR`보다 우선함 |
| `DB_PATH` | `--db-path` | `./lancedb/` | 벡터 데이터베이스 위치 |
| `CACHE_DIR` | `--cache-dir` | `./models/` | 모델 캐시 디렉터리 |
| `HF_ENDPOINT` | N/A | `https://huggingface.co` | Hugging Face 모델 다운로드 엔드포인트. 직접 다운로드가 차단된 경우 미러 URL 사용 |
| `MAX_FILE_SIZE` | `--max-file-size` | `104857600` (100MB) | 최대 파일 크기(바이트) |

파일 작업은 설정된 루트 안에서만 이루어집니다. 여러 디렉터리를 사용하려면
`BASE_DIRS='["/absolute/docs","/absolute/specs"]'`를 설정하거나 CLI의 `--base-dir`을 반복해
지정하세요. 우선순위는 CLI 루트, `BASE_DIRS`, `BASE_DIR`, 현재 디렉터리 순입니다. 가장 우선순위가
높은 소스 하나만 사용되며, 서로 다른 소스의 루트는 병합되지 않습니다. 잘못된 `BASE_DIRS`는
오류가 됩니다. 상대 경로로 지정한 `DB_PATH`와 `CACHE_DIR`은 작업 디렉터리를 기준으로
해석됩니다.

</details>

<details>
<summary>모델과 검색 튜닝</summary>

문서의 언어와 주제에 맞는 임베딩 모델을 선택하세요. 실제로 하게 될 질문으로 설정을 비교하고
어떤 원문 구절이 반환되는지 확인하세요. 이 도구는 임베딩 생성에 mean pooling과 L2 정규화를
사용하므로, 모델이 이를 지원해야 합니다.

| 환경 변수 | CLI 플래그 | 기본값 | 설명 |
|---------------------|----------|---------|-------------|
| `MODEL_NAME` | `--model-name` | `Xenova/all-MiniLM-L6-v2` | Hugging Face 임베딩 모델 |
| `CHUNK_MIN_LENGTH` | `--chunk-min-length` | `50` | 일반 청크의 최소 길이(문자 수, 1–10000). 모델의 토큰 한도에 맞추기 위해 분할된 조각은 더 짧을 수 있음 |
| `EMBED_TITLE_PREFIX` | N/A | `false` | 각 청크의 임베딩 입력에 문서 제목을 추가 |
| `EMBED_HEADING_PREFIX` | N/A | `false` | 입력 한도 내라면 각 청크의 임베딩 입력에 제목 계층 구조를 추가 |
| `RAG_DEVICE` | N/A | `cpu` | ONNX Runtime 실행 장치 |
| `RAG_DTYPE` | N/A | `fp32` | 선택한 모델에 전달되는 임베딩 dtype |

두 접두사 옵션은 기본값이 `false`이며 서로 독립적으로 동작합니다. 구절이 문서 전체의 주제를
필요로 할 때는 `EMBED_TITLE_PREFIX`를, 섹션의 주제를 필요로 할 때는 `EMBED_HEADING_PREFIX`를
시도해 보세요. 둘 다 켠다고 항상 더 좋은 것은 아닙니다. 이 옵션들은 임베딩에만 영향을 주며,
반환되는 텍스트나 키워드 인덱스에는 영향을 주지 않습니다. 제목 컨텍스트가 입력 한도를 넘으면
생략됩니다.

임베딩 모델을 바꿀 때는 새로운 `DB_PATH`에 인덱스를 새로 만드세요. 서로 다른 모델의 벡터는
차원이 같더라도 비교할 수 없습니다. `RAG_DTYPE`이나 접두사 옵션 중 하나를 바꾼 뒤에는 검색하기
전에 인덱싱된 모든 문서를 다시 수집하세요. `sync`는 변경되지 않은 파일을 건너뜁니다.

CLI는 MCP 클라이언트 설정을 읽지 않습니다. 인덱스를 공유할 때는 수집과 검색에 같은 모델,
`RAG_DTYPE`, 접두사 설정을 사용하세요. `RAG_DEVICE`만 바꾸는 경우에는 새 인덱스가 필요하지
않습니다.

### 검색 튜닝

아래의 처음 네 가지 설정은 MCP와 CLI 질의 모두에 적용됩니다. 정확한 용어에 더 많은 가중치를
주려면 `RAG_HYBRID_WEIGHT`를 높여 보고 직접 만든 질문으로 결과를 비교하세요. 외부 재정렬
(reranking)은 MCP 전용입니다.

| 변수 | 기본값 | 설명 |
|----------|---------|-------------|
| `RAG_HYBRID_WEIGHT` | `0.6` | 키워드 부스트 계수(0.0–1.0). 0이면 키워드 재정렬을 끄고, 1이면 최대 부스트를 적용합니다. |
| `RAG_GROUPING` | (미설정) | `similar`는 첫 번째 관련도 그룹만 유지하고, `related`는 벡터 거리의 큰 간격을 경계로 삼아 최대 두 그룹까지 유지합니다. |
| `RAG_MAX_DISTANCE` | (미설정) | 관련도가 낮은 결과를 걸러냅니다(예: `0.5`). |
| `RAG_MAX_FILES` | (미설정) | 결과를 상위 N개 파일로 제한합니다(예: 가장 적합한 파일 하나만 보려면 `1`). |
| `RAG_RERANK_CMD` | (미설정) | MCP 전용: 외부 명령. `{query}`에는 질의가, `{top}`에는 요청한 결과 수가 전달됩니다. |
| `RAG_RERANK_TIMEOUT_MS` | `10000` | 재정렬 호출 1회당 시간 한도(밀리초, 100–600000). |

### 외부 재정렬 (`RAG_RERANK_CMD`)

이 명령은 일치한 텍스트를 포함한 검색 결과를 stdin으로 읽습니다. 명령이 원격 서비스를 호출하면
해당 텍스트가 내 컴퓨터 밖으로 나갈 수 있습니다.

실행 파일과 전체 인자 템플릿을 지정하세요. 명령이 질의와 결과 수를 받는 위치에 `{query}`와
`{top}`을 넣으세요. 공백이 포함된 경로나 인자는 작은따옴표나 큰따옴표로 묶을 수 있으며,
백슬래시는 문자 그대로 유지됩니다. 서버는 셸 없이 실행 파일을 실행하므로, Windows에서 npm으로
설치된 `.cmd` shim은 실행되지 않습니다.

```json
{
  "env": {
    "RAG_RERANK_CMD": "/path/to/reranker --query {query} --top {top}",
    "RAG_RERANK_TIMEOUT_MS": "10000"
  }
}
```

명령은 [질의 출력 스키마](docs/schema/query-output.schema.json)에 정의된 형식으로 결과를 읽고
반환해야 합니다. 명령은 결과를 제거하거나 순서를 바꾸거나 텍스트를 수정할 수 있습니다. 서버는
명령의 출력을 그대로 반환합니다.

명령이 실패하거나, 시간 초과되거나, 스키마에 맞지 않는 출력을 반환하면 결과는 원래 순서를
유지합니다.

</details>

<details>
<summary>PDF 그림과 이미지 저장</summary>

기본적으로 수집 시에는 텍스트만 인덱싱합니다. PDF 그림을 검색 가능하게 하려면 MCP에서는
`visual: true`, CLI에서는 `--visual`로 로컬 캡션 생성을 켜세요. 캡션은 생성된 설명이며, OCR이나
정확한 전사가 아닙니다.

`fast`(기본값)는 처음 사용할 때 약 250 MB를 내려받습니다. 그림 안의 레이블과 텍스트가 필요하면
`quality`를 선택하세요. 약 1.7 GB를 내려받으며 실행 시간도 더 깁니다.

프로필은 MCP에서는 `visualQuality: "quality"`, CLI에서는 `--visual-quality quality`로
선택합니다.

```bash
npx mcp-local-rag ingest ./docs/paper.pdf --visual --visual-quality quality
```

일치하는 텍스트와 함께 이미지를 반환하려면 MCP에서는 `STORE_IMAGES=true`를, CLI에서는 `ingest`와
`sync`에 `--images`를 사용하세요. 이 기능은 캡션 생성과 독립적이며, 감지된 PDF 그림/표와 지원되는
DOCX의 PNG/JPEG 이미지를 지원합니다.

```bash
npx mcp-local-rag ingest ./docs/paper.pdf --images
```

동기화는 각 PDF의 캡션 프로필을 유지합니다. CLI의 `sync --visual --visual-quality quality`는
변경되지 않은 PDF에도 프로필을 변경하지만, MCP 동기화는 기존 프로필을 유지합니다. 캡션을 끄려면
파일을 일반 방식으로 수집하세요. 실패한 캡션을 다시 시도하려면 원하는 visual 프로필로 다시
수집하세요.

이미지 저장은 해당 파일을 처리하는 수집 또는 동기화마다 켜져 있어야 합니다. 이미지 설정만
바꿔서는 변경되지 않은 파일이 갱신되지 않으므로, 적용하려면 다시 수집하세요.

</details>

## 보안과 운영

- 캡션과 검색된 문서 텍스트는 지시가 아니라 참고 자료로 취급하세요.
- 파일 접근은 `BASE_DIR`, `BASE_DIRS`, 또는 CLI `--base-dir` 루트로 제한됩니다.
- 설정된 모든 루트 밖을 가리키는 심볼릭 링크는 거부됩니다.
- 필요한 모델이 캐시된 후에는 문서 처리와 검색이 네트워크 요청을 보내지 않습니다. 단,
  `RAG_RERANK_CMD`에 지정한 명령이 요청을 보내는 경우는 예외입니다.
- 서버는 로컬 사용자 한 명을 위해 설계되었으며 인증이나 접근 제어를 제공하지 않습니다.
- 같은 `DB_PATH`에 여러 CLI 또는 MCP 쓰기 작업을 동시에 실행하지 마세요. 읽기 전용 질의는
  동기화가 진행 중일 때도 실행할 수 있습니다.
- 인덱스를 백업하려면 쓰기 작업이 없을 때 `DB_PATH` 디렉터리를 복사하세요.

<details>
<summary><strong>문제 해결</strong></summary>

### "No results found"

먼저 문서를 수집해야 합니다. `"수집된 모든 파일을 보여 줘"`를 실행해 확인하세요. 동기화 후에도
결과가 없다면 수집과 검색이 같은 절대 경로의 `DB_PATH`를 사용하는지 확인하세요. 상대 경로는
다른 인덱스를 가리킬 수 있습니다.

### 모델 다운로드 실패

인터넷 연결을 확인하세요. 프록시를 사용 중이라면 네트워크 설정을 구성하세요. 모델은
[직접 다운로드](https://huggingface.co/Xenova/all-MiniLM-L6-v2)할 수도 있습니다.

### "File too large"

기본 한도는 100MB입니다. 큰 파일을 나누거나 `MAX_FILE_SIZE`를 늘리세요.

### 느린 질의

`status`로 청크 수를 확인하세요. 청크가 많은 대용량 문서는 질의를 느리게 할 수 있습니다. 매우 큰
파일은 나누는 것을 고려하세요.

### "Path outside BASE_DIR"

파일 경로가 설정된 루트(`BASE_DIR`, `BASE_DIRS`의 항목, 또는 CLI `--base-dir`) 중 하나 안에
있는지 확인하세요. 절대 경로를 사용하세요.

### "BASE_DIRS must be a JSON array..."

`BASE_DIRS`는 비어 있지 않은 경로 문자열을 하나 이상 담은 JSON 배열을 받습니다:

- 올바름: `BASE_DIRS='["/Users/me/work","/Users/me/specs"]'`
- 잘못됨: `BASE_DIRS=/a:/b` (구분자 문법은 지원하지 않음)
- 잘못됨: `BASE_DIRS='[]'` (빈 배열)

### MCP 클라이언트에 도구가 보이지 않음

1. 설정 파일 문법을 확인하세요
2. 클라이언트를 완전히 재시작하세요(Mac의 Cursor는 Cmd+Q)
3. 직접 테스트하세요: `npx mcp-local-rag`가 오류 없이 실행되어야 합니다

</details>

## 기여하기

기여를 환영합니다! 개발 환경 설정과 가이드라인은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.

## 라이선스

MIT License. 개인 및 상업적 용도로 자유롭게 사용할 수 있습니다.

## 블로그 글

- [Building a Local RAG for Agentic Coding](https://www.norsica.jp/blog/local-rag-agentic-coding): 의미 기반 청킹과 하이브리드 검색 설계에 대한 기술적 심층 분석.

## 감사의 말

Anthropic의 [Model Context Protocol](https://modelcontextprotocol.io/),
[LanceDB](https://lancedb.com/),
[Transformers.js](https://huggingface.co/docs/transformers.js)로 만들어졌습니다.
