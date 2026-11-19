# Cloudflare Workers 배포

홍보 사이트는 `agentsuda-web` Worker, 기존 채팅은 별도의 `agentsuda-guest-room-2026` Worker다.

| 주소 | 역할 |
| --- | --- |
| `https://agentsuda.com` | 홍보 사이트 |
| `https://chat.agentsuda.com` | 기존 채팅 워크스페이스 |

루트 도메인과 서브도메인은 동시에 사용할 수 있다. 홍보 Worker에는 루트 도메인만 연결한다. 채팅의 DNS, Tunnel, D1, Durable Objects, 인증 설정은 이 프로젝트에서 관리하지 않는다.

## 빌드와 배포

```sh
npm ci
npm run check
npm run build
```

GitHub Actions의 **Deploy agentsuda.com**이 `main` 푸시 시 위 검증과 빌드를 실행하고 `wrangler deploy`로 기존 `agentsuda-web` Worker를 업데이트한다. 수동 실행은 GitHub → Actions → Deploy agentsuda.com → Run workflow에서 `main`을 선택한다. 파일 재업로드는 필요하지 않다. 동시 배포는 순서대로 실행하며 PR이나 다른 브랜치에서는 운영 배포를 실행하지 않는다.

워크플로는 `.github/workflows/deploy.yml`에 있다. 공식 checkout/setup-node 액션을 커밋으로 고정하고, GitHub 토큰은 소스 읽기만 허용한다. Cloudflare 관리 토큰은 배포 단계에만 제공한다. 배포 후 실제 도메인의 HTML·CSS·JS 응답을 검사한다. 화면 동작은 별도 브라우저 검증 대상이다.

저장소 설정:

| 종류 | 이름 | 용도 |
| --- | --- | --- |
| Actions secret | `CLOUDFLARE_API_TOKEN` | 승인된 제한 Cloudflare 사용자 토큰 |
| Actions variable | `CLOUDFLARE_ACCOUNT_ID` | 배포 대상 계정 식별자 |

Cloudflare 기본 Git 빌드 연동은 연결하지 않는다. 기본 빌드 토큰의 불필요한 스토리지 권한을 피하고 별도로 승인된 제한 토큰을 GitHub Actions에서 사용한다.

Wrangler를 사용하는 운영 환경에서는 기존 Cloudflare 인증 후:

```sh
npm run deploy
```

`wrangler.jsonc`는 루트 맞춤 도메인을 선언하며 `workers.dev`와 미리보기 주소를 비활성화한다. 롤백은 해당 Worker의 Deployments에서 이전 배포를 선택한다.

## Infisical

기존 `agentsuda-operator` 프로젝트는 채팅 운영에 필요한 Tunnel·메일·인증 설정을 관리한다. 정적 홍보 사이트에는 런타임 시크릿이나 Tunnel 연결이 필요하지 않다. 기존 비밀값을 복사하거나 공개 사이트에 주입하지 않는다.

배포 토큰 `agentsuda-web-builds`는 `agentsuda-operator` 프로젝트의 **Production → `/agentsuda-web` → `CLOUDFLARE_API_TOKEN`**에 보관한다. GitHub Actions secret에는 같은 토큰을 암호화해 저장한다. Infisical과 GitHub 간 자동 동기화는 구성하지 않았으므로 토큰 교체 시 두 저장소를 함께 갱신해야 한다.

만료일은 **2027-11-19**다. 승인된 권한은 현재 계정의 Workers Scripts 편집·Account Settings 읽기와 `agentsuda.com` 영역의 Workers Routes 편집·Zone 읽기다. Workers Scripts 권한은 계정 내 다른 Worker에도 적용된다. KV·R2·D1·메일·Tunnel 권한은 없다. 토큰 값을 소스·로그·브라우저 번들에 포함하지 않는다.
