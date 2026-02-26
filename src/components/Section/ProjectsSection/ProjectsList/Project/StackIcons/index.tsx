import Image from 'next/image';
import styled from 'styled-components';

const IconWrapper = styled.div`
  position: relative;
  width: 1.5em;
  height: 1.5em;
`;

interface IconProps {
  className?: string;
}

// Generic Icon for placeholders or missing icons
export const GenericIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    {/* You can add a default image or a simple div here */}
    <div style={{ width: '100%', height: '100%', backgroundColor: '#ccc', borderRadius: '4px' }} title="Generic Icon"></div>
  </IconWrapper>
);

// Icons that exist in public/svgs/stacks/
export const AndroidStudioIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/androidstudio.png" alt="Android Studio" fill />
  </IconWrapper>
);

export const AnsibleIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/ansible.png" alt="Ansible" fill />
  </IconWrapper>
);

export const ApacheIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/apache.png" alt="Apache" fill />
  </IconWrapper>
);

export const ArCoreIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/arcore.png" alt="ARCore" fill />
  </IconWrapper>
);

export const AwsIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/aws.svg" alt="AWS" fill />
  </IconWrapper>
);

export const BurpsuiteIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/burpsuite.svg" alt="Burpsuite" fill />
  </IconWrapper>
);

export const DockerIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/docker.png" alt="Docker" fill />
  </IconWrapper>
);

export const ElasticstackIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/elasticstack.svg" alt="Elasticstack" fill />
  </IconWrapper>
);

export const ElkIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/ELK.svg" alt="ELK" fill />
  </IconWrapper>
);

export const FlaskIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/flask.png" alt="Flask" fill />
  </IconWrapper>
);

export const GitIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/git.svg" alt="Git" fill />
  </IconWrapper>
);

export const HtmlIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/html.png" alt="HTML/CSS" fill />
  </IconWrapper>
);

export const JavaIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/java.png" alt="Java" fill />
  </IconWrapper>
);

export const JavascriptIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/javascript.svg" alt="JavaScript" fill />
  </IconWrapper>
);

export const KaliIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/kali.svg" alt="Kali" fill />
  </IconWrapper>
);

export const KaliLinuxIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/kalilinux.svg" alt="Kali Linux" fill />
  </IconWrapper>
);

export const MariaIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/maria.svg" alt="Maria" fill />
  </IconWrapper>
);

export const MariadbIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/mariadb.svg" alt="MariaDB" fill />
  </IconWrapper>
);

export const MitreIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/mitre.png" alt="MITRE" fill />
  </IconWrapper>
);

export const ModesecurityIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/Modesecurity.png" alt="ModSecurity" fill />
  </IconWrapper>
);

export const MongodbIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/mongodb.png" alt="MongoDB" fill />
  </IconWrapper>
);

export const MysqlIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/mysql.svg" alt="MySQL" fill />
  </IconWrapper>
);

export const N8nIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/n8n.svg" alt="n8n" fill />
  </IconWrapper>
);

export const NextjsIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/nextjs.svg" alt="Next.js" fill />
  </IconWrapper>
);

export const NodejsIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/nodejs.svg" alt="Node.js" fill />
  </IconWrapper>
);

export const OpencvIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/opencv.png" alt="OpenCV" fill />
  </IconWrapper>
);

export const PfSenseIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/pfSense.png" alt="pfSense" fill />
  </IconWrapper>
);

export const PhpIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/php.svg" alt="PHP" fill />
  </IconWrapper>
);

export const PythonIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/python.svg" alt="Python" fill />
  </IconWrapper>
);

export const ReactIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/react.png" alt="React" fill />
  </IconWrapper>
);

export const RedhatIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/redhat.png" alt="RedHat" fill />
  </IconWrapper>
);



export const ShellScriptIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/shellscript.png" alt="Shell Script" fill />
  </IconWrapper>
);

export const SpringBootIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/springboot.png" alt="Spring Boot" fill />
  </IconWrapper>
);

export const SuricataIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/suricata.png" alt="Suricata" fill />
  </IconWrapper>
);

export const TerraformIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/terraform.png" alt="Terraform" fill />
  </IconWrapper>
);

export const TypescriptIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/typescript.png" alt="TypeScript" fill />
  </IconWrapper>
);

export const UbuntuIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/ubuntu.svg" alt="Ubuntu" fill />
  </IconWrapper>
);

export const WiresharkIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/wireshark.svg" alt="Wireshark" fill />
  </IconWrapper>
);

export const TensorFlowIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/tensorflow.png" alt="tensorflow" fill />
  </IconWrapper>
);

export const KafkaIcon = ({ className }: IconProps) => (
  <IconWrapper className={className}>
    <Image src="/svgs/stacks/kafka.png" alt="kafka" fill />
  </IconWrapper>
);

// Placeholder icons for those not found in public/svgs/stacks/
// These were previously imported by ProjectStacks.tsx
export const GooglePlayConsoleIcon = GenericIcon;
export const ReactNativeIcon = GenericIcon;
export const RecoilIcon = GenericIcon;
export const StyledComponentsIcon = GenericIcon;
export const VercelIcon = GenericIcon;
export const TailwindCSSIcon = GenericIcon;
export const ZustandIcon = GenericIcon;
export const ReactQueryIcon = GenericIcon;
