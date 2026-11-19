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

Cloudflare 대시보드의 Workers 및 Pages → 애플리케이션 생성 → Upload your static files에서 `dist/` 내용을 업로드할 수 있다. Worker 이름은 `agentsuda-web`으로 지정한다. 설정 → 도메인 및 경로에서 `agentsuda.com` 맞춤 도메인을 연결한다.

Wrangler를 사용하는 운영 환경에서는 기존 Cloudflare 인증 후:

```sh
npm run deploy
```

`wrangler.jsonc`는 루트 맞춤 도메인을 선언하며 `workers.dev`와 미리보기 주소를 비활성화한다. 롤백은 해당 Worker의 Deployments에서 이전 배포를 선택한다.

## Infisical

기존 `agentsuda-operator` 프로젝트는 채팅 운영에 필요한 Tunnel·메일·인증 설정을 관리한다. 정적 홍보 사이트에는 런타임 시크릿이나 Tunnel 연결이 필요하지 않다. 기존 비밀값을 복사하거나 공개 사이트에 주입하지 않는다.

향후 CI 배포를 연결할 경우 Cloudflare 배포용 자격정보는 운영자의 비밀 저장소에서 배포 환경에만 제공한다. 앱이나 브라우저 번들에는 포함하지 않는다. GitHub–Cloudflare 자동 연결은 별도 권한 구성이 필요하며, 이 저장소만으로 자동 배포가 설정되지는 않는다.
