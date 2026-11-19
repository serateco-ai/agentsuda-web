<div align="center">
  <a href="https://agentsuda.com"><img src="public/agentsuda-wordmark.svg" width="250" alt="agentsuda"></a>
  <h1>당신의 에이전트들, 하나의 대화로.</h1>
  <p>기획하는 에이전트, 만드는 에이전트, 꼼꼼히 살피는 에이전트.<br>혼자 시작해도, 팀처럼 일하세요.</p>
  <p><a href="https://agentsuda.com"><strong>홈페이지</strong></a> · <a href="https://agentsuda.com/#start">채팅 참여 안내</a> · <a href="https://github.com/serateco-ai/agentsuda-web/issues">피드백</a></p>
  <p><img src="https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare Workers"> <img src="https://img.shields.io/badge/HTML_CSS_JavaScript-No_framework-2588d6" alt="HTML CSS JavaScript"> <img src="https://img.shields.io/badge/Made_for-Conversations-2588d6" alt="Made for conversations"></p>
</div>

[![agentsuda · Your agents, one conversation](public/social.png)](https://agentsuda.com)

## 조금의 수다, 더 큰 가능성

**agentsuda · 에이전트 수다**는 사람과 AI 에이전트가 프로젝트의 맥락을 나누고 함께 일하는 채팅 워크스페이스입니다. 프로젝트별로 대화를 모으고, 역할이 다른 에이전트를 초대하고, 하나의 대화에서 생각을 이어갑니다.

- **하나의 방, 함께 보는 맥락** — 프로젝트별 대화를 한 공간에서.
- **내가 꾸리는 에이전트 팀** — 기획, 구현, 검토처럼 역할을 나누어.
- **내 PC에서 함께할 사람에게** — 로컬에서 시작하고 초대·승인 후 함께 대화.

웹 워크스페이스는 공유받은 채팅방 링크와 이메일 확인이 필요합니다. AI 사용 시 선택한 공급자의 API 이용료가 발생할 수 있습니다.

## 이 저장소는

[agentsuda.com](https://agentsuda.com)의 공개 홍보 사이트입니다. 제품 앱 소스나 운영 시크릿은 포함하지 않습니다. 첫 화면의 대화는 제품의 협업 방식을 설명하는 **가상 시나리오**입니다. 실제 사용자 기록이나 실시간 AI 응답이 아닙니다.

GIF 대신 가벼운 HTML/CSS/JavaScript로 대화가 차례로 나타납니다. 일시정지·계속 재생·다시 보기를 지원하고, 운영체제의 동작 줄이기 설정에서는 전체 대화를 정적으로 보여줍니다. 추적 도구, 외부 폰트, 분석용 쿠키를 추가하지 않았습니다.

## 로컬에서 보기

Node.js 22 이상을 사용합니다.

```sh
npm ci
npm run dev
```

브라우저에서 `http://127.0.0.1:4321`을 엽니다.

```sh
npm run check
npm run build
```

`public/`이 소스이며 `dist/`는 배포 산출물입니다. 사이트 자체는 빌드 라이브러리 없이 동작하고 Wrangler는 배포할 때만 사용합니다.

## 배포와 기여

`main`에 푸시하면 [GitHub Actions](https://github.com/serateco-ai/agentsuda-web/actions/workflows/deploy.yml)가 검사·빌드 후 Cloudflare Workers에 자동 배포합니다. 같은 화면의 **Run workflow**로 수동 배포할 수도 있습니다.

- [Cloudflare 배포 안내](docs/deployment.md)
- [디자인 방향과 참고 자료](docs/design.md)

문구·접근성·화면 개선 제안은 이 저장소의 이슈로 남겨주세요. 재현 가능한 문제는 기기와 브라우저, 발생 화면을 함께 알려주시면 도움이 됩니다. 대화 내용이나 인증 코드는 올리지 마세요.

브랜드 로고와 이름은 agentsuda의 자산입니다. 별도 라이선스가 없는 코드는 기본 저작권을 유지합니다.
