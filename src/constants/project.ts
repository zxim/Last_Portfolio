import BlogThumbImg from '@public/images/projects/blog_2.png';
import BlogImg1 from '@public/images/projects/blog_1.png';
import BlogImg2 from '@public/images/projects/blog_3.png';
import BlogImg3 from '@public/images/projects/blog_4.png';
import RestoryThumbImg from '@public/images/thumbnails/restory.png';
import RestoryImg1 from '@public/images/projects/restory_1.png';
import RestoryImg2 from '@public/images/projects/restory_2.png';
import RestoryImg3 from '@public/images/projects/restory_3.png';
import PortfolioThumbImg from '@public/images/thumbnails/portfolio.png';
import PortfolioImg1 from '@public/images/projects/portfolio_1.png';
import PortfolioImg2 from '@public/images/projects/portfolio_2.png';
import PortfolioImg3 from '@public/images/projects/portfolio_3.png';
import AichatThumbImg from '@public/images/projects/chat_1.png';
import AichatImg1 from '@public/images/projects/chat_2.png';
import AichatImg2 from '@public/images/projects/chat_3.png';
import AichatImg3 from '@public/images/projects/chat_4.png';
import MongoDBThumbImg from '@public/images/thumbnails/mongodbmanager.png';
import MongoDBImg1 from '@public/images/projects/db_2.png';
import MongoDBImg2 from '@public/images/projects/db_3.png';
import MongoDBImg3 from '@public/images/projects/db_1.png';
import WhatIsPillThumbImg from '@public/images/thumbnails/whatispill.png';
import WhatIsPillImg1 from '@public/images/projects/wip_1.png';
import WhatIsPillImg2 from '@public/images/projects/wip_2.png';
import WhatIsPillImg3 from '@public/images/projects/wip_3.png';
import BlogAdminThumbImg from '@public/images/thumbnails/blogadmin.png';
import BlogAdminImg1 from '@public/images/projects/blogadmin_1.png';
import BlogAdminImg2 from '@public/images/projects/blogadmin_2.png';
import BlogAdminImg3 from '@public/images/projects/blogadmin_3.png';
import N8nThumbImg from '@public/images/thumbnails/n8n_flow.png';
import N8nImg1 from '@public/images/projects/n8n1.png';
import N8nImg2 from '@public/images/projects/n8n2.png';
import N8nImg3 from '@public/images/projects/n8n3.png';
import N8nImg4 from '@public/images/projects/n8n4.png';
import { StaticImageData } from 'next/image';
import PacketIMG from '@public/images/thumbnails/packet.png';

export interface IProjectProps {
  thumb: StaticImageData[];
  term: string;
  termDiff?: string;
  name: string;
  url?: string;
  github?: string;
  team?: string;
  contribution: { dev?: string, infra?: string, security?: string };
  stacks: string[];
  issues?: { issue: string, solving: string }[];
  reason: string;
  learned: string;
  intro: string,
  func?: string[],
}

export const projectData: IProjectProps[] = [
  // 0. n8n 기반 자동화 구축
  {
    thumb: [N8nThumbImg, N8nImg1, N8nImg2, N8nImg3, N8nImg4],
    term: '2026.02 ~ 2026.03',
    termDiff: '1개월',
    name: '구글 드라이브 자산 통제 및 중앙 관리 플랫폼',
    url: '',
    github: '',
    team: '회사 프로젝트',
    contribution: { dev: '100%', infra: '100%', security: '100%' },
    stacks: ['Google Cloud Platform', 'MySQL', 'n8n', 'JavaScript'],
    issues: [
      {
        issue: '사용자가 파일 소유권 이전을 거부할 경우, 외부 유출(다운로드 등) 통제 및 실시간 모니터링 불가',
        solving: '소유권 미이전 시 해당 파일 내용을 강제로 초기화하는 대응 로직을 구현하여 자산 보호 강제성 확보'
      },
      {
        issue: '구글 파일과 MS 파일 구조 차이로 인해 파일 내용 수정 API 요청 시 빈번한 에러 발생',
        solving: '자체 파일 업로드 프록시 서버를 구축하여 MS 파일을 표준화된 방식으로 수신 후, 자동화 엔진을 통해 구글 드라이브로 안정적 업로드 구현'
      },
      {
        issue: '개인별 참여 중인 수많은 파일과 권한 범위를 한눈에 파악하기 힘들어 퇴사 혹은 육아 휴직 시 권한 회수 누수 발생',
        solving: 'MySQL 기반 보안 그룹 및 화이트리스트를 도입하여, 파일별 접근 권한을 DB화하고 비인가 권한을 실시간으로 자동 탐지·삭제 처리'
      },
      {
        issue: '기능 확장으로 인해 n8n 워크플로우가 15개 이상으로 늘어나며 전체 흐름 파악 및 관리 복잡도 증가',
        solving: '각 기능을 모듈화하고 이를 통합 제어하는 마스터 워크플로우 체계를 구축하여 운영 효율성 및 인수인계 편의성 극대화'
      }
    ],
    reason: "구글 기본 관리 기능의 한계를 넘기 위해 API 직접 제어 방식을 택했으며, n8n으로 복잡한 보안 로직을 시각화하여 유지보수 효율을 극대화했습니다. 여기에 MySQL을 정책 저장소로 연동해 실시간 파일 상태 기록과 화이트리스트 대조를 자동화함으로써, 상용 솔루션 없이도 저비용·고효율의 맞춤형 보안 엔진을 구현했습니다.",
    learned: '보안은 단순히 통제하는 것이 아니라, 사용자가 인지하지 못하는 사이 시스템이 자동으로 보호하는 것이 핵심임을 배웠습니다',
    intro: '개인 중심의 구글 드라이브 환경을 기업 환경에 맞게 강제 제어하고 중앙 집중화하는 보안 자동화 프로젝트입니다. 임직원의 부주의나 고의에 의한 데이터 유출(다운로드, 복사, 인쇄 등)을 원천 차단하고, 파일 소유권을 회사로 즉시 환수하여 기업 자산의 안전성을 확보하는 시스템을 구축했습니다.',
    func: [
      'n8n 기반의 보안 자동화 엔진 설계 및 전사 자산 통제 워크플로우 구축',
      '최소 권한 원칙 적용을 통한 외부 유출 경로(복사/인쇄/다운로드) 원천 차단',
      'MySQL 연동을 통한 동적 화이트리스트 검증 및 비인가 협업자 자동 숙청 로직 구현',
      '사용자 행위 기반 이상 징후 실시간 모니터링 및 위협 가시성 확보',
      'n8n과 자체 서버를 활용한 자동화 시스템 구축으로 추가 라이선스 비용 제로화'
    ],
  },

  // 1. 현대오토에버 최종 프로젝트 (침해사고 분석 및 대응)
  {
    thumb: [PortfolioThumbImg, PortfolioImg1, PortfolioImg2, PortfolioImg3],
    term: '2025.02 ~ 2025.02',
    termDiff: '1개월',
    name: '협력사 기반 침해사고 분석 및 보안 대응',
    url: 'https://www.youtube.com/watch?v=NJ-pOw_ZST0',
    github: 'https://github.com/zxim/AutoEver_Project', 
    team: '4명 (인프라 설계 및 보안 솔루션 구축 및 운영)',
    contribution: { dev: '50%', infra: '50%', security: '40%' },
    stacks: ['Apache', 'AWS', 'ELK (SIEM)', 'Git', 'Kafka', 'Kali Linux', 'MySQL', 'PHP', 'Suricata (IPS)', 'Ubuntu', 'Wireshark'],
    issues: [
      {
        issue: '기본 라우팅 설정으로 인해 트래픽이 Suricata(IPS)를 거치지 않고 직접 전달되어 탐지가 우회되는 문제 발생.',
        solving: '퍼블릭/프라이빗 라우팅 테이블을 세분화하고, NAT/IGW가 반드시 Suricata 서브넷을 경유하도록 AWS 인프라 구조를 재설계하여 해결.'
      },
      {
        issue: '공격 시연 리허설 중 대량의 로그가 일시에 유입되어 ELK 서버의 CPU/Memory가 고갈되고 프로세스가 비정상 종료되는 장애 발생.',
        solving: 'AWS 스냅샷으로 신속히 서비스를 복구한 후, 로그 유실 방지 및 부하 분산을 위해 **Kafka(메시지 큐)**를 Logstash 앞단에 도입하여 트래픽을 버퍼링하고 처리 속도를 안정화함.'
      },
      {
        issue: 'CVE-2019-0211(Apache 권한 상승) 재현을 위한 특정 버전 수동 컴파일 및 설정 정보가 부족하여 환경 구축에 난항을 겪음.',
        solving: '해외 PoC 및 기술 문서를 심층 분석하여 필수 의존성과 설정값을 파악하고, 이를 AWS 환경에 맞게 적용하여 취약점 환경을 성공적으로 구축 및 공격을 시연함.'
      },
      {
        issue: '협력사 공격 후 로그에서 어느 구간(망)에서 탐지되었는지 식별이 어려움.',
        solving: 'Suricata 로그에 구간별 태그를 삽입하고 Logstash 필터링 방식을 개선하여 로그 식별성을 확보함.'
      },
    ],
    reason: "`AWS`는 실제 기업 환경과 가장 유사한 클라우드 보안 인프라를 구현하기 위해 선택했습니다. `Suricata`는 고성능 오픈소스 IDS/IPS로 네트워크 위협 탐지에 탁월하여 도입했으며, 방대한 보안 로그를 중앙에서 통합 분석하고 시각화하기 위해 `ELK Stack`을 연동했습니다.",
    learned: '협력사부터 본사까지 이어지는 3계층 네트워크 보안망을 직접 설계하며 망 분리의 중요성을 체감했습니다. 실제 공격 시나리오(WannaCry, 웹해킹 등)를 수행하고 이를 방어하는 과정에서 공격자(Red Team)와 방어자(Blue Team)의 관점을 모두 경험하며, 단순한 솔루션 도입을 넘어선 "구조적 보안 설계"의 필요성을 깊이 배웠습니다.',
    intro: '현대오토에버 모빌리티 SW 스쿨 최종 프로젝트로, AWS 기반의 보안 인프라를 직접 설계·구축하고 실전형 침투 시나리오를 통해 보안 탐지 체계를 검증했습니다. 협력사→본사(개발/보안/일반)로 이어지는 계층형 네트워크에 Suricata와 SIEM을 연동하여 실시간 위협 탐지 환경을 구현했습니다.',
    func: [
      'AWS 기반 3계층 보안 네트워크(VPC, Subnet) 설계',
      'Suricata 기반 침입 탐지 시스템(IDS/IPS) 구축',
      'ELK Stack 연동 통합 보안 관제(SIEM)',
      '실전 공격 시나리오(웹해킹, 랜섬웨어) 실행 및 분석',
      '보안 룰(Rule) 커스터마이징 및 최적화'
    ],
  },

  // 2. 취약한 웹 페이지 개발 및 모의해킹
  {
    thumb: [AichatThumbImg, AichatImg1, AichatImg2, AichatImg3],
    term: '2024.12 ~ 2025.01',
    termDiff: '2개월',
    name: '취약한 웹 페이지 개발 및 시큐어 코딩',
    url: '',
    github: 'https://github.com/zxim/Vulnerable-Web',
    team: '4명 (풀스택 개발 및 시큐어 코딩)',
    contribution: { dev: '70%', infra: '70%', security: '40%' },
    stacks: ['Apache', 'AWS', 'Burp Suite', 'Git', 'JavaScript', 'Kali Linux', 'MySQL', 'PHP'],
    issues: [
      {
        issue: '사용자 입력값이 쿼리에 그대로 들어가 SQL Injection 발생 (인증 우회 가능).',
        solving: 'DB 연결 방식을 Prepared Statement로 교체하고, 입력값 검증 로직을 추가하여 쿼리 조작을 원천 차단함.'
      },
      {
        issue: '게시판 등 입력 필드에 악성 스크립트 삽입이 가능한 XSS 취약점 존재.',
        solving: 'HTML 이스케이프 처리를 적용하고, 출력 시 데이터를 정제(Sanitization)하여 스크립트 실행을 방지함.'
      },
      {
        issue: '인증된 사용자의 권한을 도용하는 CSRF 공격 취약점 발견.',
        solving: '랜덤한 CSRF 토큰을 발급하고, 요청 시 서버에서 토큰 일치 여부를 검증하는 로직을 추가하여 방어함.'
      }
    ],
    reason: "웹 취약점의 원리를 가장 직관적으로 이해하기 위해 `LAMP(Linux, Apache, MySQL, PHP)` 스택을 사용하여 밑바닥부터 개발했습니다. 프레임워크의 보호 없이 날것의 코드에서 발생하는 취약점을 직접 확인하고 `OWASP Top 10` 기준의 시큐어 코딩을 적용해보기 위함입니다.",
    learned: '공격자가 웹 애플리케이션의 로직을 어떻게 악용하는지 직접 공격 코드를 작성해보며 취약점의 본질을 파악했습니다. 단순히 기능을 막는 것이 아니라, 개발 단계에서부터 보안을 고려하는 "Secure by Design"과 입력값 검증의 중요성을 확실하게 익혔습니다.',
    intro: 'LAMP 스택 기반으로 일부러 취약하게 설계된 웹사이트를 구축한 뒤, OWASP Top 10 및 KISA 가이드를 참고하여 직접 해킹하고 방어하는 프로젝트입니다. SQL Injection, XSS 등 주요 웹 취약점을 직접 구현하고 시큐어 코딩으로 조치하며 방어 역량을 키웠습니다.',
    func: [
      '취약한 웹 게시판 및 로그인 기능 구현',
      '주요 웹 해킹 공격 실습 (SQLi, XSS, CSRF, SSRF)',
      '시큐어 코딩(Secure Coding) 적용 및 검증',
      '화이트리스트 기반 필터링 구현',
      '공격/방어 로그 분석 및 대응 보고서 작성'
    ],
  },

  // 3. Terraform 활용 AWS 인프라 자동화
  {
    thumb: [BlogThumbImg, BlogImg1, BlogImg2, BlogImg3],
    term: '2024.11 ~ 2024.11',
    termDiff: '1개월',
    name: 'Terraform 활용 AWS 인프라 구축 자동화',
    url: '',
    github: 'https://github.com/zxim/IT_Security_3Team',
    team: '4명 (인프라 설계 및 테라폼 모듈 작성)',
    contribution: { dev: '60%', infra: '60%', security: '50%' },
    stacks: ['AWS', 'Docker', 'Git', 'Suricata (IPS)', 'Terraform'],
    issues: [
      {
        issue: '사람의 눈으로 하는 코드 리뷰만으로는 Security Group 전체 개방(0.0.0.0/0)이나 암호화 미적용 같은 실수를 완벽히 차단하기 어려움.',
        solving: '**tfsec**과 같은 IaC 정적 분석 도구를 도입하여, 코드 작성 단계에서 보안 취약점을 자동으로 스캔하고 배포 전에 차단하는 DevSecOps 파이프라인을 구축함.'
      },
      {
        issue: 'GuardDuty 도입 초기, 모의해킹 트래픽이나 내부 테스트 도구까지 위협으로 탐지되어 알림 피로 현상 발생.',
        solving: '내부 테스트 IP를 Trusted IP List(신뢰된 IP 목록)에 등록하여 오탐을 줄이고, EventBridge 필터를 통해 ‘High’ 등급 이상의 위협만 알림이 오도록 정책을 최적화함.'
      },
      {
        issue: 'CloudTrail 로그 양이 방대하여 보안 그룹 변경(Ingress 허용) 같은 중요 이벤트를 실시간으로 파악하기 어려움.',
        solving: 'CloudWatch Metric Filter를 적용해 특정 API 호출(AuthorizeSecurityGroupIngress 등) 패턴을 감지하고, E-Mail 및 SNS와 연동하여 중요 변경 사항 발생 시 즉시 경보가 울리도록 구성함.'
      }
    ],
    reason: "반복적인 인프라 생성 작업의 비효율과 휴먼 에러를 줄이기 위해 `Terraform`을 도입했습니다. IaC(Infrastructure as Code)를 통해 AWS 3-Tier 아키텍처를 코드로 관리하고, 재사용 가능한 보안 인프라 모듈을 만들기 위해 사용했습니다.",
    learned: '클라우드 인프라를 수동으로 클릭하여 만드는 것보다 코드로 관리할 때의 확장성과 안정성을 경험했습니다. 특히 모듈화를 통해 인프라를 부품처럼 조립하는 구조를 설계하며, 대규모 시스템에서의 효율적인 리소스 관리 방법을 익혔습니다.',
    intro: 'Terraform을 활용해 AWS 상에 보안이 고려된 3-Tier(Frontend-Backend-DB) 인프라를 자동으로 구축하는 프로젝트입니다. VPC, EC2, RDS 등의 리소스를 모듈화하여 코드 기반으로 일괄 배포하고 관리할 수 있는 환경을 구현했습니다.',
    func: [
      'AWS 3-Tier 보안 네트워크(VPC, Private Subnet) 및 인프라 자동 배포',
      'CloudTrail 및 VPC Flow Logs 활성화를 통한 인프라 감사 환경 구성',
      'GuardDuty 및 CloudWatch Alarm 연동 실시간 보안 위협 알림(E-Mail, SNS) 구현',
      'Terraform 모듈화 및 S3 Backend(State Locking) 기반 협업 환경 구축',
      'tfsec 기반 IaC 정적 보안 검사 및 Security Group 최소 권한 원칙 자동화'
    ],
  },

  // 4. Ansible 기반 취약점 진단 자동화
  {
    thumb: [BlogAdminThumbImg, BlogAdminImg1, BlogAdminImg2, BlogAdminImg3],
    term: '2024.10 ~ 2024.10',
    termDiff: '1개월',
    name: 'LAMP 스택 기반 취약점 진단 자동화',
    url: '',
    github: 'https://github.com/zxim/System-Security-Automation',
    team: '4명 (멀티 OS 환경 구성 및 테스트)',
    contribution: { dev: '60%', infra: '50%', security: '30%' },
    stacks: ['Ansible', 'AWS', 'Docker','Git', 'Kali Linux', 'MariaDB', 'MySQL', 'RedHat', 'Shell Script', 'Ubuntu'],
    issues: [
      {
        issue: 'Ubuntu와 RedHat(CentOS) 계열의 설정 파일 경로와 명령어가 달라 단일 스크립트로 진단 불가.',
        solving: 'Ansible 팩트(Facts)와 `/etc/os-release` 정보를 기반으로 OS를 식별하여 작업을 분기 처리하고, 공통 추상화 계층을 두어 해결.'
      },
      {
        issue: '진단 대상 서버를 반복적으로 생성해야 하는 비효율 발생.',
        solving: 'AWS AMI 이미지 생성 및 User Data 스크립트를 활용해 취약점이 존재하는 진단 환경 배포를 자동화함.'
      },
      {
        issue: 'Apache, PHP 버전 호환성 문제로 모듈 오작동.',
        solving: '각 배포판 공식 저장소 기준으로 안정화된 버전을 수동 지정하여 설치하고 설정을 표준화함.'
      }
    ],
    reason: "서버 보안 진단을 수작업으로 진행할 때 발생하는 시간 소모와 오류를 줄이기 위해 `Ansible`을 선택했습니다. 에이전트 없이 SSH만으로 다수의 서버를 동시에 제어하고 진단할 수 있어 효율적이라 판단했습니다.",
    learned: '다양한 리눅스 배포판(Ubuntu, RHEL) 환경을 다루며 OS별 시스템 구조의 차이를 깊이 이해했습니다. 또한, 반복되는 보안 점검 업무를 자동화함으로써 운영 효율성을 극대화하는 DevSecOps의 가치를 경험했습니다.',
    intro: 'KISA의 클라우드 취약점 점검 가이드를 기반으로, 서버의 보안 설정을 자동으로 진단하는 인프라를 구축했습니다. AWS 상에 LAMP 스택을 올리고 Ansible을 활용해 멀티 OS 환경에서도 일관된 보안 진단이 가능하도록 구현했습니다.',
    func: [
      'LAMP 스택 보안 진단 환경(AWS EC2) 자동 구축',
      'Ansible을 활용한 취약점 진단 자동화',
      'Ubuntu/RedHat 멀티 OS 지원 인프라 설계',
      'KISA 주요정보통신기반시설 진단 기준 적용',
      '보안 그룹(Security Group) 자동화 및 접근 제어'
    ],
  },

  // 5. Mind Space (ELK Stack)
  {
    thumb: [WhatIsPillThumbImg, WhatIsPillImg1, WhatIsPillImg2, WhatIsPillImg3],
    term: '2025.05 ~ 2025.12',
    termDiff: '8개월',
    name: 'Mind Space - 개발 및 보안 관제 시스템 구축',
    url: '',
    github: 'https://github.com/orgs/MindSpace-Team/repositories',
    team: '팀 프로젝트 (보안 관제 및 데이터 설계)',
    contribution: { dev: '50%', infra: '50%', security: '80%' },
    stacks: ['ELK (SIEM)', 'Git', 'Java', 'JavaScript', 'MongoDB', 'MySQL', 'Next.js', 'Node.js', 'Spring Boot', 'TypeScript'],
    issues: [
      {
        issue: '다양한 소스의 로그 형식이 통일되지 않아 통합 보안 분석에 어려움 발생.',
        solving: 'Logstash의 Grok 패턴을 커스터마이징하여 비정형 로그에서 IP, 에러 코드 등 핵심 필드를 추출해 데이터를 정규화함.'
      },
      {
        issue: '실시간 로그 적재량 증가로 인한 스토리지 부족 및 검색 성능 저하.',
        solving: 'ILM(Index Lifecycle Management) 정책을 도입하여 데이터 수명 주기를 자동 관리하고 인덱스 샤딩을 최적화해 해결.'
      },
      {
        issue: 'Next.js 환경에서 기존 Canvas 라이브러리들의 SSR 충돌 문제.',
        solving: '라이브러리 대신 SVG + React + viewBox 조절 방식으로 직접 구현하여 호환성을 확보하고 커스터마이징 유연성을 높임.'
      }
    ],
    reason: "실시간 로그 수집과 시각화에 최적화된 `ELK Stack`을 도입하여 ERP 시스템 내의 보안 이벤트를 모니터링하고자 했습니다. 서비스 개발에는 데이터 무결성을 위해 `MySQL`을, 비정형 로그 처리를 위해 `MongoDB`를 적절히 혼합하여 사용했습니다.",
    learned: '단순한 웹 서비스 개발을 넘어, 서비스 내에서 발생하는 데이터를 어떻게 수집하고 관제할 것인가에 집중했습니다. ELK Stack을 직접 구축해보며 로그 파이프라인 설계 능력과 데이터 기반의 의사결정 역량을 키웠습니다.',
    intro: '우주 컨셉의 Mind Map 형태 ERP 제작 프로젝트입니다. Canvas API를 활용해 별과 행성 노드를 시각화했으며, 저는 ELK Stack 기반의 보안 관제(SIEM) 시스템을 구축하여 서비스 내 데이터 흐름과 보안 위협을 모니터링하는 역할을 담당했습니다.',
    func: [
      'ELK Stack 기반 보안 로그 관제 시스템 구축',
      'Canvas API 활용 마인드맵(행성/위성) UI 구현',
      '실시간 협업 및 ERP 기능 개발',
      'Spring Boot & Next.js 기반 풀스택 개발',
      '지수함수 기반 공전 애니메이션 알고리즘 적용'
    ],
  },

  // 6. FARM (한이음)
  {
    thumb: [RestoryThumbImg, RestoryImg1, RestoryImg2, RestoryImg3],
    term: '2023.03 ~ 2023.12',
    termDiff: '10개월',
    name: 'FARM - AI/AR 기반 과일 정보 앱',
    url: 'https://www.youtube.com/watch?v=i7hbYjUXjdo&t=1s',
    github: 'https://github.com/zxim/FarmApp-Android',
    team: '4명 (안드로이드/프론트엔드 담당)',
    contribution: { dev: '40%', infra: '50%', security: '60%' },
    stacks: ['Android Studio', 'ARCore', 'AWS', 'Git', 'Java', 'MySQL', 'OpenCV', 'Python', 'TensorFlow'],
    issues: [
      {
        issue: 'Unity로 제작한 AR 모델을 안드로이드에 연동 시 버전 충돌 및 패키징 오류 발생.',
        solving: 'Sceneform 라이브러리를 도입하고 3D 모델을 .sfb 형식으로 변환하여 앱 내에서 직접 로딩하는 방식으로 전환해 해결.'
      },
      {
        issue: 'HTTP 통신 시 이미지와 텍스트를 함께 전송할 때 Content-Type 오류로 전송 실패.',
        solving: 'Multipart/form-data 방식으로 전환하고 FormData 구조를 재구성하여 서버가 정상적으로 수신하도록 처리함.'
      },
      {
        issue: '기본 카메라 Intent 사용 시 앱 이탈로 인한 UX 단절.',
        solving: 'Jetpack CameraX를 도입하여 앱 내부에 카메라 프리뷰를 구성하고 AR 기능과 자연스럽게 연결되도록 개선.'
      }
    ],
    reason: "모바일 환경에서 카메라와 센서를 적극 활용하기 위해 `Android Studio(Native)`를 선택했습니다. 과일 인식 후 직관적인 정보 제공을 위해 구글의 `ARCore` 기술을 접목하여 사용자 경험을 극대화하고자 했습니다.",
    learned: 'AI 모델과 AR 기술을 모바일 앱에 통합하는 과정에서 기술 간의 인터페이스 문제를 해결하는 능력을 길렀습니다. 특히 안드로이드 네이티브 환경에서의 카메라 제어와 네트워크 통신 처리에 대한 깊이 있는 이해를 얻었습니다.',
    intro: '카메라로 과일을 비추면 AI가 품종을 인식하고, AR(증강현실)로 영양 성분과 정보를 시각적으로 띄워주는 앱입니다. 2023 한이음 ICT 멘토링 프로젝트로, 저는 안드로이드 프론트엔드 개발과 AR 기능 구현을 주도했습니다.',
    func: [
      'AI 기반 과일 품종 및 신선도 인식',
      'ARCore 활용 실시간 정보 3D 오버레이',
      'Jetpack CameraX 기반 커스텀 카메라 구현',
      '사용자 커뮤니티 및 과일 추천 시스템',
      'MySQL 연동 데이터 관리'
    ],
  },

  // 7. AWS VPC 구조 시각화 도구 (개인)
  {
    thumb: [MongoDBThumbImg, MongoDBImg1, MongoDBImg2, MongoDBImg3],
    term: '2024.11 ~ 2024.11',
    termDiff: '1개월',
    name: 'AWS VPC 구조 시각화 도구',
    url: '',
    github: 'https://github.com/zxim/Automation-Drawing-AWS-Network-Topology',
    team: '개인 프로젝트',
    contribution: { dev: '100%', infra: '100%', security: '100%' },
    stacks: ['AWS', 'Flask', 'Git', 'JavaScript', 'Python','React', 'TypeScript'],
    issues: [
      {
        issue: 'AWS API 정보만으로는 서브넷이 퍼블릭인지 프라이빗인지 직접 구분 불가.',
        solving: '서브넷과 연결된 라우팅 테이블을 조회하고 IGW(인터넷 게이트웨이) 연결 여부를 확인하는 로직을 추가하여 판별함.'
      },
      {
        issue: 'Cytoscape.js 사용 시 VPC 내부에 서브넷, 인스턴스 등이 계층적으로 표현되지 않고 깨짐.',
        solving: 'Cytoscape의 parent 속성을 활용해 노드 간 부모-자식 관계를 정의하여 계층형 그래프가 올바르게 렌더링되도록 구현.'
      },
      {
        issue: '프론트엔드(React)와 백엔드(Flask) 포트 불일치로 인한 CORS 차단.',
        solving: 'Flask 앱에 CORS 설정을 적용하고 개발 환경에서 Proxy 설정을 추가하여 통신 문제를 해결함.'
      }
    ],
    reason: "복잡한 클라우드 네트워크를 한눈에 파악하기 위해 `Cytoscape.js` 그래프 라이브러리를 활용했습니다. AWS 리소스를 제어하기 가장 강력한 라이브러리인 `Boto3(Python)`를 백엔드로 사용하여 자동화를 구현했습니다.",
    learned: 'AWS의 네트워크 구조(VPC, Subnet, Route Table)의 상관관계를 API 수준에서 깊이 이해하게 되었습니다. 인프라 정보를 시각화 데이터로 변환하는 과정을 통해 데이터 가공 능력과 풀스택 개발 역량을 동시에 키웠습니다.',
    intro: 'AWS 계정의 VPC 구성 정보를 자동으로 수집하여 네트워크 토폴로지를 시각화해주는 웹 도구입니다. 복잡한 AWS 리소스 관계를 그래프로 표현하여 인프라 구조를 직관적으로 파악할 수 있도록 돕습니다.',
    func: [
      'AWS 리소스(VPC, Subnet, EC2 등) 자동 수집 (Boto3)',
      'Cytoscape.js 기반 네트워크 토폴로지 시각화',
      'Public/Private 서브넷 자동 판별 알고리즘',
      'React & Flask 연동 풀스택 구현',
      '리소스 필터링 및 상세 정보 조회'
    ],
  },

  // 8. Packet Sniffer (개인)
  {
    thumb: [PacketIMG],
    term: '2024.03 ~ 2024.06',
    termDiff: '4개월',
    name: 'Simple Packet Sniffer',
    url: '',
    github: 'https://github.com/zxim/Packet-Sniffer',
    team: '개인 프로젝트',
    contribution: { dev: '100%', infra: '100%', security: '100%' },
    stacks: ['Git', 'Python'],
    issues: [
      {
        issue: '실행 환경마다 네트워크 인터페이스 이름(eth0, wlan0 등)이 달라 스니핑 실패.',
        solving: '프로그램 시작 시 사용 가능한 인터페이스 목록을 보여주고 사용자가 직접 선택하도록 입력 로직을 개선함.'
      },
      {
        issue: 'ARP, IPv6 등 분석 대상이 아닌 패킷으로 인해 시각화 그래프가 난잡해짐.',
        solving: 'IP 계층 헤더를 분석하여 IPv4 패킷만 필터링하도록 로직을 추가해 유의미한 데이터만 시각화함.'
      },
      {
        issue: '트래픽 증가 시 노드와 엣지가 겹쳐 가독성이 떨어지는 문제.',
        solving: 'NetworkX의 spring_layout 알고리즘을 적용하고 패킷 양에 따라 엣지 두께를 동적으로 조절하여 가독성을 높임.'
      }
    ],
    reason: "무거운 Wireshark 대신 가볍게 동작하며 파이썬으로 패킷을 제어하는 원리를 익히기 위해 `Scapy`를 사용했습니다. 네트워크 흐름을 코드로 직접 핸들링하며 저수준 통신 원리를 이해하고자 했습니다.",
    learned: '패킷이 캡처되고 분석되는 과정을 직접 구현하며 TCP/IP 프로토콜 스택에 대한 이해도가 깊어졌습니다. 특히 헤더 파싱을 통해 송수신 IP를 추출하고 시각화하며 네트워크 모니터링 도구의 기본 원리를 체득했습니다.',
    intro: 'Python의 Scapy 모듈을 활용해 개발한 경량 패킷 분석 및 시각화 도구입니다. 실시간으로 네트워크 트래픽을 수집하고 송수신 IP 관계를 그래프로 그려주어 네트워크 흐름을 직관적으로 확인할 수 있습니다.',
    func: [
      '실시간 네트워크 패킷 캡처 및 파싱',
      '송수신 IP 추출 및 트래픽 양 분석',
      'NetworkX & Matplotlib 활용 패킷 흐름 시각화',
      '네트워크 인터페이스 선택 및 필터링 기능',
      '교육용 경량 패킷 분석 구조 설계'
    ],
  }
];